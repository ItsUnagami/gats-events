/* GATSapp: app logic (version 3).
 * Plain JavaScript, no build step. Talks to Supabase for sign-in and data;
 * the database's row-level security decides what each person can see and do. */
"use strict";

const S = {
  en: {
    org: "GATSapp", orgAlt: "Greater Atlanta Tamil Sangam",
    loading: "Loading events…", plan: "Plan an event", planShort: "Plan event",
    admin: "Admin", owner: "Owner", member: "Member", pendingRole: "Waiting for approval", blockedRole: "No access",
    nextUp: "Next up", today: "Today", tomorrow: "Tomorrow", inDays: "In {n} days",
    upcoming: "Coming up", calendar: "Calendar", prev: "Previous month", next: "Next month", jumpToday: "Today",
    noEvents: "Nothing planned yet",
    noEventsAdmin: "Add the first event and it will show up here for every member.",
    noEventsMember: "When organizers add an event, it will show up here.",
    nextFest: "Next festival: {f}, {when}.",
    nothingDay: "Nothing on this day.", addDay: "Add event", noUpcoming: "No other events coming up.",
    going: "Going", maybe: "Maybe", no: "Can't make it", goingN: "{n} going", maybeN: "{n} maybe",
    guests: "Guests coming with you", willYou: "Will you come?",
    details: "Details", festival: "Festival", draft: "Draft", tbc: "Date to confirm",
    date: "Date", time: "Time", venue: "Venue", contact: "Contact", type: "Type",
    allDay: "All day", addGcal: "Add to Google Calendar",
    edit: "Edit", del: "Delete", close: "Close", cancel: "Cancel",
    publish: "Publish event", saveDraft: "Save draft", saveChanges: "Save changes",
    newEvent: "Plan an event", editEvent: "Edit event",
    gWhen: "When and where", gVol: "Volunteer roles", gVis: "Visibility",
    fTitle: "Event name", fTitleTa: "Tamil name (optional)", fDate: "Date", fStart: "Starts", fEnd: "Ends",
    fVenue: "Venue", fContact: "Contact person", fType: "Type", fDesc: "Details",
    fTbc: "The date is tentative", fDraft: "Keep as a draft (only admins can see it)",
    slotName: "Role", slotNeed: "Needed", addSlot: "Add a role", remove: "Remove",
    needTitle: "Give the event a name.", needDate: "Pick a date.", badTime: "The end time is before the start time.",
    needSlotName: "Give every volunteer role a name.",
    confirmDel: "Delete this event?", delYes: "Delete event",
    deleted: "Event deleted.", published: "Event published.", drafted: "Draft saved.", saved: "Changes saved.",
    writeFail: "That didn't save. Check your connection and try again.",
    denied: "You don't have permission to do that.",
    edited: "Last edited by {n}, {d}", someone: "an admin",
    planFor: "Plan an event for this",
    tOverview: "Overview", tVol: "Volunteers", tCheck: "Checklist",
    volNeed: "{n} volunteer spots open", volNeed1: "1 volunteer spot open",
    filled: "{a} of {b}", signUp: "Sign up", leave: "Leave", full: "Full", youIn: "You're signed up",
    noSlots: "No volunteer roles for this event.",
    noSlotsAdmin: "Add roles like setup, food serving or registration and members can sign up here.",
    addRoles: "Add volunteer roles", volSaved: "You're signed up. Thank you!", volLeft: "You've left this role.",
    slotFull: "That role just filled up.", slotGone: "That role was removed by an organizer.",
    clHint: "Only admins see this checklist.", addItem: "Add a task", add: "Add",
    starter: "Use starter checklist", clEmpty: "No tasks yet. Start from the suggested list or add your own.",
    clProgress: "{a} of {b} done", doneBy: "Done by {n}", checkShort: "Checklist {a}/{b}",
    accessQ: "Who can do what?",
    accessA: "Members can see every event, RSVP and sign up to volunteer. Admins approve new members, add and edit events, and manage each event's checklist. The owner decides who is an admin.",
    sugg: ["Setup", "Food serving", "Registration desk", "Cleanup"],
    starterItems: ["Book the venue", "Confirm food and caterer", "Send the announcement to members", "Arrange sound and stage", "Fill the volunteer roles", "Plan setup and cleanup"],
    cat: { celebration: "Celebration", cultural: "Cultural program", school: "Tamil school", sports: "Sports", meeting: "Meeting", volunteer: "Volunteering", festival: "Festival", other: "Other" },
    // sign-in
    signInTitle: "Sign in to GATSapp",
    signInSub: "Find volunteer jobs, RSVP and help run Greater Atlanta Tamil Sangam events.",
    myVol: "Your volunteer jobs", helpNeeded: "Volunteers needed",
    helpNeededSub: "Open jobs at upcoming events. Pick one and sign up.",
    noOpenJobs: "Every volunteer job is filled. Thank you!",
    spotsLeft: "{n} spots left", spotLeft1: "1 spot left", volunteerBtn: "Volunteer",
    youVolunteer: "You're volunteering: {r}", moreJobs: "+{n} more open jobs. Open an event to see them.",
    roster: "Signed up: {n}",
    google: "Continue with Google", or: "or",
    yourName: "Your name", nameHint: "New members: this is how others will see you.",
    email: "Email", sendCode: "Email me a sign-in code",
    checkInbox: "We sent a sign-in code to {e}.",
    enterCode: "Enter the code from the email, or tap the link inside it on this device.",
    code: "Sign-in code", verify: "Sign in", useDifferent: "Use a different email",
    resend: "Send a new code", resendIn: "You can send a new code in {n}s",
    badEmail: "Enter a valid email address.", badCode: "That code didn't work. Check it, or send a new one.",
    authFail: "Sign-in didn't go through: {m}",
    approvalNote: "New accounts are approved by a GATS admin before they can see events.",
    pendingTitle: "Thanks for joining, {n}",
    pendingBody: "A GATS admin needs to approve your account before you can see events. Once they do, this screen opens the calendar on its own.",
    checkAgain: "Check again", stillPending: "Still waiting for approval.", signOut: "Sign out",
    blockedTitle: "This account doesn't have access",
    blockedBody: "If you think this is a mistake, contact a GATS organizer.",
    // members
    members: "Members", waiting: "Waiting", membersTab: "Members", removedTab: "Removed",
    approve: "Approve", decline: "Decline", makeAdmin: "Make admin", removeAdmin: "Remove admin",
    removeAccess: "Remove access", restore: "Restore access",
    requested: "Asked {d}", noneWaiting: "No one is waiting for approval.", noneRemoved: "No removed accounts.",
    you: "You", approvalsWaiting: "{n} waiting for approval", review: "Review",
    approved: "Approved.", declined: "Declined.", roleSaved: "Saved.",
    // install / offline / account
    install: "Install app", installBanner: "Keep GATSapp on your home screen for quick access.",
    iosInstall: "To install on iPhone: tap Share, then Add to Home Screen.", dismiss: "Not now",
    offline: "You're offline. Showing events saved {d}.",
    account: "Account",
    setupTitle: "Almost ready",
    setupBody: "Add your Supabase project URL and key to config.js to finish setup. README.md walks through it."
  },
  ta: {
    org: "GATSapp", orgAlt: "கிரேட்டர் அட்லாண்டா தமிழ்ச் சங்கம்",
    loading: "நிகழ்வுகள் ஏற்றப்படுகின்றன…", plan: "நிகழ்வைத் திட்டமிடு", planShort: "நிகழ்வு",
    admin: "நிர்வாகி", owner: "உரிமையாளர்", member: "உறுப்பினர்", pendingRole: "அனுமதிக்காகக் காத்திருக்கிறது", blockedRole: "அணுகல் இல்லை",
    nextUp: "அடுத்த நிகழ்வு", today: "இன்று", tomorrow: "நாளை", inDays: "இன்னும் {n} நாட்களில்",
    upcoming: "வரவிருக்கும் நிகழ்வுகள்", calendar: "நாட்காட்டி", prev: "முந்தைய மாதம்", next: "அடுத்த மாதம்", jumpToday: "இன்று",
    noEvents: "இன்னும் எதுவும் திட்டமிடப்படவில்லை",
    noEventsAdmin: "முதல் நிகழ்வைச் சேர்க்கவும்; அது அனைத்து உறுப்பினர்களுக்கும் இங்கே தெரியும்.",
    noEventsMember: "அமைப்பாளர்கள் நிகழ்வைச் சேர்த்ததும் இங்கே தெரியும்.",
    nextFest: "அடுத்த பண்டிகை: {f}, {when}.",
    nothingDay: "இந்த நாளில் எதுவும் இல்லை.", addDay: "நிகழ்வு சேர்", noUpcoming: "வேறு நிகழ்வுகள் இல்லை.",
    going: "வருகிறேன்", maybe: "ஒருவேளை", no: "வர இயலாது", goingN: "{n} பேர் வருகிறார்கள்", maybeN: "{n} பேர் ஒருவேளை",
    guests: "உடன் வருபவர்கள்", willYou: "நீங்கள் வருவீர்களா?",
    details: "விவரங்கள்", festival: "பண்டிகை", draft: "வரைவு", tbc: "தேதி உறுதிசெய்யப்பட வேண்டும்",
    date: "தேதி", time: "நேரம்", venue: "இடம்", contact: "தொடர்பு", type: "வகை",
    allDay: "நாள் முழுவதும்", addGcal: "Google நாட்காட்டியில் சேர்",
    edit: "திருத்து", del: "நீக்கு", close: "மூடு", cancel: "ரத்து",
    publish: "நிகழ்வை வெளியிடு", saveDraft: "வரைவைச் சேமி", saveChanges: "மாற்றங்களைச் சேமி",
    newEvent: "நிகழ்வைத் திட்டமிடு", editEvent: "நிகழ்வைத் திருத்து",
    gWhen: "எப்போது, எங்கே", gVol: "தன்னார்வப் பணிகள்", gVis: "தெரிவுநிலை",
    fTitle: "நிகழ்வின் பெயர்", fTitleTa: "தமிழ்ப் பெயர் (விருப்பம்)", fDate: "தேதி", fStart: "தொடக்கம்", fEnd: "முடிவு",
    fVenue: "இடம்", fContact: "தொடர்பு நபர்", fType: "வகை", fDesc: "விவரங்கள்",
    fTbc: "தேதி இன்னும் உறுதியாகவில்லை", fDraft: "வரைவாக வைத்திரு (நிர்வாகிகளுக்கு மட்டும் தெரியும்)",
    slotName: "பணி", slotNeed: "தேவை", addSlot: "பணியைச் சேர்", remove: "நீக்கு",
    needTitle: "நிகழ்வுக்கு ஒரு பெயர் கொடுக்கவும்.", needDate: "ஒரு தேதியைத் தேர்ந்தெடுக்கவும்.", badTime: "முடிவு நேரம் தொடக்க நேரத்திற்கு முன் உள்ளது.",
    needSlotName: "ஒவ்வொரு தன்னார்வப் பணிக்கும் பெயர் கொடுக்கவும்.",
    confirmDel: "இந்த நிகழ்வை நீக்கவா?", delYes: "நிகழ்வை நீக்கு",
    deleted: "நிகழ்வு நீக்கப்பட்டது.", published: "நிகழ்வு வெளியிடப்பட்டது.", drafted: "வரைவு சேமிக்கப்பட்டது.", saved: "மாற்றங்கள் சேமிக்கப்பட்டன.",
    writeFail: "சேமிக்க முடியவில்லை. இணைப்பைச் சரிபார்த்து மீண்டும் முயலவும்.",
    denied: "இதைச் செய்ய உங்களுக்கு அனுமதி இல்லை.",
    edited: "கடைசியாகத் திருத்தியவர் {n}, {d}", someone: "ஒரு நிர்வாகி",
    planFor: "இதற்கு நிகழ்வைத் திட்டமிடு",
    tOverview: "கண்ணோட்டம்", tVol: "தன்னார்வலர்கள்", tCheck: "பணிப்பட்டியல்",
    volNeed: "{n} தன்னார்வ இடங்கள் காலியாக உள்ளன", volNeed1: "1 தன்னார்வ இடம் காலியாக உள்ளது",
    filled: "{b} இல் {a}", signUp: "பதிவு செய்", leave: "விலகு", full: "நிரம்பியது", youIn: "நீங்கள் பதிவு செய்துள்ளீர்கள்",
    noSlots: "இந்த நிகழ்வுக்கு தன்னார்வப் பணிகள் இல்லை.",
    noSlotsAdmin: "அமைப்பு, உணவு பரிமாறல், பதிவு போன்ற பணிகளைச் சேர்த்தால் உறுப்பினர்கள் இங்கே பதிவு செய்யலாம்.",
    addRoles: "தன்னார்வப் பணிகளைச் சேர்", volSaved: "பதிவு செய்யப்பட்டது. நன்றி!", volLeft: "இந்தப் பணியிலிருந்து விலகினீர்கள்.",
    slotFull: "அந்தப் பணி இப்போது நிரம்பிவிட்டது.", slotGone: "அந்தப் பணியை அமைப்பாளர் நீக்கிவிட்டார்.",
    clHint: "இந்தப் பட்டியல் நிர்வாகிகளுக்கு மட்டும் தெரியும்.", addItem: "பணியைச் சேர்", add: "சேர்",
    starter: "தொடக்கப் பட்டியலைப் பயன்படுத்து", clEmpty: "இன்னும் பணிகள் இல்லை. பரிந்துரைப் பட்டியலில் தொடங்கவும் அல்லது உங்கள் பணிகளைச் சேர்க்கவும்.",
    clProgress: "{b} இல் {a} முடிந்தது", doneBy: "{n} முடித்தார்", checkShort: "பணிப்பட்டியல் {a}/{b}",
    accessQ: "யார் என்ன செய்யலாம்?",
    accessA: "உறுப்பினர்கள் எல்லா நிகழ்வுகளையும் பார்க்கலாம், பதிலளிக்கலாம், தன்னார்வலராகப் பதிவு செய்யலாம். நிர்வாகிகள் புதிய உறுப்பினர்களை அனுமதிப்பார்கள், நிகழ்வுகளைச் சேர்த்துத் திருத்துவார்கள், பணிப்பட்டியலை நிர்வகிப்பார்கள். யார் நிர்வாகி என்பதை உரிமையாளர் முடிவு செய்வார்.",
    sugg: ["அமைப்பு", "உணவு பரிமாறல்", "பதிவு மேசை", "சுத்தம் செய்தல்"],
    starterItems: ["அரங்கை முன்பதிவு செய்", "உணவு மற்றும் கேட்டரரை உறுதிசெய்", "உறுப்பினர்களுக்கு அறிவிப்பு அனுப்பு", "ஒலி மற்றும் மேடை ஏற்பாடு செய்", "தன்னார்வப் பணிகளை நிரப்பு", "அமைப்பு மற்றும் சுத்தம் திட்டமிடு"],
    cat: { celebration: "கொண்டாட்டம்", cultural: "கலை நிகழ்ச்சி", school: "தமிழ்ப் பள்ளி", sports: "விளையாட்டு", meeting: "கூட்டம்", volunteer: "தன்னார்வப் பணி", festival: "பண்டிகை", other: "மற்றவை" },
    signInTitle: "GATSapp-இல் உள்நுழையவும்",
    signInSub: "தன்னார்வப் பணிகளைக் கண்டறியுங்கள், பதிலளியுங்கள், கிரேட்டர் அட்லாண்டா தமிழ்ச் சங்க நிகழ்வுகளை நடத்த உதவுங்கள்.",
    myVol: "உங்கள் தன்னார்வப் பணிகள்", helpNeeded: "தன்னார்வலர்கள் தேவை",
    helpNeededSub: "வரவிருக்கும் நிகழ்வுகளில் காலியான பணிகள். ஒன்றைத் தேர்ந்தெடுத்துப் பதிவு செய்யுங்கள்.",
    noOpenJobs: "எல்லா தன்னார்வப் பணிகளும் நிரம்பிவிட்டன. நன்றி!",
    spotsLeft: "{n} இடங்கள் மீதம்", spotLeft1: "1 இடம் மீதம்", volunteerBtn: "தன்னார்வலராகு",
    youVolunteer: "நீங்கள் தன்னார்வலர்: {r}", moreJobs: "மேலும் {n} காலியான பணிகள். பார்க்க நிகழ்வைத் திறக்கவும்.",
    roster: "பதிவு செய்தவர்கள்: {n}",
    google: "Google மூலம் தொடரவும்", or: "அல்லது",
    yourName: "உங்கள் பெயர்", nameHint: "புதிய உறுப்பினர்கள்: மற்றவர்களுக்கு இப்படித் தெரிவீர்கள்.",
    email: "மின்னஞ்சல்", sendCode: "உள்நுழைவுக் குறியீட்டை அனுப்பு",
    checkInbox: "{e} முகவரிக்கு உள்நுழைவுக் குறியீடு அனுப்பியுள்ளோம்.",
    enterCode: "மின்னஞ்சலில் உள்ள குறியீட்டை உள்ளிடவும், அல்லது இந்தச் சாதனத்தில் அதில் உள்ள இணைப்பைத் தட்டவும்.",
    code: "உள்நுழைவுக் குறியீடு", verify: "உள்நுழை", useDifferent: "வேறு மின்னஞ்சலைப் பயன்படுத்து",
    resend: "புதிய குறியீட்டை அனுப்பு", resendIn: "{n} வினாடிகளில் புதிய குறியீடு அனுப்பலாம்",
    badEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.", badCode: "அந்தக் குறியீடு வேலை செய்யவில்லை. சரிபார்க்கவும் அல்லது புதியதை அனுப்பவும்.",
    authFail: "உள்நுழைவு நடக்கவில்லை: {m}",
    approvalNote: "புதிய கணக்குகள் நிகழ்வுகளைக் காணும் முன் GATS நிர்வாகியால் அனுமதிக்கப்படும்.",
    pendingTitle: "இணைந்ததற்கு நன்றி, {n}",
    pendingBody: "நிகழ்வுகளைக் காண்பதற்கு முன் GATS நிர்வாகி உங்கள் கணக்கை அனுமதிக்க வேண்டும். அனுமதித்ததும் இந்தத் திரை தானாக நாட்காட்டியைத் திறக்கும்.",
    checkAgain: "மீண்டும் சரிபார்", stillPending: "இன்னும் அனுமதிக்காகக் காத்திருக்கிறது.", signOut: "வெளியேறு",
    blockedTitle: "இந்தக் கணக்குக்கு அணுகல் இல்லை",
    blockedBody: "இது தவறு என்று நினைத்தால், GATS அமைப்பாளரைத் தொடர்புகொள்ளவும்.",
    members: "உறுப்பினர்கள்", waiting: "காத்திருப்பவர்கள்", membersTab: "உறுப்பினர்கள்", removedTab: "நீக்கப்பட்டவர்கள்",
    approve: "அனுமதி", decline: "நிராகரி", makeAdmin: "நிர்வாகியாக்கு", removeAdmin: "நிர்வாகப் பொறுப்பை நீக்கு",
    removeAccess: "அணுகலை நீக்கு", restore: "அணுகலை மீட்டமை",
    requested: "{d} அன்று கேட்டார்", noneWaiting: "யாரும் அனுமதிக்காகக் காத்திருக்கவில்லை.", noneRemoved: "நீக்கப்பட்ட கணக்குகள் இல்லை.",
    you: "நீங்கள்", approvalsWaiting: "{n} பேர் அனுமதிக்காகக் காத்திருக்கிறார்கள்", review: "பார்",
    approved: "அனுமதிக்கப்பட்டது.", declined: "நிராகரிக்கப்பட்டது.", roleSaved: "சேமிக்கப்பட்டது.",
    install: "செயலியை நிறுவு", installBanner: "விரைவாகத் திறக்க GATSapp-ஐ முகப்புத் திரையில் வைத்திருங்கள்.",
    iosInstall: "iPhone-இல் நிறுவ: Share-ஐத் தட்டி, Add to Home Screen-ஐத் தேர்ந்தெடுக்கவும்.", dismiss: "இப்போது வேண்டாம்",
    offline: "இணைப்பு இல்லை. {d} சேமித்த நிகழ்வுகள் காட்டப்படுகின்றன.",
    account: "கணக்கு",
    setupTitle: "கிட்டத்தட்ட தயார்",
    setupBody: "அமைப்பை முடிக்க config.js-இல் உங்கள் Supabase விவரங்களைச் சேர்க்கவும். README.md-இல் வழிமுறைகள் உள்ளன."
  }
};
const CATS = ["celebration", "cultural", "school", "sports", "meeting", "volunteer", "festival", "other"];

/* ---- wording added in version 3 (tabs, role views, AI tools, team chat) ---- */
Object.assign(S.en, {
  tHome: "Home", tEvents: "Events", tChat: "Chat", tPeople: "People", tMe: "Me",
  hi: "Hi, {n}", organize: "Organize", volunteerMode: "Volunteer",
  needsAttention: "Needs attention", tasksLeft: "{n} checklist tasks left", tasksLeft1: "1 checklist task left",
  allClear: "Nothing needs attention right now.",
  aiPlanTitle: "Plan with AI",
  aiPlanHint: "Describe the event in a sentence or two. AI drafts the details and volunteer roles, and you check them before publishing.",
  aiPlaceholder: "Pongal celebration on Jan 16, 11 to 3 at the community hall, with cooking and kolam",
  aiDraft: "Draft event", aiFill: "Fill in with AI", aiWorking: "Working…",
  aiFilled: "AI filled in a draft. Check every detail before you publish.",
  aiFail: "AI couldn't help just now. {m}", aiNeedText: "Describe the event first.",
  aiSuggest: "Suggest tasks with AI", aiAdded: "Added {n} suggested tasks. Remove any you don't need.",
  aiFormHint: "Describe the event and AI fills in this form for you.",
  announce: "Write announcement", announceTitle: "Announcement",
  announceHint: "Written by AI. Edit it, then share it to your WhatsApp group.",
  copy: "Copy", copied: "Copied.", shareWA: "Share to WhatsApp", postChat: "Post in team chat", posted: "Posted in team chat.",
  chatTitle: "Team chat",
  chatHint: "Only admins and the owner can see this chat. Members use the GATS WhatsApp group.",
  chatEmpty: "No messages yet. Say hello to the team.", chatPlaceholder: "Message", send: "Send", yesterday: "Yesterday",
  chatOff: "Team chat isn't set up yet. Run upgrade-v2.sql in Supabase to turn it on.",
  peopleTitle: "People",
  ownerNote: "You're the owner, so you can also make people admins.",
  adminNote: "Approve new members here. Only the owner can add or remove admins.",
  language: "Language", yourRole: "What you can do",
  roleDesc_member: "See events, RSVP and sign up to volunteer.",
  roleDesc_admin: "Everything members can do, plus plan events, approve new members, use the AI tools and the team chat.",
  roleDesc_owner: "Everything admins can do, plus choose who is an admin.",
  volFill: "{a} of {b} volunteers", goingShort: "{n} going", draftsNote: "Drafts are only visible to admins.",
  checkFill: "{a} of {b} tasks done", noUpcomingEvents: "No upcoming events yet.", nextEventIn: "Next up, {w}"
});
Object.assign(S.ta, {
  tHome: "முகப்பு", tEvents: "நிகழ்வுகள்", tChat: "அரட்டை", tPeople: "நபர்கள்", tMe: "நான்",
  hi: "வணக்கம், {n}", organize: "ஒருங்கிணை", volunteerMode: "தன்னார்வம்",
  needsAttention: "கவனிக்க வேண்டியவை", tasksLeft: "{n} பணிகள் மீதம்", tasksLeft1: "1 பணி மீதம்",
  allClear: "இப்போது கவனிக்க வேண்டியது எதுவும் இல்லை.",
  aiPlanTitle: "AI மூலம் திட்டமிடு",
  aiPlanHint: "நிகழ்வை ஒன்றிரண்டு வாக்கியங்களில் விவரிக்கவும். AI விவரங்களையும் தன்னார்வப் பணிகளையும் வரைவாக்கும்; வெளியிடும் முன் நீங்கள் சரிபார்க்கலாம்.",
  aiPlaceholder: "ஜனவரி 16 அன்று சமூகக் கூடத்தில் 11 முதல் 3 வரை பொங்கல் கொண்டாட்டம், சமையல் மற்றும் கோலத்துடன்",
  aiDraft: "நிகழ்வை வரைவாக்கு", aiFill: "AI மூலம் நிரப்பு", aiWorking: "வேலை செய்கிறது…",
  aiFilled: "AI வரைவை நிரப்பியது. வெளியிடும் முன் ஒவ்வொரு விவரத்தையும் சரிபார்க்கவும்.",
  aiFail: "AI இப்போது உதவ முடியவில்லை. {m}", aiNeedText: "முதலில் நிகழ்வை விவரிக்கவும்.",
  aiSuggest: "AI மூலம் பணிகளைப் பரிந்துரை", aiAdded: "{n} பரிந்துரைப் பணிகள் சேர்க்கப்பட்டன. தேவையில்லாதவற்றை நீக்கவும்.",
  aiFormHint: "நிகழ்வை விவரியுங்கள்; AI இந்தப் படிவத்தை நிரப்பும்.",
  announce: "அறிவிப்பு எழுது", announceTitle: "அறிவிப்பு",
  announceHint: "AI எழுதியது. திருத்தி, உங்கள் WhatsApp குழுவில் பகிருங்கள்.",
  copy: "நகலெடு", copied: "நகலெடுக்கப்பட்டது.", shareWA: "WhatsApp-இல் பகிர்", postChat: "குழு அரட்டையில் இடு", posted: "குழு அரட்டையில் இடப்பட்டது.",
  chatTitle: "குழு அரட்டை",
  chatHint: "இந்த அரட்டையை நிர்வாகிகளும் உரிமையாளரும் மட்டுமே பார்க்க முடியும். உறுப்பினர்கள் GATS WhatsApp குழுவைப் பயன்படுத்துவார்கள்.",
  chatEmpty: "இன்னும் செய்திகள் இல்லை. குழுவுக்கு வணக்கம் சொல்லுங்கள்.", chatPlaceholder: "செய்தி", send: "அனுப்பு", yesterday: "நேற்று",
  chatOff: "குழு அரட்டை இன்னும் அமைக்கப்படவில்லை. இயக்க Supabase-இல் upgrade-v2.sql-ஐ இயக்கவும்.",
  peopleTitle: "நபர்கள்",
  ownerNote: "நீங்கள் உரிமையாளர், எனவே நபர்களை நிர்வாகிகளாகவும் ஆக்கலாம்.",
  adminNote: "புதிய உறுப்பினர்களை இங்கே அனுமதிக்கவும். உரிமையாளர் மட்டுமே நிர்வாகிகளைச் சேர்க்கவோ நீக்கவோ முடியும்.",
  language: "மொழி", yourRole: "நீங்கள் செய்யக்கூடியவை",
  roleDesc_member: "நிகழ்வுகளைப் பார்க்கலாம், பதிலளிக்கலாம், தன்னார்வலராகப் பதிவு செய்யலாம்.",
  roleDesc_admin: "உறுப்பினர்கள் செய்யக்கூடிய அனைத்தும், மேலும் நிகழ்வுகளைத் திட்டமிடுதல், புதிய உறுப்பினர்களை அனுமதித்தல், AI கருவிகள் மற்றும் குழு அரட்டை.",
  roleDesc_owner: "நிர்வாகிகள் செய்யக்கூடிய அனைத்தும், மேலும் யார் நிர்வாகி என்பதைத் தேர்ந்தெடுத்தல்.",
  volFill: "{b} இல் {a} தன்னார்வலர்கள்", goingShort: "{n} பேர் வருகிறார்கள்", draftsNote: "வரைவுகள் நிர்வாகிகளுக்கு மட்டுமே தெரியும்.",
  checkFill: "{b} இல் {a} பணிகள் முடிந்தன", noUpcomingEvents: "இன்னும் வரவிருக்கும் நிகழ்வுகள் இல்லை.", nextEventIn: "அடுத்தது, {w}"
});

/* ================= setup ================= */
const CFG = window.GATS_CONFIG || {};
const CONFIGURED = !!(CFG.supabaseUrl && CFG.supabaseAnonKey && !/YOUR-/.test(CFG.supabaseUrl + CFG.supabaseAnonKey));
const sb = CONFIGURED && window.supabase
  ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;

/* tiny localStorage wrapper that never throws */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

const st = {
  lang: store.get("gats-lang") === "ta" ? "ta" : "en",
  screen: CONFIGURED ? "loading" : "setup",
  session: null, me: null,
  events: [], rsvps: [], signups: [], checklist: [], profiles: {}, people: [], messages: [],
  chatOff: false, loaded: false, offlineAt: null,
  tab: "home", homeMode: store.get("gats-home-mode") === "volunteer" ? "volunteer" : "organize",
  month: null, sel: null,
  dlgMode: null, openId: null, tab2: "overview", confirmDel: false, form: null,
  announce: null, aiBusy: null,
  auth: { step: "start", email: "", name: "", error: "", busy: false, resendAt: 0 },
  installEvt: null, installDismissed: store.get("gats-install-dismissed") === "1"
};

/* ================= helpers ================= */
function t(k, vars) {
  let s = S[st.lang][k] ?? S.en[k] ?? k;
  if (vars && typeof s === "string") for (const v in vars) s = s.replace("{" + v + "}", vars[v]);
  return s;
}
const loc = () => (st.lang === "ta" ? "ta-IN" : "en-US");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);
const newId = () => (crypto.randomUUID ? crypto.randomUUID() : "x" + Date.now() + uid());
const $ = (s) => document.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const todayS = () => ymd(new Date());
const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const fmt = (s, o) => new Intl.DateTimeFormat(loc(), o).format(parse(s));
function fmtTime(hm) { if (!hm) return ""; const [h, m] = hm.split(":").map(Number); return new Intl.DateTimeFormat(loc(), { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, h, m)); }
function timeRange(e) { if (!e.start) return t("allDay"); return fmtTime(e.start) + (e.end ? " – " + fmtTime(e.end) : ""); }
function when(ds) { const n = diffDays(todayS(), ds); return n === 0 ? t("today") : n === 1 ? t("tomorrow") : t("inDays", { n }); }
const shortDate = (iso) => new Intl.DateTimeFormat(loc(), { month: "short", day: "numeric" }).format(new Date(iso));
st.month = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
st.sel = todayS();

const myId = () => st.session?.user?.id || null;
const role = () => st.me?.role || "pending";
const isAdmin = () => role() === "admin" || role() === "owner";
const isOwner = () => role() === "owner";
const firstName = () => (st.me?.full_name || "").trim().split(/\s+/)[0] || "";

function errMsg(e) {
  const m = String(e?.message || "");
  if (/full/i.test(m)) return t("slotFull");
  if (/no longer exists/i.test(m)) return t("slotGone");
  if (e?.code === "42501" || /row-level security|permission/i.test(m)) return t("denied");
  if (m && !/fetch|network/i.test(m)) return m;
  return t("writeFail");
}

/* ================= data ================= */
function normEvent(r) {
  return {
    id: r.id, title: r.title || "", titleTa: r.title_ta || "", date: r.date,
    start: r.start_time ? r.start_time.slice(0, 5) : "", end: r.end_time ? r.end_time.slice(0, 5) : "",
    venue: r.venue || "", contact: r.contact || "", category: r.category || "other",
    description: r.description || "", tentative: !!r.tentative, kind: r.kind || "event",
    _draft: r.status === "draft", slots: Array.isArray(r.slots) ? r.slots : [],
    updatedBy: r.updated_by, updatedAt: r.updated_at
  };
}
function allItems() {
  return st.events
    .filter((e) => typeof e.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.date))
    .sort((a, b) => (a.date + (a.start || "")).localeCompare(b.date + (b.start || "")));
}
const futureItems = () => allItems().filter((e) => e.date >= todayS());
const findItem = (id) => st.events.find((e) => e.id === id);
const isFest = (e) => e.kind === "festival";
const title = (e) => (st.lang === "ta" && e.titleTa ? e.titleTa : e.title || "Untitled");
const slotsOf = (e) => (Array.isArray(e?.slots) ? e.slots.filter((s) => s && s.id && s.name) : []);
function counts(id) {
  let going = 0, maybe = 0;
  for (const r of st.rsvps) {
    if (r.event_id !== id) continue;
    if (r.status === "going") going += 1 + Math.max(0, Math.min(20, Number(r.guests) || 0));
    else if (r.status === "maybe") maybe++;
  }
  return { going, maybe };
}
const goingIds = (id) => st.rsvps.filter((r) => r.event_id === id && r.status === "going").map((r) => r.user_id);
const myRsvp = (id) => st.rsvps.find((r) => r.event_id === id && r.user_id === myId());
const slotPeople = (evId, slotId) => st.signups.filter((s) => s.event_id === evId && s.slot_id === slotId).map((s) => s.user_id);
function openSpots(e) { let n = 0; for (const s of slotsOf(e)) n += Math.max(0, (Number(s.need) || 0) - slotPeople(e.id, s.id).length); return n; }
function volTotals(e) { let have = 0, need = 0; for (const s of slotsOf(e)) { const n = Math.max(1, Number(s.need) || 1); need += n; have += Math.min(n, slotPeople(e.id, s.id).length); } return { have, need }; }
const planOf = (id) => st.checklist.filter((i) => i.event_id === id).sort((a, b) => a.position - b.position);
const nameOf = (id) => st.profiles[id]?.full_name || (id === myId() ? st.me?.full_name : "") || t("someone");
const pendingCount = () => st.people.filter((p) => p.role === "pending").length;
const myRolesFor = (e) => slotsOf(e).filter((s) => slotPeople(e.id, s.id).includes(myId())).map((s) => s.name);

function hue(id) { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
function avatar(id, cls = "", fallbackName) {
  const p = st.profiles[id] || (id === myId() ? st.me : null) || st.people.find((x) => x.id === id) || {};
  const name = p.full_name || fallbackName || "";
  if (p.avatar_url) return `<img class="av ${cls}" src="${esc(p.avatar_url)}" alt="${esc(name)}" title="${esc(name)}" referrerpolicy="no-referrer">`;
  const ini = name.trim().split(/\s+/).map((w) => w[0] || "").join("").slice(0, 2).toUpperCase() || "?";
  return `<span class="av ${cls}" style="background:hsl(${hue(id)} 42% 44%)" title="${esc(name)}" aria-hidden="true">${esc(ini)}</span>`;
}
function avatarStack(ids, label) {
  if (!ids.length && !label) return "";
  return `<span class="avatars">${ids.slice(0, 6).map((i) => avatar(i)).join("")}${ids.length > 6 || label ? `<span class="lbl">${ids.length > 6 ? "+" + (ids.length - 6) + " " : ""}${esc(label || "")}</span>` : ""}</span>`;
}

async function loadAll() {
  const qs = [
    sb.from("events").select("*"),
    sb.from("rsvps").select("event_id,user_id,status,guests"),
    sb.from("volunteer_signups").select("event_id,slot_id,user_id"),
    sb.from("profiles").select("id,full_name,avatar_url,role")
  ];
  if (isAdmin()) {
    qs.push(sb.from("checklist_items").select("*").order("position"));
    qs.push(sb.rpc("admin_list_people"));
  }
  try {
    const res = await Promise.all(qs);
    const bad = res.find((r) => r.error);
    if (bad) throw bad.error;
    st.events = res[0].data.map(normEvent);
    st.rsvps = res[1].data;
    st.signups = res[2].data;
    st.profiles = Object.fromEntries(res[3].data.map((p) => [p.id, p]));
    st.checklist = isAdmin() ? res[4].data : [];
    st.people = isAdmin() ? res[5].data : [];
    st.loaded = true; st.offlineAt = null;
    store.set("gats-cache", JSON.stringify({ at: Date.now(), uid: myId(), events: res[0].data, rsvps: st.rsvps, signups: st.signups, profiles: res[3].data }));
  } catch (e) {
    const cached = JSON.parse(store.get("gats-cache") || "null");
    if (cached && cached.uid === myId() && !st.loaded) {
      st.events = cached.events.map(normEvent); st.rsvps = cached.rsvps; st.signups = cached.signups;
      st.profiles = Object.fromEntries(cached.profiles.map((p) => [p.id, p]));
      st.loaded = true; st.offlineAt = cached.at;
    } else if (!st.loaded) { st.loaded = true; st.offlineAt = Date.now(); }
  }
  if (isAdmin()) await loadMessages();
  refresh();
}
async function loadMessages() {
  // The chat is optional: if its table isn't set up yet, the rest of the app still works.
  try {
    const { data, error } = await sb.from("messages").select("id,user_id,body,created_at").order("created_at", { ascending: true }).limit(300);
    if (error) { st.chatOff = true; return; }
    st.chatOff = false; st.messages = data || [];
  } catch (e) { st.chatOff = true; }
}

let reloadTimer;
function scheduleReload() { clearTimeout(reloadTimer); reloadTimer = setTimeout(loadAll, 350); }
let channel = null;
function subscribeLive() {
  if (channel) return;
  channel = sb.channel("gats-live");
  const tables = ["events", "rsvps", "volunteer_signups", "checklist_items"];
  if (isAdmin()) tables.push("messages");
  for (const table of tables) channel.on("postgres_changes", { event: "*", schema: "public", table }, scheduleReload);
  channel.subscribe();
}
function unsubscribeLive() { if (channel) { sb.removeChannel(channel); channel = null; } }

/* ================= sign-in and routing ================= */
async function fetchMe() {
  const { data, error } = await sb.from("profiles").select("id,full_name,avatar_url,role").eq("id", myId()).maybeSingle();
  if (error) throw error;
  return data;
}
async function route(session) {
  st.session = session;
  if (!session) {
    unsubscribeLive(); st.me = null; st.loaded = false; st.screen = "auth"; st.tab = "home";
    if (dlg.open) dlg.close();
    render(); return;
  }
  let me = null;
  try {
    me = await fetchMe();
    if (!me) { await new Promise((r) => setTimeout(r, 800)); me = await fetchMe(); }
  } catch (e) {
    const cached = JSON.parse(store.get("gats-cache") || "null");
    if (cached && cached.uid === session.user.id) {
      st.me = st.me || { id: session.user.id, full_name: "", role: "member" };
      st.screen = "app"; await loadAll(); return;
    }
  }
  st.me = me ? { ...me, email: session.user.email } : { id: session.user.id, full_name: "", role: "pending", email: session.user.email };
  if (st.me.role === "pending") { st.screen = "pending"; startPendingPoll(); }
  else if (st.me.role === "blocked") st.screen = "blocked";
  else { st.screen = "app"; subscribeLive(); await loadAll(); return; }
  render();
}
let pendingTimer;
function startPendingPoll() {
  clearInterval(pendingTimer);
  pendingTimer = setInterval(async () => {
    if (st.screen !== "pending" || document.hidden) return;
    const me = await fetchMe().catch(() => null);
    if (me && me.role !== "pending") { clearInterval(pendingTimer); route(st.session); }
  }, 30000);
}
async function sendCode() {
  const a = st.auth;
  const email = ($("#authEmail")?.value ?? a.email).trim();
  const name = ($("#authName")?.value ?? a.name).trim();
  a.email = email; a.name = name; a.error = "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { a.error = t("badEmail"); render(); $("#authEmail")?.focus(); return; }
  a.busy = true; render();
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + "/", shouldCreateUser: true, data: name ? { full_name: name } : undefined } });
  a.busy = false;
  if (error) { a.error = t("authFail", { m: error.message }); render(); return; }
  a.step = "code"; a.resendAt = Date.now() + 60000; render(); $("#authCode")?.focus(); tickResend();
}
let resendTimer;
function tickResend() {
  clearInterval(resendTimer);
  resendTimer = setInterval(() => {
    const el = $("#resendBtn"); if (!el || st.auth.step !== "code") { clearInterval(resendTimer); return; }
    const left = Math.ceil((st.auth.resendAt - Date.now()) / 1000);
    if (left > 0) { el.disabled = true; el.textContent = t("resendIn", { n: left }); }
    else { el.disabled = false; el.textContent = t("resend"); clearInterval(resendTimer); }
  }, 500);
}
async function verifyCode() {
  const a = st.auth;
  const token = ($("#authCode")?.value || "").replace(/\s/g, "");
  if (!/^\d{6,10}$/.test(token)) { a.error = t("badCode"); render(); $("#authCode")?.focus(); return; }
  a.busy = true; a.error = ""; render();
  const { error } = await sb.auth.verifyOtp({ email: a.email, token, type: "email" });
  a.busy = false;
  if (error) { a.error = t("badCode"); render(); $("#authCode")?.focus(); }
}
async function signInGoogle() {
  const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + "/" } });
  if (error) { st.auth.error = t("authFail", { m: error.message }); render(); }
}
async function signOut() {
  await sb.auth.signOut().catch(() => {});
  store.del("gats-cache");
  st.auth = { step: "start", email: "", name: "", error: "", busy: false, resendAt: 0 };
  route(null);
}

/* ================= AI helper (calls the ai-assist server function) ================= */
async function ai(task, input) {
  const { data, error } = await sb.functions.invoke("ai-assist", { body: { task, input, today: todayS(), lang: st.lang } });
  if (error) {
    let m = error.message || "";
    try { const j = await error.context?.json?.(); if (j?.error) m = j.error; } catch (e) {}
    throw new Error(m);
  }
  if (data?.error) throw new Error(data.error);
  return data;
}
const eventSummary = (e) => ({
  title: e.title, date: e.date, start: e.start, end: e.end, venue: e.venue, category: e.category,
  description: e.description, volunteer_roles: slotsOf(e).map((s) => ({ name: s.name, need: s.need }))
});

/* ================= icons (simple line icons in the iOS style) ================= */
const I = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const ICON = {
  home: I('<path d="M3.5 10.6 12 3.8l8.5 6.8V19a1.5 1.5 0 0 1-1.5 1.5h-4.3v-5.6H9.3v5.6H5A1.5 1.5 0 0 1 3.5 19z"/>'),
  events: I('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  chat: I('<path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5A1.5 1.5 0 0 1 19 17H10l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 5 4.5z"/>'),
  people: I('<circle cx="9" cy="8.5" r="3.3"/><path d="M3 19.5c.7-3.4 3.1-5.3 6-5.3s5.3 1.9 6 5.3"/><circle cx="17" cy="9.3" r="2.5"/><path d="M16.2 14.4c2.4.2 4.2 1.9 4.8 5.1"/>'),
  me: I('<circle cx="12" cy="8.3" r="3.8"/><path d="M4.5 20.5c.9-4.2 3.9-6.3 7.5-6.3s6.6 2.1 7.5 6.3"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  spark: I('<path d="M12 3.5l1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8zM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>'),
  send: I('<path d="M4 12 20 4l-6.5 16-2.6-6.9z"/>'),
  chevron: I('<path d="M9 5.5 15.5 12 9 18.5"/>')
};
const TABS = { home: "tHome", events: "tEvents", chat: "tChat", people: "tPeople", me: "tMe" };
const tabsFor = () => (isAdmin() ? ["home", "events", "chat", "people", "me"] : ["home", "events", "me"]);

const KOLAM = `<svg class="kolam" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="kolam" width="40" height="40" patternUnits="userSpaceOnUse">
<g fill="currentColor"><circle cx="20" cy="20" r="2"/><circle cx="0" cy="0" r="2"/><circle cx="40" cy="0" r="2"/><circle cx="0" cy="40" r="2"/><circle cx="40" cy="40" r="2"/></g>
<g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 7 Q33 7 33 20 Q33 33 20 33 Q7 33 7 20 Q7 7 20 7Z"/>
<path d="M0 13 Q13 13 13 0 M40 13 Q27 13 27 0 M0 27 Q13 27 13 40 M40 27 Q27 27 27 40"/></g>
</pattern></defs><rect width="100%" height="100%" fill="url(#kolam)"/></svg>`;
const GMARK = `<svg class="gmark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
const BG = `<div class="bg" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>`;
const langSeg = () => `<div class="seg" role="group" aria-label="${esc(t("language"))}">
  <button type="button" data-lang="en" aria-pressed="${st.lang === "en"}">English</button>
  <button type="button" data-lang="ta" aria-pressed="${st.lang === "ta"}">தமிழ்</button></div>`;

/* ================= render ================= */
function render() {
  document.documentElement.lang = st.lang === "ta" ? "ta" : "en";
  const app = $("#app");
  // keep typing intact across re-renders
  const a = document.activeElement;
  const keep = {};
  app.querySelectorAll("[data-keep]").forEach((el) => (keep[el.id] = el.value));
  const focus = a && app.contains(a) && a.id ? { id: a.id, s: a.selectionStart, e: a.selectionEnd } : null;

  if (st.screen === "setup") app.innerHTML = gateShell(`<h1>${esc(t("setupTitle"))}</h1><p class="sub">${esc(t("setupBody"))}</p>`);
  else if (st.screen === "loading") app.innerHTML = `${BG}<p class="boot">${esc(t("loading"))}</p>`;
  else if (st.screen === "auth") app.innerHTML = authHTML();
  else if (st.screen === "pending") app.innerHTML = gateShell(`<h1>${esc(t("pendingTitle", { n: st.me?.full_name || "" }).replace(/,\s*$/, ""))}</h1>
      <p class="sub">${esc(t("pendingBody"))}</p><p class="fine">${esc(st.me?.email || "")}</p>
      <div class="btns"><button class="btn primary" type="button" data-check-again>${esc(t("checkAgain"))}</button><button class="btn" type="button" data-signout>${esc(t("signOut"))}</button></div>`);
  else if (st.screen === "blocked") app.innerHTML = gateShell(`<h1>${esc(t("blockedTitle"))}</h1><p class="sub">${esc(t("blockedBody") + (CFG.contactEmail ? " " + CFG.contactEmail : ""))}</p>
      <div class="btns"><button class="btn" type="button" data-signout>${esc(t("signOut"))}</button></div>`);
  else app.innerHTML = appHTML();

  for (const id in keep) { const el = document.getElementById(id); if (el && keep[id] != null) el.value = keep[id]; }
  if (focus) { const el = document.getElementById(focus.id); if (el) { el.focus(); try { el.setSelectionRange(focus.s, focus.e); } catch (e) {} } }
  if (st.screen === "app" && st.tab === "chat") afterChatRender();
}

function gateShell(inner) {
  return `${BG}<div class="gate">
    <div class="gate-hero">${KOLAM}<b>${esc(t("org"))}</b><span>${esc(t("orgAlt"))}</span></div>
    <div class="gate-card glass"><div class="gate-top">${langSeg()}</div>${inner}</div></div>`;
}
function authHTML() {
  const a = st.auth;
  if (a.step === "code") {
    return gateShell(`<h1>${esc(t("signInTitle"))}</h1>
      <p>${esc(t("checkInbox", { e: a.email }))}</p><p class="sub">${esc(t("enterCode"))}</p>
      <form id="codeForm" novalidate>
        <label>${esc(t("code"))}<input id="authCode" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="10" required></label>
        ${a.error ? `<p class="err" role="alert">${esc(a.error)}</p>` : ""}
        <button class="btn primary wide" type="submit" ${a.busy ? "disabled" : ""}>${esc(t("verify"))}</button>
      </form>
      <p class="fine"><button class="linkish" type="button" id="resendBtn" data-resend>${esc(t("resend"))}</button></p>
      <p class="fine"><button class="linkish" type="button" data-auth-back>${esc(t("useDifferent"))}</button></p>`);
  }
  return gateShell(`<h1>${esc(t("signInTitle"))}</h1><p class="sub">${esc(t("signInSub"))}</p>
    <button class="btn wide" type="button" data-google>${GMARK}${esc(t("google"))}</button>
    <div class="divider">${esc(t("or"))}</div>
    <form id="emailForm" novalidate>
      <label>${esc(t("email"))}<input id="authEmail" type="email" autocomplete="email" value="${esc(a.email)}" required></label>
      <label>${esc(t("yourName"))}<input id="authName" autocomplete="name" maxlength="80" value="${esc(a.name)}"><span class="fine">${esc(t("nameHint"))}</span></label>
      ${a.error ? `<p class="err" role="alert">${esc(a.error)}</p>` : ""}
      <button class="btn primary wide" type="submit" ${a.busy ? "disabled" : ""}>${esc(t("sendCode"))}</button>
    </form>
    <p class="fine">${esc(t("approvalNote"))}</p>`);
}

function appHTML() {
  if (!tabsFor().includes(st.tab)) st.tab = "home";
  const pc = pendingCount();
  const page = !st.loaded ? `<p class="boot">${esc(t("loading"))}</p>`
    : st.tab === "home" ? homeHTML() : st.tab === "events" ? eventsHTML() : st.tab === "chat" ? chatHTML() : st.tab === "people" ? peopleHTML() : meHTML();
  return `${BG}
  <header class="topbar glass">
    <span class="brand">${esc(t("org"))}</span>
    ${isAdmin() ? `<button class="icon-btn tint" type="button" data-plan aria-label="${esc(t("plan"))}">${ICON.plus}</button>` : ""}
  </header>
  <main class="page${st.tab === "chat" ? " chat-page" : ""}" id="page">${st.offlineAt ? `<div class="note warn">${esc(t("offline", { d: new Intl.DateTimeFormat(loc(), { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(st.offlineAt)) }))}</div>` : ""}${page}</main>
  <nav class="tabbar glass" aria-label="Sections">
    ${tabsFor().map((k) => `<button type="button" class="tab" data-tabgo="${k}" aria-current="${st.tab === k ? "page" : "false"}">
      ${ICON[k]}<span>${esc(t(TABS[k]))}</span>${k === "people" && pc ? `<em class="badge-dot">${pc}</em>` : ""}</button>`).join("")}
  </nav>`;
}

/* ---------- shared pieces ---------- */
function rsvpButtons(e) {
  if (isFest(e) || e._draft) return "";
  const mine = myRsvp(e.id)?.status; const dis = st.offlineAt ? "disabled" : "";
  return `<div class="pills" role="group" aria-label="${esc(t("willYou"))}">${["going", "maybe", "no"].map((s) =>
    `<button type="button" class="pill-btn" data-rsvp="${esc(e.id)}" data-s="${s}" aria-pressed="${mine === s}" ${dis}>${esc(t(s))}</button>`).join("")}</div>`;
}
function tagsHTML(e) {
  return [isFest(e) ? `<span class="tag fest">${esc(t("festival"))}</span>` : "", e._draft ? `<span class="tag draft">${esc(t("draft"))}</span>` : "", e.tentative ? `<span class="tag">${esc(t("tbc"))}</span>` : ""].join("");
}
function signals(e) {
  if (isFest(e)) return "";
  const out = [];
  if (!e._draft) { const c = counts(e.id); if (c.going || c.maybe) out.push(`<span class="count">${esc(t("goingN", { n: c.going }))}${c.maybe ? `, ${esc(t("maybeN", { n: c.maybe }))}` : ""}</span>`); }
  const open = openSpots(e); if (open > 0 && !e._draft) out.push(`<span class="need">${esc(open === 1 ? t("volNeed1") : t("volNeed", { n: open }))}</span>`);
  return out.length ? `<span class="signals">${out.join("")}</span>` : "";
}
function dateBlock(ds) { const d = parse(ds); return `<span class="dblock"><span class="d">${d.getDate()}</span><span class="m">${esc(fmt(ds, { month: "short" }))}</span></span>`; }
function rowHTML(e) {
  const sub = isFest(e) ? esc(when(e.date)) : esc(timeRange(e)) + (e.venue ? ", " + esc(e.venue) : "");
  return `<button type="button" class="cell-row${isFest(e) ? " fest" : ""}" data-open="${esc(e.id)}">
    ${dateBlock(e.date)}
    <span class="cell-main"><span class="t">${esc(title(e))}</span><span class="s">${sub}</span>${signals(e)}${tagsHTML(e) ? `<span class="tags">${tagsHTML(e)}</span>` : ""}</span>
    <span class="chev">${ICON.chevron}</span></button>`;
}
function heroHTML(hero) {
  const d = parse(hero.date), roles = myRolesFor(hero);
  return `<article class="hero glass">
    <div class="hero-date">${KOLAM}<span class="d">${d.getDate()}</span><span class="m">${esc(fmt(hero.date, { month: "long" }))}</span><span class="w">${esc(fmt(hero.date, { weekday: "long" }))}</span></div>
    <div class="hero-body">
      <span class="kicker">${esc(t("nextEventIn", { w: when(hero.date).toLowerCase() }))}</span>
      <h2>${esc(title(hero))}</h2>
      <p class="meta">${esc(timeRange(hero))}${hero.venue ? "<br>" + esc(hero.venue) : ""}</p>
      ${signals(hero)}
      ${roles.length ? `<span class="mine">${esc(t("youVolunteer", { r: roles.join(", ") }))}</span>` : ""}
      ${rsvpButtons(hero)}
      <div class="btns">${openSpots(hero) > 0 && !roles.length && !st.offlineAt ? `<button class="btn primary sm" type="button" data-openvol="${esc(hero.id)}">${esc(t("volunteerBtn"))}</button>` : ""}<button class="btn sm" type="button" data-open="${esc(hero.id)}">${esc(t("details"))}</button></div>
    </div></article>`;
}
function openJobs(future) {
  const jobs = [];
  for (const e of future) {
    if (isFest(e) || e._draft) continue;
    for (const s of slotsOf(e)) {
      const ppl = slotPeople(e.id, s.id), need = Math.max(1, Number(s.need) || 1);
      if (ppl.length < need && !ppl.includes(myId())) jobs.push({ e, s, have: ppl.length, need });
    }
  }
  return jobs;
}
function jobRow(j, mine) {
  const left = j.need - j.have, pct = Math.round((j.have / j.need) * 100);
  return `<div class="job${mine ? " mine-job" : ""}">
    ${dateBlock(j.e.date)}
    <span class="cell-main"><span class="t">${esc(j.s.name)}</span><span class="s">${esc(title(j.e))}, ${esc(timeRange(j.e))}</span>
      ${mine ? `<span class="mine">${esc(t("youIn"))}</span>` : `<span class="fill"><span class="bar"><i style="width:${pct}%"></i></span>${esc(left === 1 ? t("spotLeft1") : t("spotsLeft", { n: left }))}</span>`}</span>
    ${mine ? `<button class="btn sm" type="button" data-openvol="${esc(j.e.id)}">${esc(t("details"))}</button>`
      : `<button class="btn sm primary" type="button" data-vol="${esc(j.e.id)}" data-slot="${esc(j.s.id)}" ${st.offlineAt ? "disabled" : ""}>${esc(t("signUp"))}</button>`}</div>`;
}

/* ---------- Home: volunteer view (everyone) ---------- */
function volunteerHomeHTML() {
  const future = futureItems();
  const hero = future.find((e) => !isFest(e) && !e._draft);
  const nextFest = future.find(isFest);
  let h = hero ? heroHTML(hero) : `<article class="hero glass empty"><div class="hero-body"><h2>${esc(t("noEvents"))}</h2>
    <p class="sub">${esc(isAdmin() ? t("noEventsAdmin") : t("noEventsMember"))}${nextFest ? " " + esc(t("nextFest", { f: title(nextFest), when: when(nextFest.date).toLowerCase() })) : ""}</p></div></article>`;
  const mine = [];
  for (const e of future) for (const s of slotsOf(e)) if (slotPeople(e.id, s.id).includes(myId())) mine.push({ e, s, have: 0, need: 1 });
  if (mine.length) h += `<section><h3 class="sec">${esc(t("myVol"))}</h3><div class="group glass">${mine.map((j) => jobRow(j, true)).join("")}</div></section>`;
  if (future.some((e) => !isFest(e) && !e._draft && slotsOf(e).length)) {
    const jobs = openJobs(future), shown = jobs.slice(0, 6);
    h += `<section><h3 class="sec">${esc(t("helpNeeded"))}</h3><p class="sec-sub">${esc(jobs.length ? t("helpNeededSub") : t("noOpenJobs"))}</p>
      ${shown.length ? `<div class="group glass">${shown.map((j) => jobRow(j, false)).join("")}</div>` : ""}
      ${jobs.length > shown.length ? `<p class="sec-sub after">${esc(t("moreJobs", { n: jobs.length - shown.length }))}</p>` : ""}</section>`;
  }
  if (canInstall() && !st.installDismissed) h += `<div class="note">${esc(isIOS() && !st.installEvt ? t("iosInstall") : t("installBanner"))}
    <span class="btns">${st.installEvt ? `<button class="btn sm primary" type="button" data-install>${esc(t("install"))}</button>` : ""}<button class="btn sm" type="button" data-install-dismiss>${esc(t("dismiss"))}</button></span></div>`;
  return h;
}

/* ---------- Home: organizer view (admins and owner) ---------- */
function organizeHomeHTML() {
  const future = futureItems().filter((e) => !isFest(e));
  const pc = pendingCount();
  const open = future.filter((e) => !e._draft).reduce((n, e) => n + openSpots(e), 0);
  const tasks = future.reduce((n, e) => n + planOf(e.id).filter((i) => !i.done).length, 0);
  const tiles = [];
  if (pc) tiles.push(`<button type="button" class="tile glass" data-tabgo="people"><b>${pc}</b><span>${esc(t("approvalsWaiting", { n: pc }).replace(/^\d+\s*/, ""))}</span></button>`);
  if (open) tiles.push(`<button type="button" class="tile glass" data-scroll="#orgEvents"><b>${open}</b><span>${esc(open === 1 ? t("volNeed1") : t("volNeed", { n: open })).replace(/^\d+\s*/, "")}</span></button>`);
  if (tasks) tiles.push(`<button type="button" class="tile glass" data-scroll="#orgEvents"><b>${tasks}</b><span>${esc(tasks === 1 ? t("tasksLeft1") : t("tasksLeft", { n: tasks })).replace(/^\d+\s*/, "")}</span></button>`);
  let h = `<section><h3 class="sec">${esc(t("needsAttention"))}</h3>${tiles.length ? `<div class="tiles">${tiles.join("")}</div>` : `<p class="sec-sub">${esc(t("allClear"))}</p>`}</section>`;
  h += `<section class="ai-card glass"><h3>${ICON.spark}${esc(t("aiPlanTitle"))}</h3><p class="sub">${esc(t("aiPlanHint"))}</p>
    <textarea id="aiDesc" data-keep rows="3" maxlength="1000" placeholder="${esc(t("aiPlaceholder"))}"></textarea>
    <div class="btns"><button class="btn primary" type="button" data-ai-draft ${st.aiBusy === "draft" ? "disabled" : ""}>${ICON.spark}${esc(st.aiBusy === "draft" ? t("aiWorking") : t("aiDraft"))}</button></div></section>`;
  h += `<section id="orgEvents"><h3 class="sec">${esc(t("upcoming"))}</h3>${future.length ? `<div class="group glass">${future.map((e) => {
    const v = volTotals(e), plan = planOf(e.id), done = plan.filter((i) => i.done).length, c = counts(e.id);
    return `<button type="button" class="cell-row org" data-open="${esc(e.id)}">${dateBlock(e.date)}
      <span class="cell-main"><span class="t">${esc(title(e))}</span>
        ${v.need ? `<span class="fill"><span class="bar"><i style="width:${Math.round((v.have / v.need) * 100)}%"></i></span>${esc(t("volFill", { a: v.have, b: v.need }))}</span>` : ""}
        ${plan.length ? `<span class="fill alt"><span class="bar"><i style="width:${Math.round((done / plan.length) * 100)}%"></i></span>${esc(t("checkFill", { a: done, b: plan.length }))}</span>` : ""}
        <span class="s">${e._draft ? esc(t("draft")) : esc(t("goingShort", { n: c.going }))}</span></span>
      <span class="chev">${ICON.chevron}</span></button>`;
  }).join("")}</div>` : `<p class="sec-sub">${esc(t("noUpcomingEvents"))}</p>`}</section>`;
  return h;
}
function homeHTML() {
  const greet = `<h1 class="large">${esc(firstName() ? t("hi", { n: firstName() }) : t("tHome"))}</h1>`;
  if (!isAdmin()) return greet + volunteerHomeHTML();
  return greet + `<div class="seg wide" role="group" aria-label="View">
      <button type="button" data-mode="organize" aria-pressed="${st.homeMode === "organize"}">${esc(t("organize"))}</button>
      <button type="button" data-mode="volunteer" aria-pressed="${st.homeMode === "volunteer"}">${esc(t("volunteerMode"))}</button></div>` +
    (st.homeMode === "organize" ? organizeHomeHTML() : volunteerHomeHTML());
}

/* ---------- Events ---------- */
function eventsHTML() {
  const items = allItems(), future = items.filter((e) => e.date >= todayS());
  return `<h1 class="large">${esc(t("tEvents"))}</h1>
    <section><h3 class="sec">${esc(t("upcoming"))}</h3>${future.length ? `<div class="group glass">${future.slice(0, 12).map(rowHTML).join("")}</div>` : `<p class="sec-sub">${esc(t("noUpcomingEvents"))}</p>`}
    ${isAdmin() && future.some((e) => e._draft) ? `<p class="sec-sub after">${esc(t("draftsNote"))}</p>` : ""}</section>
    <section><div class="cal-head"><h3 class="sec">${esc(new Intl.DateTimeFormat(loc(), { month: "long", year: "numeric" }).format(st.month))}</h3>
      <span class="cal-nav"><button class="icon-btn" type="button" data-month="-1" aria-label="${esc(t("prev"))}">‹</button><button class="btn sm" type="button" data-month="0">${esc(t("jumpToday"))}</button><button class="icon-btn" type="button" data-month="1" aria-label="${esc(t("next"))}">›</button></span></div>
      ${calendarHTML(items)}${dayPanelHTML(items)}</section>`;
}
function calendarHTML(items) {
  const byDay = {}; for (const e of items) (byDay[e.date] = byDay[e.date] || []).push(e);
  const first = st.month, start = new Date(first); start.setDate(1 - first.getDay());
  const today = todayS(), lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0);
  const cells = Math.ceil((first.getDay() + lastDay.getDate()) / 7) * 7;
  const dows = [...Array(7)].map((_, i) => new Intl.DateTimeFormat(loc(), { weekday: "narrow" }).format(new Date(2026, 1, 1 + i)));
  let h = `<div class="cal glass">${dows.map((d) => `<span class="dow">${esc(d)}</span>`).join("")}`;
  for (let i = 0; i < cells; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i); const s = ymd(d); const evs = byDay[s] || [];
    const cls = ["day", d.getMonth() !== first.getMonth() ? "out" : "", s === today ? "today" : "", s === st.sel ? "sel" : ""].join(" ");
    const label = fmt(s, { weekday: "long", month: "long", day: "numeric" }) + (evs.length ? ", " + evs.map(title).join(", ") : "");
    h += `<button type="button" class="${cls}" data-day="${s}" aria-label="${esc(label)}" aria-pressed="${s === st.sel}"><span class="n">${d.getDate()}</span>
      <span class="dots">${evs.slice(0, 3).map((e) => `<i class="${isFest(e) ? "fest" : e._draft ? "draft" : ""}"></i>`).join("")}</span></button>`;
  }
  return h + "</div>";
}
function dayPanelHTML(items) {
  const evs = items.filter((e) => e.date === st.sel);
  return `<div class="day-head"><h3 class="sec">${esc(fmt(st.sel, { weekday: "long", month: "long", day: "numeric" }))}</h3>
    ${isAdmin() ? `<button class="btn sm" type="button" data-new="${st.sel}">${ICON.plus}${esc(t("addDay"))}</button>` : ""}</div>
    ${evs.length ? `<div class="group glass">${evs.map(rowHTML).join("")}</div>` : `<p class="sec-sub">${esc(t("nothingDay"))}</p>`}`;
}

/* ---------- Team chat (admins and owner) ---------- */
function chatHTML() {
  if (st.chatOff) return `<h1 class="large">${esc(t("chatTitle"))}</h1><div class="note warn">${esc(t("chatOff"))}</div>`;
  return `<h1 class="large">${esc(t("chatTitle"))}</h1><p class="sec-sub">${esc(t("chatHint"))}</p>
    <div id="msgs" class="msgs" aria-live="polite">${msgsHTML()}</div>
    <form id="chatForm" class="composer glass" novalidate>
      <textarea id="chatInput" data-keep rows="1" maxlength="2000" placeholder="${esc(t("chatPlaceholder"))}" aria-label="${esc(t("chatPlaceholder"))}"></textarea>
      <button class="send" type="submit" aria-label="${esc(t("send"))}">${ICON.send}</button></form>`;
}
function dayLabel(iso) {
  const d = new Date(iso), k = ymd(d), today = todayS();
  if (k === today) return t("today");
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (k === ymd(y)) return t("yesterday");
  return new Intl.DateTimeFormat(loc(), { weekday: "long", month: "short", day: "numeric" }).format(d);
}
function msgsHTML() {
  if (!st.messages.length) return `<p class="sec-sub center">${esc(t("chatEmpty"))}</p>`;
  let h = "", lastDay = "", lastUser = "";
  for (const m of st.messages) {
    const k = ymd(new Date(m.created_at));
    if (k !== lastDay) { h += `<div class="daysep"><span>${esc(dayLabel(m.created_at))}</span></div>`; lastDay = k; lastUser = ""; }
    const mine = m.user_id === myId(), cont = m.user_id === lastUser;
    const time = new Intl.DateTimeFormat(loc(), { hour: "numeric", minute: "2-digit" }).format(new Date(m.created_at));
    h += `<div class="msg${mine ? " mine" : ""}${cont ? " cont" : ""}">
      ${!mine ? `<span class="msg-av">${cont ? "" : avatar(m.user_id)}</span>` : ""}
      <div class="bubble${m._pending ? " pending" : ""}">${!mine && !cont ? `<span class="who" style="color:hsl(${hue(m.user_id)} 45% 38%)">${esc(nameOf(m.user_id))}</span>` : ""}<span class="body">${esc(m.body)}</span><span class="time">${esc(time)}</span></div></div>`;
    lastUser = m.user_id;
  }
  return h;
}
let chatStick = true;
function afterChatRender() { if (chatStick) requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight)); }
async function sendMessage() {
  const box = $("#chatInput"); const text = (box?.value || "").trim();
  if (!text) return;
  box.value = ""; box.style.height = "";
  const temp = { id: "tmp" + uid(), user_id: myId(), body: text, created_at: new Date().toISOString(), _pending: true };
  st.messages = st.messages.concat(temp); chatStick = true; render(); $("#chatInput")?.focus();
  const { error } = await sb.from("messages").insert({ body: text });
  if (error) { st.messages = st.messages.filter((m) => m !== temp); toast(errMsg(error)); render(); return; }
  await loadMessages(); render();
}

/* ---------- People (admins: approvals; owner: also admins) ---------- */
function peopleHTML() {
  const ppl = st.people;
  const waiting = ppl.filter((p) => p.role === "pending");
  const active = ppl.filter((p) => ["member", "admin", "owner"].includes(p.role))
    .sort((a, b) => ({ owner: 0, admin: 1, member: 2 }[a.role] - { owner: 0, admin: 1, member: 2 }[b.role]) || (a.full_name || "").localeCompare(b.full_name || ""));
  const removed = ppl.filter((p) => p.role === "blocked");
  const roleLabel = (r) => (r === "owner" ? t("owner") : r === "admin" ? t("admin") : "");
  const actions = (p) => {
    if (p.id === myId()) return `<span class="tag">${esc(t("you"))}</span>`;
    if (p.role === "pending") return `<button class="btn sm" type="button" data-setrole="${esc(p.id)}" data-r="blocked">${esc(t("decline"))}</button><button class="btn sm primary" type="button" data-setrole="${esc(p.id)}" data-r="member">${esc(t("approve"))}</button>`;
    if (p.role === "blocked") return `<button class="btn sm" type="button" data-setrole="${esc(p.id)}" data-r="member">${esc(t("restore"))}</button>`;
    if (p.role === "owner") return "";
    let h = "";
    if (isOwner()) h += p.role === "admin"
      ? `<button class="btn sm" type="button" data-setrole="${esc(p.id)}" data-r="member">${esc(t("removeAdmin"))}</button>`
      : `<button class="btn sm" type="button" data-setrole="${esc(p.id)}" data-r="admin">${esc(t("makeAdmin"))}</button>`;
    if (p.role === "member" || isOwner()) h += `<button class="btn sm quiet danger" type="button" data-setrole="${esc(p.id)}" data-r="blocked">${esc(t("removeAccess"))}</button>`;
    return h;
  };
  const list = (arr) => `<div class="group glass">${arr.map((p) => `<div class="person">${avatar(p.id, "lg", p.full_name || p.email)}
    <div class="cell-main"><span class="t">${esc(p.full_name || p.email || "")}${roleLabel(p.role) ? ` <span class="tag role-${esc(p.role)}">${esc(roleLabel(p.role))}</span>` : ""}</span>
    <span class="s">${esc(p.email || "")}${p.role === "pending" ? ", " + esc(t("requested", { d: shortDate(p.created_at) })) : ""}</span></div>
    <div class="acts">${actions(p)}</div></div>`).join("")}</div>`;
  return `<h1 class="large">${esc(t("peopleTitle"))}</h1><p class="sec-sub">${esc(isOwner() ? t("ownerNote") : t("adminNote"))}</p>
    <section><h3 class="sec">${esc(t("waiting"))} <span class="count-pill${waiting.length ? " hot" : ""}">${waiting.length}</span></h3>${waiting.length ? list(waiting) : `<p class="sec-sub">${esc(t("noneWaiting"))}</p>`}</section>
    <section><h3 class="sec">${esc(t("membersTab"))} <span class="count-pill">${active.length}</span></h3>${list(active)}</section>
    ${removed.length ? `<section><h3 class="sec">${esc(t("removedTab"))} <span class="count-pill">${removed.length}</span></h3>${list(removed)}</section>` : ""}`;
}

/* ---------- Me ---------- */
function meHTML() {
  const roleName = isOwner() ? t("owner") : isAdmin() ? t("admin") : t("member");
  return `<h1 class="large">${esc(t("tMe"))}</h1>
    <div class="group glass"><div class="person">${avatar(myId(), "xl", st.me?.full_name || st.me?.email)}
      <div class="cell-main"><span class="t big">${esc(st.me?.full_name || "")}</span><span class="s">${esc(st.me?.email || "")}</span></div>
      <span class="tag role-${esc(role())}">${esc(roleName)}</span></div></div>
    <section><h3 class="sec">${esc(t("yourRole"))}</h3><div class="group glass"><p class="pad">${esc(t("roleDesc_" + (isOwner() ? "owner" : isAdmin() ? "admin" : "member")))}</p></div></section>
    <section><h3 class="sec">${esc(t("language"))}</h3>${langSeg()}</section>
    ${canInstall() ? `<section><div class="group glass"><button type="button" class="cell-row" data-install><span class="cell-main"><span class="t">${esc(t("install"))}</span><span class="s">${esc(isIOS() && !st.installEvt ? t("iosInstall") : t("installBanner"))}</span></span><span class="chev">${ICON.chevron}</span></button></div></section>` : ""}
    <section><div class="group glass"><button type="button" class="cell-row danger-row" data-signout><span class="cell-main"><span class="t">${esc(t("signOut"))}</span></span></button></div></section>`;
}

const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const canInstall = () => !isStandalone() && (!!st.installEvt || isIOS());
async function doInstall() {
  if (st.installEvt) { st.installEvt.prompt(); await st.installEvt.userChoice.catch(() => {}); st.installEvt = null; render(); }
  else toast(t("iosInstall"));
}

/* ================= sheets ================= */
const dlg = $("#dlg");
function sheet(html) {
  dlg.innerHTML = `<div class="sheet-grab" aria-hidden="true"></div>${html}`;
  if (!dlg.open) dlg.showModal();
}
function openDetail(id, opts = {}) {
  const e = findItem(id); if (!e) { if (dlg.open && st.openId === id) dlg.close(); return; }
  if (st.openId !== id || st.dlgMode !== "event") { st.tab2 = "overview"; st.confirmDel = false; }
  st.openId = id; st.form = null; st.dlgMode = "event";
  const fest = isFest(e), slots = slotsOf(e), plan = planOf(id);
  const showVol = !fest && (slots.length || isAdmin());
  const showCheck = isAdmin() && !fest;
  if ((st.tab2 === "vol" && !showVol) || (st.tab2 === "check" && !showCheck)) st.tab2 = "overview";
  const v = volTotals(e);
  const tabs = showVol || showCheck ? `<div class="seg wide sheet-seg" role="tablist">
    <button type="button" role="tab" data-tab="overview" aria-pressed="${st.tab2 === "overview"}">${esc(t("tOverview"))}</button>
    ${showVol ? `<button type="button" role="tab" data-tab="vol" aria-pressed="${st.tab2 === "vol"}">${esc(t("tVol"))}${v.need ? ` ${v.have}/${v.need}` : ""}</button>` : ""}
    ${showCheck ? `<button type="button" role="tab" data-tab="check" aria-pressed="${st.tab2 === "check"}">${esc(t("tCheck"))}${plan.length ? ` ${plan.filter((i) => i.done).length}/${plan.length}` : ""}</button>` : ""}
  </div>` : "";
  const body = st.tab2 === "overview" ? overviewHTML(e) : st.tab2 === "vol" ? volunteersHTML(e) : checklistHTML(e);
  let foot;
  if (st.confirmDel) foot = `<span class="ask">${esc(t("confirmDel"))}</span><button class="btn" type="button" data-cancel-del>${esc(t("cancel"))}</button><button class="btn danger-solid" type="button" data-del-yes="${esc(id)}">${esc(t("delYes"))}</button>`;
  else foot = `${isAdmin() ? `<button class="btn quiet danger" type="button" data-del="${esc(id)}">${esc(t("del"))}</button>` : ""}
      ${fest && isAdmin() ? `<button class="btn" type="button" data-new="${e.date}" data-prefill="${esc(e.title || "")}">${esc(t("planFor"))}</button>` : ""}
      ${!fest && !e._draft && isAdmin() ? `<button class="btn" type="button" data-announce="${esc(id)}">${ICON.spark}${esc(t("announce"))}</button>` : ""}
      ${!fest && !e._draft && !isAdmin() ? `<a class="btn" href="${esc(gcalLink(e))}" target="_blank" rel="noopener">${esc(t("addGcal"))}</a>` : ""}
      ${isAdmin() ? `<button class="btn primary" type="button" data-edit="${esc(id)}">${esc(t("edit"))}</button>` : ""}`;
  sheet(`<div class="sheet-head"><div class="titles">${tagsHTML(e) ? `<div class="tags">${tagsHTML(e)}</div>` : ""}
      <h2>${esc(title(e))}</h2>${st.lang === "en" && e.titleTa ? `<p class="sub">${esc(e.titleTa)}</p>` : ""}</div>
      <button class="icon-btn close" type="button" data-close aria-label="${esc(t("close"))}">×</button></div>
    ${tabs}<div class="sheet-body">${body}</div>${foot.trim() ? `<div class="sheet-foot">${foot}</div>` : ""}`);
  if (opts.focus) document.getElementById(opts.focus)?.focus();
}
function overviewHTML(e) {
  const mine = myRsvp(e.id), c = counts(e.id);
  const label = c.going || c.maybe ? t("goingN", { n: c.going }) + (c.maybe ? ", " + t("maybeN", { n: c.maybe }) : "") : "";
  return `<div class="group inset"><div class="kv"><span>${esc(t("date"))}</span><b>${esc(fmt(e.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" }))}</b></div>
      ${isFest(e) ? "" : `<div class="kv"><span>${esc(t("time"))}</span><b>${esc(timeRange(e))}</b></div>`}
      ${e.venue ? `<div class="kv"><span>${esc(t("venue"))}</span><b>${esc(e.venue)}</b></div>` : ""}
      ${e.contact ? `<div class="kv"><span>${esc(t("contact"))}</span><b>${esc(e.contact)}</b></div>` : ""}</div>
    ${e.description ? `<p class="desc">${esc(e.description)}</p>` : ""}
    ${!isFest(e) && !e._draft ? `<div class="block"><h3 class="sec">${esc(t("willYou"))}</h3>${rsvpButtons(e)}
      ${mine?.status === "going" ? `<label class="guest">${esc(t("guests"))}<input type="number" min="0" max="20" value="${Number(mine.guests) || 0}" id="guestN"></label>` : ""}
      ${avatarStack(goingIds(e.id), label)}</div>` : ""}
    ${e.updatedBy && e.updatedAt ? `<p class="fine">${esc(t("edited", { n: nameOf(e.updatedBy), d: shortDate(e.updatedAt) }))}</p>` : ""}`;
}
function volunteersHTML(e) {
  const slots = slotsOf(e);
  if (!slots.length) return `<p class="sub">${esc(isAdmin() ? t("noSlotsAdmin") : t("noSlots"))}</p>${isAdmin() ? `<div><button class="btn" type="button" data-edit="${esc(e.id)}" data-focus-slots>${ICON.plus}${esc(t("addRoles"))}</button></div>` : ""}`;
  return `<div class="group inset">${slots.map((s) => {
    const ppl = slotPeople(e.id, s.id), need = Math.max(1, Number(s.need) || 1), inIt = ppl.includes(myId()), full = ppl.length >= need;
    const act = e._draft ? "" : inIt
      ? `<button class="btn sm" type="button" data-vol="${esc(e.id)}" data-slot="${esc(s.id)}" data-leave ${st.offlineAt ? "disabled" : ""}>${esc(t("leave"))}</button>`
      : `<button class="btn sm ${full ? "" : "primary"}" type="button" data-vol="${esc(e.id)}" data-slot="${esc(s.id)}" ${full || st.offlineAt ? "disabled" : ""}>${esc(full ? t("full") : t("signUp"))}</button>`;
    return `<div class="slot"><span class="cell-main"><span class="t">${esc(s.name)}</span>
      <span class="fill"><span class="bar"><i style="width:${Math.min(100, Math.round((ppl.length / need) * 100))}%"></i></span>${esc(t("filled", { a: ppl.length, b: need }))}${inIt ? ` <span class="mine">${esc(t("youIn"))}</span>` : ""}</span>
      ${isAdmin() && ppl.length ? `<span class="s">${esc(t("roster", { n: ppl.map(nameOf).join(", ") }))}</span>` : avatarStack(ppl)}</span>${act}</div>`;
  }).join("")}</div>`;
}
function checklistHTML(e) {
  const items = planOf(e.id), done = items.filter((i) => i.done).length;
  return `<p class="fine">${esc(t("clHint"))}</p>
    ${items.length ? `<div class="progress"><i style="width:${Math.round((done / items.length) * 100)}%"></i></div><p class="sub">${esc(t("clProgress", { a: done, b: items.length }))}</p>
    <div class="group inset">${items.map((i) => `<div class="item${i.done ? " done" : ""}">
      <input type="checkbox" data-tick="${esc(i.id)}" ${i.done ? "checked" : ""} aria-label="${esc(i.text)}">
      <span class="cell-main"><span class="t">${esc(i.text)}</span>${i.done && i.done_by ? `<span class="s">${esc(t("doneBy", { n: nameOf(i.done_by) }))}</span>` : ""}</span>
      <button class="icon-btn" type="button" data-rmitem="${esc(i.id)}" aria-label="${esc(t("remove"))}">×</button></div>`).join("")}</div>` : `<p class="sub">${esc(t("clEmpty"))}</p>`}
    <div class="btns">${!items.length ? `<button class="btn" type="button" data-starter>${esc(t("starter"))}</button>` : ""}
      <button class="btn" type="button" data-ai-checklist ${st.aiBusy === "check" ? "disabled" : ""}>${ICON.spark}${esc(st.aiBusy === "check" ? t("aiWorking") : t("aiSuggest"))}</button></div>
    <form class="add-row" id="addItemForm"><input id="newItem" data-keep maxlength="200" placeholder="${esc(t("addItem"))}" aria-label="${esc(t("addItem"))}"><button class="btn" type="submit">${esc(t("add"))}</button></form>`;
}
function gcalLink(e) {
  const D = e.date.replace(/-/g, ""); let dates;
  if (e.start) { const s = e.start.replace(":", "") + "00", en = (e.end || e.start).replace(":", "") + "00"; dates = `${D}T${s}/${D}T${en}`; }
  else { const n = parse(e.date); n.setDate(n.getDate() + 1); dates = `${D}/${ymd(n).replace(/-/g, "")}`; }
  return "https://calendar.google.com/calendar/render?" + new URLSearchParams({ action: "TEMPLATE", text: e.title || "", dates, ctz: "America/New_York", location: e.venue || "", details: e.description || "" }).toString();
}

/* ---------- plan / edit form ---------- */
function openForm(id, presetDate, prefill, focusSlots, draft) {
  const e = id ? findItem(id) : null;
  st.openId = null; st.confirmDel = false; st.dlgMode = "form";
  const v = e ? { ...e } : { title: prefill ? prefill + (st.lang === "ta" ? " கொண்டாட்டம்" : " celebration") : "", date: presetDate || todayS(), category: "celebration" };
  st.form = { id: e?.id || null, slots: slotsOf(v).map((s) => ({ ...s })), origSlotIds: slotsOf(v).map((s) => s.id) };
  sheet(`<form class="sheet-form" novalidate id="evForm">
    <div class="sheet-head"><div class="titles"><h2>${esc(e ? t("editEvent") : t("newEvent"))}</h2></div>
      <button class="icon-btn close" type="button" data-close aria-label="${esc(t("close"))}">×</button></div>
    <div class="sheet-body">
      ${!e ? `<div class="ai-card inline"><h3>${ICON.spark}${esc(t("aiPlanTitle"))}</h3><p class="sub">${esc(t("aiFormHint"))}</p>
        <textarea id="aiFormDesc" rows="2" maxlength="1000" placeholder="${esc(t("aiPlaceholder"))}"></textarea>
        <div class="btns"><button class="btn" type="button" data-ai-fill>${ICON.spark}${esc(t("aiFill"))}</button></div>
        <p class="ai-note" id="aiNote" hidden>${esc(t("aiFilled"))}</p></div>` : ""}
      <div class="group inset form-group">
        <label class="f">${esc(t("fTitle"))}<input name="title" maxlength="120" value="${esc(v.title || "")}" required></label>
        <label class="f">${esc(t("fTitleTa"))}<input name="titleTa" maxlength="120" value="${esc(v.titleTa || "")}" lang="ta"></label>
        <label class="f">${esc(t("fType"))}<select name="category">${CATS.map((c) => `<option value="${c}" ${v.category === c ? "selected" : ""}>${esc(t("cat")[c])}</option>`).join("")}</select></label>
        <label class="f">${esc(t("fDesc"))}<textarea name="description" maxlength="4000" rows="3">${esc(v.description || "")}</textarea></label>
      </div>
      <h3 class="sec">${esc(t("gWhen"))}</h3>
      <div class="group inset form-group">
        <label class="f">${esc(t("fDate"))}<input type="date" name="date" value="${esc(v.date || "")}" required></label>
        <div class="two"><label class="f">${esc(t("fStart"))}<input type="time" name="start" value="${esc(v.start || "")}"></label>
        <label class="f">${esc(t("fEnd"))}<input type="time" name="end" value="${esc(v.end || "")}"></label></div>
        <label class="f">${esc(t("fVenue"))}<input name="venue" maxlength="160" value="${esc(v.venue || "")}"></label>
        <label class="f">${esc(t("fContact"))}<input name="contact" maxlength="120" value="${esc(v.contact || "")}"></label>
        <label class="check"><input type="checkbox" name="tentative" ${v.tentative ? "checked" : ""}>${esc(t("fTbc"))}</label>
      </div>
      <h3 class="sec" id="slotGroup">${esc(t("gVol"))}</h3><div id="slotList"></div>
      <div class="group inset form-group"><label class="check"><input type="checkbox" name="draft" ${e?._draft ? "checked" : ""}>${esc(t("fDraft"))}</label></div>
      <p class="err" id="formErr" role="alert"></p>
    </div>
    <div class="sheet-foot">
      <button class="btn" type="button" data-form-cancel="${esc(e?.id || "")}">${esc(t("cancel"))}</button>
      <button class="btn primary" type="submit" id="saveBtn">${esc(e ? t("saveChanges") : t("publish"))}</button>
    </div></form>`);
  renderSlotEditor();
  const f = $("#evForm");
  f.draft.addEventListener("change", () => { if (!e) $("#saveBtn").textContent = f.draft.checked ? t("saveDraft") : t("publish"); });
  if (draft) applyDraft(draft);
  else if (focusSlots) { $("#slotGroup").scrollIntoView({ block: "center" }); addSlot(""); }
}
function applyDraft(d) {
  const f = $("#evForm"); if (!f) return;
  const set = (n, v) => { if (v != null && v !== "" && f[n]) f[n].value = v; };
  set("title", d.title); set("titleTa", d.title_ta); set("description", d.description); set("venue", d.venue);
  if (/^\d{4}-\d{2}-\d{2}$/.test(d.date || "")) set("date", d.date);
  if (/^\d{2}:\d{2}$/.test(d.start || "")) set("start", d.start);
  if (/^\d{2}:\d{2}$/.test(d.end || "")) set("end", d.end);
  if (CATS.includes(d.category)) f.category.value = d.category;
  if (Array.isArray(d.slots) && d.slots.length) { st.form.slots = d.slots.map((s) => ({ id: uid(), name: String(s.name), need: Number(s.need) || 1 })); renderSlotEditor(); }
  const note = $("#aiNote"); if (note) note.hidden = false;
}
function renderSlotEditor() {
  const list = $("#slotList"); if (!list) return;
  const sl = st.form.slots;
  list.innerHTML = `${sl.length ? `<div class="group inset">${sl.map((s, i) => `<div class="slot-edit">
      <input data-sname="${i}" maxlength="80" value="${esc(s.name)}" aria-label="${esc(t("slotName"))}" placeholder="${esc(t("slotName"))}">
      <input data-sneed="${i}" type="number" min="1" max="99" value="${Number(s.need) || 1}" aria-label="${esc(t("slotNeed"))}">
      <button class="icon-btn" type="button" data-rmslot="${i}" aria-label="${esc(t("remove"))}">×</button></div>`).join("")}</div>` : ""}
    <div class="chips"><button type="button" data-addslot="">${ICON.plus}${esc(t("addSlot"))}</button>
      ${S[st.lang].sugg.filter((n) => !sl.some((s) => s.name === n)).map((n) => `<button type="button" data-addslot="${esc(n)}">${esc(n)}</button>`).join("")}</div>`;
}
function addSlot(name) {
  st.form.slots.push({ id: uid(), name, need: name ? 2 : 1 }); renderSlotEditor();
  if (!name) document.querySelector(`[data-sname="${st.form.slots.length - 1}"]`)?.focus();
}
async function saveForm() {
  const f = $("#evForm"), err = $("#formErr"); err.textContent = "";
  const titleV = f.title.value.trim(), date = f.date.value;
  if (!titleV) { err.textContent = t("needTitle"); f.title.focus(); return; }
  if (!date) { err.textContent = t("needDate"); f.date.focus(); return; }
  if (f.start.value && f.end.value && f.end.value < f.start.value) { err.textContent = t("badTime"); f.end.focus(); return; }
  const slots = st.form.slots.map((s) => ({ id: s.id, name: String(s.name || "").trim(), need: Math.max(1, Math.min(99, Number(s.need) || 1)) }));
  if (slots.some((s) => !s.name)) { err.textContent = t("needSlotName"); return; }
  const cat = f.category.value;
  const row = {
    title: titleV, title_ta: f.titleTa.value.trim(), date, start_time: f.start.value || null, end_time: f.end.value || null,
    venue: f.venue.value.trim(), contact: f.contact.value.trim(), category: cat, description: f.description.value.trim(),
    tentative: f.tentative.checked, kind: cat === "festival" ? "festival" : "event", status: f.draft.checked ? "draft" : "published", slots
  };
  const editing = !!st.form.id;
  $("#saveBtn").disabled = true;
  const q = editing ? sb.from("events").update(row).eq("id", st.form.id).select().single() : sb.from("events").insert(row).select().single();
  const { data, error } = await q;
  if (error) { $("#saveBtn").disabled = false; err.textContent = errMsg(error); return; }
  const removed = st.form.origSlotIds.filter((sid) => !slots.some((s) => s.id === sid));
  if (editing && removed.length) await sb.from("volunteer_signups").delete().eq("event_id", data.id).in("slot_id", removed);
  toast(editing ? t("saved") : row.status === "draft" ? t("drafted") : t("published"));
  const ev = normEvent(data);
  st.events = st.events.filter((x) => x.id !== ev.id).concat(ev);
  st.sel = date; const d = parse(date); st.month = new Date(d.getFullYear(), d.getMonth(), 1);
  st.form = null; render(); openDetail(ev.id); scheduleReload();
}
async function deleteEvent(id) {
  const { error } = await sb.from("events").delete().eq("id", id);
  if (error) { st.confirmDel = false; openDetail(id); toast(errMsg(error)); return; }
  st.events = st.events.filter((e) => e.id !== id);
  dlg.close(); toast(t("deleted")); render(); scheduleReload();
}

/* ---------- AI actions ---------- */
async function aiDraftFromHome() {
  const text = ($("#aiDesc")?.value || "").trim();
  if (!text) { toast(t("aiNeedText")); $("#aiDesc")?.focus(); return; }
  st.aiBusy = "draft"; render();
  try {
    const d = await ai("draft_event", { description: text });
    st.aiBusy = null; render();
    const el = $("#aiDesc"); if (el) el.value = "";
    openForm(null, d.date || todayS(), null, false, d);
  } catch (e) { st.aiBusy = null; render(); toast(t("aiFail", { m: e.message })); }
}
async function aiFillForm(btn) {
  const text = ($("#aiFormDesc")?.value || "").trim();
  if (!text) { toast(t("aiNeedText")); $("#aiFormDesc")?.focus(); return; }
  btn.disabled = true; const label = btn.innerHTML; btn.innerHTML = ICON.spark + esc(t("aiWorking"));
  try { applyDraft(await ai("draft_event", { description: text })); }
  catch (e) { toast(t("aiFail", { m: e.message })); }
  btn.disabled = false; btn.innerHTML = label;
}
async function aiChecklist(evId) {
  const e = findItem(evId); if (!e) return;
  st.aiBusy = "check"; openDetail(evId);
  try {
    const r = await ai("checklist", { event: eventSummary(e), existing: planOf(evId).map((i) => i.text) });
    const base = Date.now() / 1000;
    const items = (r.items || []).filter(Boolean).map((text, i) => ({ id: newId(), event_id: evId, text: String(text).slice(0, 200), done: false, done_by: null, position: base + i }));
    st.aiBusy = null;
    if (items.length) { st.checklist.push(...items); planWrite(() => sb.from("checklist_items").insert(items)); toast(t("aiAdded", { n: items.length })); }
    else openDetail(evId);
  } catch (err) { st.aiBusy = null; openDetail(evId); toast(t("aiFail", { m: err.message })); }
}
async function openAnnounce(evId) {
  const e = findItem(evId); if (!e) return;
  st.dlgMode = "announce"; st.announce = { id: evId, text: "", busy: true };
  renderAnnounce();
  try {
    const open = slotsOf(e).map((s) => ({ role: s.name, spots_left: Math.max(0, (Number(s.need) || 1) - slotPeople(e.id, s.id).length) })).filter((x) => x.spots_left > 0);
    const r = await ai("announce", { event: eventSummary(e), open, link: location.origin });
    if (st.announce?.id === evId) { st.announce = { id: evId, text: r.text || "", busy: false }; renderAnnounce(); }
  } catch (err) {
    if (st.announce?.id === evId) { st.announce = { id: evId, text: "", busy: false, error: err.message }; renderAnnounce(); }
  }
}
function renderAnnounce() {
  const a = st.announce, e = findItem(a.id);
  const text = $("#annText")?.value ?? a.text;
  sheet(`<div class="sheet-head"><div class="titles"><h2>${esc(t("announceTitle"))}</h2><p class="sub">${esc(e ? title(e) : "")}</p></div>
      <button class="icon-btn close" type="button" data-close aria-label="${esc(t("close"))}">×</button></div>
    <div class="sheet-body">
      ${a.busy ? `<p class="sub working">${ICON.spark}${esc(t("aiWorking"))}</p>` : a.error ? `<p class="err">${esc(t("aiFail", { m: a.error }))}</p><div class="btns"><button class="btn" type="button" data-announce="${esc(a.id)}">${esc(t("checkAgain"))}</button></div>` : `
      <p class="fine">${esc(t("announceHint"))}</p>
      <textarea id="annText" class="ann" rows="9" maxlength="1500">${esc(text)}</textarea>`}
    </div>
    ${!a.busy && !a.error ? `<div class="sheet-foot">
      <button class="btn" type="button" data-copy-ann>${esc(t("copy"))}</button>
      ${st.chatOff ? "" : `<button class="btn" type="button" data-post-ann>${esc(t("postChat"))}</button>`}
      <a class="btn primary wa" id="waLink" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">${esc(t("shareWA"))}</a></div>` : ""}`);
}

/* ================= RSVP / volunteer / checklist writes ================= */
let writing = Promise.resolve();
function queue(fn) { writing = writing.then(fn).catch(() => {}); return writing; }
function setRsvp(id, s) {
  const me = myId(); const cur = myRsvp(id); const next = cur?.status === s ? null : s;
  st.rsvps = st.rsvps.filter((r) => !(r.event_id === id && r.user_id === me));
  if (next) st.rsvps.push({ event_id: id, user_id: me, status: next, guests: next === "going" ? cur?.guests || 0 : 0 });
  refresh(true);
  queue(async () => {
    const { error } = next
      ? await sb.from("rsvps").upsert({ event_id: id, user_id: me, status: next, guests: next === "going" ? cur?.guests || 0 : 0, updated_at: new Date().toISOString() })
      : await sb.from("rsvps").delete().eq("event_id", id).eq("user_id", me);
    if (error) { toast(errMsg(error)); scheduleReload(); }
  });
}
let guestTimer;
function setGuests(id, g) {
  clearTimeout(guestTimer);
  guestTimer = setTimeout(() => {
    const r = myRsvp(id); if (!r) return;
    r.guests = g; render();
    queue(async () => { const { error } = await sb.from("rsvps").update({ guests: g, updated_at: new Date().toISOString() }).eq("event_id", id).eq("user_id", myId()); if (error) toast(errMsg(error)); });
  }, 600);
}
function toggleVol(evId, slotId, leave, btn) {
  if (btn) btn.disabled = true;
  queue(async () => {
    const me = myId();
    const { error } = leave
      ? await sb.from("volunteer_signups").delete().eq("event_id", evId).eq("slot_id", slotId).eq("user_id", me)
      : await sb.from("volunteer_signups").insert({ event_id: evId, slot_id: slotId, user_id: me });
    if (error) { toast(errMsg(error)); await loadAll(); return; }
    if (leave) st.signups = st.signups.filter((s) => !(s.event_id === evId && s.slot_id === slotId && s.user_id === me));
    else {
      st.signups.push({ event_id: evId, slot_id: slotId, user_id: me });
      if (!myRsvp(evId)) { st.rsvps.push({ event_id: evId, user_id: me, status: "going", guests: 0 }); await sb.from("rsvps").upsert({ event_id: evId, user_id: me, status: "going", guests: 0 }); }
    }
    toast(leave ? t("volLeft") : t("volSaved"));
    refresh(true);
  });
}
function planWrite(promiseFn, focus) {
  refresh(true, focus);
  queue(async () => { const { error } = await promiseFn(); if (error) { toast(errMsg(error)); scheduleReload(); } });
}
function addTask(evId, text) {
  const item = { id: newId(), event_id: evId, text, done: false, done_by: null, position: Date.now() / 1000 };
  st.checklist.push(item); planWrite(() => sb.from("checklist_items").insert(item), "newItem");
}
function addStarter(evId) {
  const base = Date.now() / 1000;
  const items = S[st.lang].starterItems.map((text, i) => ({ id: newId(), event_id: evId, text, done: false, done_by: null, position: base + i }));
  st.checklist.push(...items); planWrite(() => sb.from("checklist_items").insert(items));
}
function tickTask(itemId, on) {
  const it = st.checklist.find((i) => i.id === itemId); if (!it) return;
  it.done = on; it.done_by = on ? myId() : null;
  planWrite(() => sb.from("checklist_items").update({ done: on, done_by: on ? myId() : null, done_at: on ? new Date().toISOString() : null }).eq("id", itemId));
}
function removeTask(itemId) { st.checklist = st.checklist.filter((i) => i.id !== itemId); planWrite(() => sb.from("checklist_items").delete().eq("id", itemId)); }
async function setRole(target, newRole, btn) {
  if (btn) btn.disabled = true;
  const prev = st.people.find((p) => p.id === target)?.role;
  const { error } = await sb.rpc("set_member_role", { target, new_role: newRole });
  if (error) { toast(errMsg(error)); if (btn) btn.disabled = false; return; }
  st.people = st.people.map((p) => (p.id === target ? { ...p, role: newRole } : p));
  toast(prev === "pending" ? (newRole === "member" ? t("approved") : t("declined")) : t("roleSaved"));
  render(); scheduleReload();
}

/* ================= refresh ================= */
function dialogBusy() {
  const a = document.activeElement;
  return dlg.open && a && dlg.contains(a) && ["INPUT", "TEXTAREA", "SELECT"].includes(a.tagName) && a.type !== "checkbox";
}
function refresh(force, focus) {
  render();
  if (st.screen !== "app" || !dlg.open) return;
  if (st.dlgMode === "event" && st.openId && (force || !dialogBusy())) openDetail(st.openId, { focus });
}

/* ================= event handling ================= */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button,a"); if (!b) return;
  const D = b.dataset;
  if (D.lang) { st.lang = D.lang; store.set("gats-lang", st.lang); refresh(true); return; }
  if (D.tabgo) { st.tab = D.tabgo; chatStick = true; if (dlg.open) dlg.close(); render(); window.scrollTo(0, 0); afterTabSwitch(); return; }
  if (D.mode) { st.homeMode = D.mode; store.set("gats-home-mode", D.mode); render(); return; }
  if (D.scroll) { document.querySelector(D.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  if (D.google !== undefined) { signInGoogle(); return; }
  if (D.resend !== undefined) { st.auth.step = "start"; sendCode(); return; }
  if (D.authBack !== undefined) { st.auth.step = "start"; st.auth.error = ""; render(); return; }
  if (D.checkAgain !== undefined) { fetchMe().then((me) => { if (me && me.role !== "pending") route(st.session); else toast(t("stillPending")); }).catch(() => toast(t("writeFail"))); return; }
  if (D.signout !== undefined) { signOut(); return; }
  if (D.install !== undefined) { doInstall(); return; }
  if (D.installDismiss !== undefined) { st.installDismissed = true; store.set("gats-install-dismissed", "1"); render(); return; }
  if (D.setrole) { setRole(D.setrole, D.r, b); return; }
  if (D.plan !== undefined) { openForm(null, st.sel >= todayS() ? st.sel : todayS()); return; }
  if (D.open) { openDetail(D.open); return; }
  if (D.openvol) { openDetail(D.openvol); st.tab2 = "vol"; openDetail(D.openvol); return; }
  if (D.new !== undefined) { openForm(null, D.new || todayS(), D.prefill); return; }
  if (D.edit) { openForm(D.edit, null, null, D.focusSlots !== undefined); return; }
  if (D.del) { st.confirmDel = true; openDetail(D.del); return; }
  if (D.cancelDel !== undefined) { st.confirmDel = false; openDetail(st.openId); return; }
  if (D.delYes) { deleteEvent(D.delYes); return; }
  if (D.close !== undefined) { dlg.close(); return; }
  if (D.formCancel !== undefined) { if (D.formCancel) openDetail(D.formCancel); else dlg.close(); return; }
  if (D.tab) { st.tab2 = D.tab; openDetail(st.openId); return; }
  if (D.rsvp) { setRsvp(D.rsvp, D.s); return; }
  if (D.vol) { toggleVol(D.vol, D.slot, D.leave !== undefined, b); return; }
  if (D.addslot !== undefined) { addSlot(D.addslot); return; }
  if (D.rmslot !== undefined) { st.form.slots.splice(Number(D.rmslot), 1); renderSlotEditor(); return; }
  if (D.starter !== undefined) { addStarter(st.openId); return; }
  if (D.rmitem) { removeTask(D.rmitem); return; }
  if (D.aiDraft !== undefined) { aiDraftFromHome(); return; }
  if (D.aiFill !== undefined) { aiFillForm(b); return; }
  if (D.aiChecklist !== undefined) { aiChecklist(st.openId); return; }
  if (D.announce) { openAnnounce(D.announce); return; }
  if (D.copyAnn !== undefined) { const txt = $("#annText")?.value || ""; (navigator.clipboard?.writeText(txt) || Promise.reject()).then(() => toast(t("copied")), () => { $("#annText")?.select(); }); return; }
  if (D.postAnn !== undefined) { const txt = ($("#annText")?.value || "").trim(); if (!txt) return; sb.from("messages").insert({ body: txt }).then(({ error }) => { if (error) toast(errMsg(error)); else { toast(t("posted")); loadMessages().then(render); } }); return; }
  if (D.day) { st.sel = D.day; const d = parse(st.sel); if (d.getMonth() !== st.month.getMonth()) st.month = new Date(d.getFullYear(), d.getMonth(), 1); render(); return; }
  if (D.month !== undefined) {
    const n = Number(D.month);
    if (n === 0) { const d = new Date(); st.month = new Date(d.getFullYear(), d.getMonth(), 1); st.sel = todayS(); }
    else st.month = new Date(st.month.getFullYear(), st.month.getMonth() + n, 1);
    render(); return;
  }
});
function afterTabSwitch() { if (st.tab === "chat" && isAdmin()) loadMessages().then(render); }
document.addEventListener("change", (ev) => { const el = ev.target; if (el.dataset.tick) tickTask(el.dataset.tick, el.checked); });
document.addEventListener("submit", (ev) => {
  const id = ev.target.id;
  if (["evForm", "addItemForm", "emailForm", "codeForm", "chatForm"].includes(id)) ev.preventDefault();
  if (id === "evForm") saveForm();
  if (id === "emailForm") sendCode();
  if (id === "codeForm") verifyCode();
  if (id === "chatForm") sendMessage();
  if (id === "addItemForm") { const txt = $("#newItem").value.trim(); if (txt) { $("#newItem").value = ""; addTask(st.openId, txt); } }
});
document.addEventListener("input", (ev) => {
  const el = ev.target;
  if (el.dataset.sname !== undefined) { st.form.slots[Number(el.dataset.sname)].name = el.value; return; }
  if (el.dataset.sneed !== undefined) { st.form.slots[Number(el.dataset.sneed)].need = Number(el.value) || 1; return; }
  if (el.id === "guestN" && st.openId) setGuests(st.openId, Math.max(0, Math.min(20, Number(el.value) || 0)));
  if (el.id === "chatInput") { el.style.height = "auto"; el.style.height = Math.min(140, el.scrollHeight) + "px"; }
  if (el.id === "annText") { const a = $("#waLink"); if (a) a.href = "https://wa.me/?text=" + encodeURIComponent(el.value); }
});
document.addEventListener("keydown", (ev) => {
  // Enter sends in the team chat on a keyboard; Shift+Enter adds a new line. On phones, Enter adds a line, like WhatsApp.
  if (ev.target.id === "chatInput" && ev.key === "Enter" && !ev.shiftKey && !matchMedia("(pointer: coarse)").matches) { ev.preventDefault(); sendMessage(); }
});
window.addEventListener("scroll", () => { if (st.tab === "chat") chatStick = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80; }, { passive: true });
dlg.addEventListener("close", () => { st.openId = null; st.form = null; st.confirmDel = false; st.dlgMode = null; st.announce = null; });
dlg.addEventListener("click", (ev) => { if (ev.target === dlg) dlg.close(); });
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); st.installEvt = e; if (st.screen === "app") render(); });
window.addEventListener("appinstalled", () => { st.installEvt = null; render(); });
window.addEventListener("online", () => { if (st.screen === "app") loadAll(); });
document.addEventListener("visibilitychange", () => { if (!document.hidden && st.screen === "app") scheduleReload(); });

let tt;
function toast(m) { const el = $("#toast"); el.textContent = m; el.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 3400); }

/* ================= start ================= */
render();
if (sb) {
  let last = null;
  sb.auth.onAuthStateChange((event, session) => {
    const id = session?.user?.id || null;
    if (event === "TOKEN_REFRESHED" && id === last) { st.session = session; return; }
    last = id;
    setTimeout(() => route(session), 0);
  });
}
