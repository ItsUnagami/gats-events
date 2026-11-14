// GATSapp: AI planning helper (Supabase Edge Function "ai-assist").
// Only signed-in admins and the owner can use it. The Claude API key stays here,
// on the server, as the secret ANTHROPIC_API_KEY. It is never sent to the app.
import { createClient } from "jsr:@supabase/supabase-js@2";

const MODEL = "claude-haiku-5-5";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const CATEGORIES = ["celebration", "cultural", "school", "sports", "meeting", "volunteer", "festival", "other"];

function prompts(task: string, input: Record<string, unknown>, today: string, lang: string) {
  const langNote = lang === "ta" ? "Write all human-readable text in Tamil." : "Write all human-readable text in English.";
  const common =
    `You help volunteer organizers at the Greater Atlanta Tamil Sangam (GATS), a Tamil community organization in Atlanta, plan community events. ` +
    `Today is ${today}. Be practical and specific. Never invent names of real people, phone numbers or prices. ${langNote}`;
  if (task === "draft_event") {
    return {
      system: common,
      user:
        `An organizer described an event:\n"""${String(input.description ?? "").slice(0, 2000)}"""\n\n` +
        `Turn it into a draft event. Reply with ONLY a JSON object, no other text, with these keys:\n` +
        `title (string, under 60 characters), title_ta (Tamil title, or "" if unsure), date ("YYYY-MM-DD" or "" if not given; ` +
        `resolve words like "next Saturday" from today's date), start ("HH:MM" 24-hour or ""), end ("HH:MM" or ""), ` +
        `venue (string or ""), category (one of ${CATEGORIES.join(", ")}), description (2 to 3 friendly sentences for members), ` +
        `slots (array of 2 to 6 volunteer roles this event needs, each {"name": short role name, "need": number of people from 1 to 20}).\n` +
        `Only fill in details the organizer gave or that clearly follow from them; leave the rest empty.`,
    };
  }
  if (task === "checklist") {
    return {
      system: common,
      user:
        `Event: ${JSON.stringify(input.event ?? {}).slice(0, 2000)}\nTasks already on the checklist: ${JSON.stringify(input.existing ?? [])}\n\n` +
        `Suggest the planning tasks an organizer should finish before this event, in the order they should be done, ` +
        `skipping anything already on the list. Reply with ONLY a JSON object: {"items": [up to 8 short tasks, each under 70 characters]}.`,
    };
  }
  if (task === "announce") {
    return {
      system: common,
      user:
        `Event: ${JSON.stringify(input.event ?? {}).slice(0, 2000)}\nVolunteer jobs still open: ${JSON.stringify(input.open ?? [])}\nApp link: ${String(input.link ?? "")}\n\n` +
        `Write a short, warm WhatsApp message announcing this event to GATS members: what, when, where, a one-line reason to come, ` +
        `and, if any jobs are open, ask for volunteers and say they can sign up in the app at the link. ` +
        `Use a few line breaks and at most 2 emoji. Under 90 words. Reply with ONLY a JSON object: {"text": the message}.`,
    };
  }
  return null;
}

function parseJson(text: string) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{"), end = cleaned.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("The AI reply wasn't in the expected format. Try again.");
  return JSON.parse(cleaned.slice(start, end + 1));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "AI isn't set up yet: add the ANTHROPIC_API_KEY secret in Supabase." }, 503);

  // Who is asking? Use their own sign-in, so the database's rules apply.
  const auth = req.headers.get("Authorization") ?? "";
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: isAdmin, error: roleErr } = await sb.rpc("is_admin");
  if (roleErr || isAdmin !== true) return json({ error: "Only admins can use the AI tools." }, 403);

  let body: { task?: string; input?: Record<string, unknown>; today?: string; lang?: string };
  try { body = await req.json(); } catch { return json({ error: "Send a JSON body." }, 400); }
  const today = /^\d{4}-\d{2}-\d{2}$/.test(String(body.today)) ? String(body.today) : new Date().toISOString().slice(0, 10);
  const p = prompts(String(body.task), body.input ?? {}, today, body.lang === "ta" ? "ta" : "en");
  if (!p) return json({ error: "Unknown task." }, 400);

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 1024, system: p.system, messages: [{ role: "user", content: p.user }] }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error("Claude API error", res.status, detail);
    return json({ error: "The AI service didn't respond. Try again in a minute." }, 502);
  }
  const data = await res.json();
  const text = (data.content ?? []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n");
  try {
    const out = parseJson(text);
    if (body.task === "draft_event") {
      if (!CATEGORIES.includes(out.category)) out.category = "other";
      out.slots = (Array.isArray(out.slots) ? out.slots : []).slice(0, 6)
        .map((s: { name?: string; need?: number }) => ({ name: String(s.name ?? "").slice(0, 80), need: Math.max(1, Math.min(20, Number(s.need) || 1)) }))
        .filter((s: { name: string }) => s.name);
    }
    if (body.task === "checklist") out.items = (Array.isArray(out.items) ? out.items : []).slice(0, 8).map((x: unknown) => String(x).slice(0, 200));
    if (body.task === "announce") out.text = String(out.text ?? "").slice(0, 1500);
    return json(out);
  } catch (e) {
    return json({ error: (e as Error).message }, 502);
  }
});
