# GATSapp

The event app for the Greater Atlanta Tamil Sangam. Members sign in, wait for an admin to approve them, and then find volunteer jobs, RSVP, and see what's coming up. Admins and the owner get an organizer view. AI planning help and a private team chat are built in and can be switched on when you're ready. It installs on phones like a native app.

It runs on **Supabase** (sign-in, database, AI helper) and **Vercel** (hosting). There's no build step.

## Already running the earlier version? Upgrade in 2 steps

Your existing data, accounts, and `config.js` all stay as they are. The AI tools and team chat stay hidden until you switch them on, so they don't need any setup now.

1. **Upload the new files to GitHub.** In your repository, choose **Add file → Upload files** and drag in everything from this folder **except `config.js`**, so your keys aren't overwritten. Include the `supabase` folder. Click **Commit changes**. Vercel updates the site within a minute.
2. **Refresh phones.** Close and reopen the app on your phone. If it still looks old, open the site in Safari or Chrome once, then reopen the installed app.

## What's in this folder

| File | What it is |
|---|---|
| `index.html`, `styles.css`, `app.js` | The app itself |
| `config.js` | Your Supabase connection details (you fill this in once) |
| `supabase/schema.sql` | Creates the database and permission rules (first-time setup) |
| `supabase/upgrade-v2.sql` | Adds the admin team chat |
| `supabase/functions/ai-assist/index.ts` | The AI helper that runs on Supabase's server |
| `manifest.webmanifest`, `sw.js`, `icons/` | Make the app installable and let it open offline |
| `vercel.json` | Hosting settings |

## Who sees what

Everyone uses the same site. What you see depends on your role.

| | Waiting / Removed | Member | Admin | Owner |
|---|:-:|:-:|:-:|:-:|
| Home with volunteer board, Events, Me | | ✓ | ✓ | ✓ |
| RSVP and sign up for volunteer jobs | | ✓ | ✓ | ✓ |
| Organizer view, drafts, checklists | | | ✓ | ✓ |
| AI planning tools (when switched on) | | | ✓ | ✓ |
| Team chat (when switched on) | | | ✓ | ✓ |
| Approve, decline, remove members (People tab) | | | ✓ | ✓ |
| Make or remove admins | | | | ✓ |

The database enforces these rules itself, so they hold even if someone tampers with the app. Members can't see each other's email addresses or the team chat.

## Switching on the optional features

Both are off by default. Each one needs a one-time setup, then one line in `config.js`. On GitHub, open `config.js`, click the pencil icon, and add the lines just above the closing `};` (put a comma after the line before them):

```js
  aiEnabled: true,
  chatEnabled: true
```

Turn on only the ones you've set up. Commit the change; Vercel updates the site within a minute.

## AI planning tools (optional)

Admins and the owner can:
- **Draft an event:** describe it in a sentence ("Pongal on Jan 16, 11 to 3 at the community hall, with cooking and kolam") and the form fills in, including volunteer roles.
- **Suggest a checklist:** in an event's Checklist tab, add a planning to-do list in one tap.
- **Write an announcement:** get a WhatsApp-ready message, then copy it, share it to WhatsApp, or post it in the team chat.

AI suggestions are a starting point. Always check the details before publishing or sharing.

**Setup:**
1. **Get a Claude API key.** Create an account at [console.anthropic.com](https://console.anthropic.com), add a payment method under **Billing**, then create a key under **API Keys**. Copy it (it starts with `sk-ant-`). The AI is pay-per-use; you can set a monthly spending limit in the Console so costs can't run away. See Anthropic's pricing page for current rates.
2. **Store the key in Supabase, not in the app.** In Supabase, go to **Edge Functions → Secrets** (or **Project Settings → Edge Functions**), add a secret named `ANTHROPIC_API_KEY`, paste the key, and save. Never put this key in `config.js` or GitHub.
3. **Deploy the helper.** In Supabase, go to **Edge Functions → Deploy a new function → Via Editor**. Name it exactly `ai-assist`, replace the sample code with the contents of `supabase/functions/ai-assist/index.ts`, and click **Deploy**. Leave **Verify JWT** turned on.
4. **Switch it on:** add `aiEnabled: true` to `config.js` (see "Switching on the optional features").
5. **Test it.** Sign in as an admin, go to **Home → Organize**, describe an event in **Plan with AI**, and tap **Draft event**.

If the AI shows "AI isn't set up yet," the secret is missing or misnamed. "Only admins can use the AI tools" means you're signed in as a member.

## Team chat (optional)

Admins and the owner can get a **Chat** tab for planning conversations. Members keep using the GATS WhatsApp group.

**Setup:** in Supabase, open **SQL Editor → New query**, paste the whole of `supabase/upgrade-v2.sql`, and click **Run** (safe to run more than once). Then add `chatEnabled: true` to `config.js`.

## First-time setup (new project only)

Skip this if your site is already live.

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (East US region).
2. **Create the database:** in **SQL Editor → New query**, paste and run `supabase/schema.sql`. (Run `supabase/upgrade-v2.sql` too if you want the team chat.)
3. **Connect the app:** from **Project Settings → API Keys**, copy the Project URL and the **anon** key (the one starting with `eyJ`, on the **Legacy API keys** tab) into `config.js`. Never use the `service_role` or secret key there.
4. **Put it online:** upload this folder's contents to a GitHub repository (with `index.html` at the top level, not inside a folder), then import it in [vercel.com](https://vercel.com) with **Framework Preset: Other** and deploy.
5. **Tell Supabase the address:** in **Authentication → URL Configuration**, set **Site URL** to your Vercel address (the short one from **Vercel → Settings → Domains**) and add the same address followed by `/**` under **Redirect URLs**.
6. **Sign-in emails:** members get a sign-in link by email and tap it to sign in; this works with Supabase's default emails. (Optional: to also include a 6-digit code, add `{{ .Token }}` to the **Magic Link** and **Confirm signup** templates; members can then tap "Have a code instead?" in the app.) Before inviting everyone, set up a custom email sender (for example Resend) under **Authentication → Emails → SMTP Settings**, because Supabase's built-in sender only allows a few emails an hour.
7. **Google sign-in (optional):** create an OAuth web client in Google Cloud with the redirect URI `https://YOUR-PROJECT.supabase.co/auth/v1/callback`, publish the consent screen, and paste the client ID and secret into **Authentication → Providers → Google**.
8. **Sign in first:** the first person to sign in becomes the owner. Do it before sharing the link.
9. **Optional:** switch on the AI tools and team chat as described above.

## Changing the web address

The name in the app is GATSapp. The web address comes from your Vercel project name. To change it, go to **Vercel → your project → Settings → General**, rename the project (for example to `gatsapp`), and check **Settings → Domains** for the new address. Then update the **Site URL** and **Redirect URLs** in Supabase (setup step 5), and the redirect settings in Google Cloud if you use Google sign-in. Share the new link with members.

## Sharing it with members

- **iPhone:** open the link in **Safari**, tap **Share**, then **Add to Home Screen**.
- **Android:** open the link in **Chrome** and tap **Install app**.
- **Computer:** open the link in Chrome or Edge and click the install icon in the address bar.

## Making changes later

- Edit files on GitHub or upload new versions; Vercel redeploys automatically.
- **After changing any app file, bump `VERSION` in `sw.js`** (for example `gats-v3` to `gats-v4`) so installed phones pick up the update.

## Good to know

- **Free-tier pause:** free Supabase projects pause after about a week with no activity. If the app won't load, log in to Supabase and click **Restore project**.
- **Offline:** the app keeps the latest events on each phone, so members can still read the calendar without a connection.
- **Tamil text:** the Tamil translations were written by AI and should be checked by a fluent member. All wording is near the top of `app.js`.

## Troubleshooting

| Problem | Fix |
|---|---|
| "Almost ready" screen | `config.js` still has placeholders, or your browser has an old copy. Hard refresh, or open it in a private window. |
| Sign-in email doesn't arrive | Check spam. If many people signed in recently, you've hit the built-in email limit; set up a custom sender. |
| "Email rate limit exceeded" | Same as above: wait an hour, use Google sign-in, or set up a custom sender. |
| Sign-in link opens an old version or "Almost ready" | Supabase's Site URL must be your short Vercel address, not a long deployment address. |
| AI says it isn't set up | Add the `ANTHROPIC_API_KEY` secret and deploy the `ai-assist` function. |
| Chat tab says it isn't set up | Run `supabase/upgrade-v2.sql`, then check `chatEnabled: true` is in `config.js`. |
| No AI buttons or Chat tab | They're switched off. See "Switching on the optional features." |
| Phone still shows the old design | Bump `VERSION` in `sw.js`, redeploy, then close and reopen the app. |
