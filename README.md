# GATS Events

The event planner for the Greater Atlanta Tamil Sangam. Members sign in, wait for an admin to approve them, and then see upcoming events, RSVP, and sign up to volunteer. Admins plan events, manage checklists, and approve new members. It installs on phones and computers like a regular app.

It runs on two free services: **Supabase** (sign-in and database) and **Vercel** (hosting). There is no build step and nothing to compile.

## What's in this folder

| File | What it is |
|---|---|
| `index.html`, `styles.css`, `app.js` | The app itself |
| `config.js` | Your Supabase connection details (you fill this in) |
| `supabase/schema.sql` | Creates the database, the approval system and all permission rules |
| `manifest.webmanifest`, `sw.js`, `icons/` | Make the app installable and let it open offline |
| `vercel.json` | Hosting settings |

## Setup (about 45 minutes, once)

Supabase and Google occasionally rename menu items. If a label below doesn't match exactly, look for the closest equivalent.

### 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com), sign up, and click **New project**.
2. Name it `gats-events`, pick a strong database password (save it somewhere safe), and choose the **East US** region.
3. Wait a minute or two for it to finish setting up.

### 2. Create the database

1. In your project, open **SQL Editor** and click **New query**.
2. Open `supabase/schema.sql` from this folder, copy everything, paste it in, and click **Run**.
3. You should see "Success. No rows returned." This also adds the starter Tamil festival dates, which are estimates; confirm them against a panchangam and fix them in the app.

### 3. Connect the app to Supabase

1. In Supabase, go to **Project Settings → API** (or **API Keys**).
2. Copy the **Project URL** and the **anon** key (newer projects call it the **publishable** key).
3. Open `config.js` and paste them in place of the placeholders:

```js
window.GATS_CONFIG = {
  supabaseUrl: "https://abcdefgh.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...",
  contactEmail: "events@yourgats.org"   // optional, shown to people who are declined
};
```

Both values are meant to be public. The permission rules in the database are what protect the data. **Never** put the `service_role` / secret key in this file.

### 4. Put the app online with Vercel

1. Create a free account at [github.com](https://github.com) and make a new repository called `gats-events`.
2. Upload every file and folder from this folder into it (**Add file → Upload files**, then drag them in).
3. Create a free account at [vercel.com](https://vercel.com) using your GitHub login.
4. Click **Add New → Project**, choose the `gats-events` repository, leave **Framework Preset** as **Other**, leave the build command empty, and click **Deploy**.
5. Vercel gives you an address like `https://gats-events.vercel.app`. That's your app.

From now on, any change you upload to GitHub goes live automatically within a minute.

### 5. Tell Supabase where the app lives

1. In Supabase, go to **Authentication → URL Configuration**.
2. Set **Site URL** to your Vercel address, e.g. `https://gats-events.vercel.app`.
3. Under **Redirect URLs**, add the same address followed by `/**`, e.g. `https://gats-events.vercel.app/**`.

### 6. Set up the sign-in email

The app emails people a 6-digit code, which works reliably inside the installed phone app (tapping a link in an email can open the wrong browser on iPhones).

1. Go to **Authentication → Emails → Templates** (or **Email Templates**) and open **Magic Link**.
2. Replace the message body with:

```html
<h2>Your GATS Events sign-in code</h2>
<p>Enter this code in the app:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:4px">{{ .Token }}</p>
<p>Or <a href="{{ .ConfirmationURL }}">tap here to sign in</a> on this device.</p>
<p>If you didn't ask for this, you can ignore this email.</p>
```

3. Do the same for the **Confirm signup** template, so brand-new members also get a code.
4. Set the subject lines to something like `Your GATS Events sign-in code`.

**Important before inviting everyone:** Supabase's built-in email sender only allows a handful of emails per hour, which is fine for testing but not for a whole community. Set up a free email service before launch:

1. Create a free account at [resend.com](https://resend.com) (or Brevo, Postmark, etc.) and verify a domain or sending address.
2. In Supabase, go to **Authentication → Emails → SMTP Settings**, enable custom SMTP, and paste in the details the email service gives you.

Alternatively, encourage members to use **Continue with Google** (next step), which sends no email at all.

### 7. Turn on Google sign-in (recommended)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a project called `GATS Events`.
2. Open **APIs & Services → OAuth consent screen**. Choose **External**, enter the app name `GATS Events` and a support email, and save. When done, click **Publish app** so anyone can sign in (not just test users).
3. Open **APIs & Services → Credentials → Create credentials → OAuth client ID**. Choose **Web application**.
4. Under **Authorized redirect URIs**, add `https://YOUR-PROJECT.supabase.co/auth/v1/callback` (use your real Supabase URL from step 3).
5. Copy the **Client ID** and **Client secret**.
6. In Supabase, go to **Authentication → Providers → Google**, turn it on, paste both values, and save.

### 8. Sign in first, before sharing the link

**The first person to sign in automatically becomes the owner.** Do this yourself right after deploying, before you share the address with anyone.

1. Open your Vercel address and sign in.
2. You should go straight to the calendar, with **Members** and **Plan an event** buttons visible.
3. To double-check, run this in the Supabase SQL Editor:

```sql
select full_name, role from public.profiles order by created_at;
```

If someone else got there first, make yourself owner and demote them:

```sql
update public.profiles set role = 'member' where role = 'owner';
update public.profiles set role = 'owner' where id = (select id from auth.users where email = 'you@example.com');
```

### 9. Make your crew admins

Ask your crew to sign in. They'll appear under **Members → Waiting**. Approve them, then go to the **Members** tab and click **Make admin** next to each one. Only the owner can make or remove admins.

## Sharing it with members

Send the link in your WhatsApp group with these instructions:

- **iPhone:** open the link in **Safari**, tap the **Share** button, then **Add to Home Screen**.
- **Android:** open the link in **Chrome** and tap **Install app** (or menu ⋮ → **Install app** / **Add to Home screen**).
- **Computer:** open the link in **Chrome** or **Edge** and click the install icon at the right end of the address bar.

After signing up, members see a "waiting for approval" screen. It switches to the calendar automatically once an admin approves them.

## Who can do what

| | Waiting / Removed | Member | Admin | Owner |
|---|:-:|:-:|:-:|:-:|
| See published events | | ✓ | ✓ | ✓ |
| RSVP and volunteer | | ✓ | ✓ | ✓ |
| See drafts and checklists | | | ✓ | ✓ |
| Create, edit, delete events | | | ✓ | ✓ |
| Approve, decline, remove members | | | ✓ | ✓ |
| Make or remove admins | | | | ✓ |

These rules are enforced by the database itself, so they hold even if someone tampers with the app. Members also can't see each other's email addresses; only admins can, for approvals.

## Making changes later

- Edit files on GitHub (or upload new versions). Vercel redeploys automatically.
- **After changing any app file, open `sw.js` and bump `VERSION`** (e.g. `gats-v1` → `gats-v2`). This makes installed copies on phones pick up the update.
- To use your own address (e.g. `events.yourgats.org`), add it under **Vercel → Project → Settings → Domains**, then update the Site URL and Redirect URLs in step 5.

## Good to know

- **Free-tier pause:** free Supabase projects pause after about a week with no activity. If the app ever says it can't load, log in to Supabase and click **Restore project**. Regular use keeps it awake; upgrading to Supabase Pro removes the pause if this becomes a nuisance.
- **Offline:** the app saves the latest events on each device, so members can still view the calendar without a connection. RSVPs and edits need a connection.
- **Backups:** to keep your own copy, open **Table Editor** in Supabase, choose `events`, and use **Export to CSV**.
- **Tamil text:** the Tamil translations were written by an AI and should be checked by a fluent member before launch. All wording lives near the top of `app.js` under `ta:`.
- **New-member alerts:** admins see a banner and a badge on the Members button when people are waiting. The app doesn't send email or push notifications about this yet.

## Troubleshooting

| Problem | Fix |
|---|---|
| "Almost ready" screen | `config.js` still has the placeholders. Redo step 3. |
| Sign-in code email never arrives | Check spam. If several people signed in recently, you've hit the built-in email limit; set up custom SMTP (step 6). |
| Google sign-in shows an error about redirect URI | The redirect URI in Google Cloud must exactly match `https://YOUR-PROJECT.supabase.co/auth/v1/callback`. |
| Google sign-in goes back to the login screen | Check the Site URL and Redirect URLs in step 5 match your Vercel address. |
| Signed in but stuck on "waiting for approval" | An admin needs to approve you. If you're the owner, see step 8. |
| Phone still shows the old version | Bump `VERSION` in `sw.js`, redeploy, then close and reopen the app. |
| Google sign-in misbehaves inside the installed iPhone app | Use the email code instead; it works reliably in installed apps. |
