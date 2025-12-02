# TinyChurch

## What This Is
Church directory and communication tool for small churches (<100 members).
Designed for solo pastors with zero admin time.

## Tech Stack
- Next.js 14 (App Router)
- Supabase (Postgres + Auth with magic links)
- Resend (email)
- Tailwind CSS
- Prisma ORM
- Deployed on Vercel

## Core Entities
- Church (name, slug, pastorEmail)
- Member (churchId, householdId, householdName, name, email, phone, address, role, status)
- Visitor (churchId, name, phone, email, whatBroughtYou, visitedAt, contacted)
- Group (churchId, name, isSystem)
- GroupMember (groupId, memberId, isLeader)
- PrayerRequest (churchId, submittedBy, requestText, isPrivate, sharedAt)
- EmailLog (churchId, sentBy, recipientType, recipientGroupId, subject, body)

## User Roles
- Admin (pastor): full access
- Member: view directory, edit own profile, submit prayer requests
- Group Leader: email their group(s)

## Design Principles
- No passwords (magic link auth)
- Members maintain their own data
- No automation—facilitate authentic connection
- Mobile-first, works on old devices
- Large touch targets, high contrast
```

This gives Claude Code context on every task.

---

## Development Phases

### Phase 1: Foundation (Day 1-2)

**Task 1: Project Setup**
```
claude "Initialize a new Next.js 14 project with App Router, Tailwind CSS, 
and Prisma. Set up the folder structure for a multi-tenant SaaS app 
where each church is a tenant identified by slug in the URL."
```

**Task 2: Database Schema**
```
claude "Create the Prisma schema for TinyChurch based on PROJECT.md. 
Include all entities. Set up the Supabase connection. Generate and 
run the initial migration."
```

**Task 3: Auth Setup**
```
claude "Set up Supabase Auth with magic link (email) authentication. 
Create the auth flow: login page, magic link handling, session management. 
After auth, user should be redirected to their church's dashboard."
```

---

### Phase 2: Core Member Features (Day 3-5)

**Task 4: Church Onboarding**
```
claude "Create the church signup flow:
1. /signup page - pastor enters email + church name
2. After auth, prompt for church slug (URL)
3. Pastor becomes first member with admin role
4. Redirect to dashboard with invite link displayed"
```

**Task 5: Member Registration**
```
claude "Create the member join flow at /[churchSlug]/join:
1. Form: name, phone, email, address
2. Optional: household name field
3. On submit: create member with status='pending', generate householdId
4. Show confirmation with family join link
5. Notify admin (pastor) of pending member"
```

**Task 6: Family Join Link**
```
claude "Implement the family join link flow:
1. URL format: /[churchSlug]/join?household=[householdId]
2. Pre-fill householdId (hidden) and householdName from existing member
3. New member automatically linked to same household
4. Same pending → approved flow"
```

**Task 7: Member Approval**
```
claude "Create the admin approval flow:
1. Dashboard shows pending member count
2. Pending members list with one-tap approve button
3. On approve: update status, send welcome email with login link
4. Use Resend for email delivery"
```

**Task 8: Directory View**
```
claude "Create the member directory at /[churchSlug]/directory:
1. List all approved members grouped by household
2. Search by name
3. Tap to see full contact details
4. Mobile-optimized cards with large text
5. Only accessible to approved members"
```

**Task 9: Profile Editing**
```
claude "Create profile editing:
1. /[churchSlug]/profile page
2. Member can edit their own info (name, phone, email, address)
3. Display their family join link for sharing
4. Save updates to database"
```

---

### Phase 3: Visitor Capture (Day 6)

**Task 10: Visitor Form**
```
claude "Create the public visitor form at /[churchSlug]/visitor:
1. No auth required
2. Fields: name (required), phone (required), email (optional), 
   'What brought you here?' (optional textarea)
3. Warm, friendly copy
4. On submit: save to Visitor table, show thank you message
5. No further action from visitor"
```

**Task 11: Visitor Dashboard**
```
claude "Add visitor management to admin dashboard:
1. Show 'X new visitors this week' count
2. List: name, phone, date, what they shared
3. 'Contacted' checkbox that persists
4. Sorted newest first"
```

---

### Phase 4: Groups (Day 7-8)

**Task 12: Group Management**
```
claude "Create group management for admins:
1. Default groups created on church setup: 'Leadership', 'Prayer Chain'
2. Admin can create new groups
3. Admin can add/remove members from groups
4. Admin can designate group leaders (isLeader flag)"
```

**Task 13: Group Leader View**
```
claude "Create group leader functionality:
1. Leader sees 'My Groups' section in their dashboard
2. Shows groups where they are leader with member count
3. 'Email Group' button for each"
```

---

### Phase 5: Communication (Day 9-10)

**Task 14: Email Sending**
```
claude "Create the email composition and sending flow:
1. /[churchSlug]/admin/email page
2. Select recipients: Everyone OR specific group
3. Subject and body fields (plain text)
4. Preview before sending
5. Send via Resend to all selected recipients
6. Reply-to set to pastor's email
7. Log to EmailLog table"
```

**Task 15: Group Leader Email**
```
claude "Allow group leaders to email their groups:
1. 'Email Group' button on their group
2. Same compose flow but recipients locked to that group
3. From name: '[Leader Name] via TinyChurch'
4. Reply-to: leader's email"
```

---

### Phase 6: Prayer Requests (Day 11)

**Task 16: Prayer Request Submission**
```
claude "Create prayer request submission for members:
1. 'Submit Prayer Request' button in member nav/dashboard
2. Form: textarea for request, checkbox 'Keep private (pastor only)'
3. Save to PrayerRequest table
4. Confirmation message"
```

**Task 17: Prayer Request Dashboard**
```
claude "Add prayer request management for admin:
1. Dashboard shows 'X new prayer requests'
2. List: who submitted, when, request text, private/shareable badge
3. For non-private: 'Share with Prayer Chain' button
4. Sharing sends email to Prayer Chain group, sets sharedAt timestamp"
```

---

### Phase 7: Polish (Day 12-14)

**Task 18: QR Codes**
```
claude "Generate QR codes for each church:
1. Member join link QR
2. Visitor link QR
3. Display on admin dashboard
4. Downloadable as PNG for printing"
```

**Task 19: Mobile Optimization**
```
claude "Review all pages for mobile optimization:
1. Ensure all touch targets are at least 44px
2. Text is readable without zooming
3. Forms work well on mobile keyboards
4. Add PWA manifest for 'Add to Home Screen'
5. Test on slow 3G connection"
```

**Task 20: Email Templates**
```
claude "Create clean email templates for:
1. Magic link login
2. Welcome email (after approval)
3. General broadcast email
4. Prayer request share
Keep them simple, plain-text feeling, personal"
```

---

## Tips for Working with Claude Code

### Be Specific About Files
```
# Good
claude "In app/[churchSlug]/directory/page.tsx, add search functionality 
that filters members by first or last name as user types"

# Less Good  
claude "Add search to the directory"
```

### Reference Your Conventions
```
claude "Following the existing pattern in app/[churchSlug]/join/page.tsx, 
create the visitor form at app/[churchSlug]/visitor/page.tsx"
```

### Break Down Complex Tasks
Instead of "build the whole email system," do:
1. "Create the email compose form UI"
2. "Add recipient selection (everyone vs. group)"
3. "Integrate Resend for sending"
4. "Add EmailLog database writes"
5. "Add sent email history view"

### Let Claude Code Run Tests
```
claude "Write tests for the member approval flow, then run them"
```

### Use Claude Code for Debugging
```
claude "The family join link isn't pre-filling the household name. 
Debug why and fix it. The relevant files are app/[churchSlug]/join/page.tsx 
and lib/actions/member.ts"
```

---

## Recommended File Structure
```
tinychurch/
├── PROJECT.md                 # Project brief for context
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx          # Landing page
│   │   └── signup/page.tsx   # Church signup
│   ├── [churchSlug]/         # Tenant routes
│   │   ├── join/page.tsx     # Member registration
│   │   ├── visitor/page.tsx  # Visitor form (public)
│   │   ├── directory/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── prayer/page.tsx   # Submit prayer request
│   │   └── admin/
│   │       ├── page.tsx      # Dashboard
│   │       ├── members/page.tsx
│   │       ├── groups/page.tsx
│   │       ├── visitors/page.tsx
│   │       ├── prayers/page.tsx
│   │       └── email/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── callback/route.ts
│   └── api/                  # API routes if needed
├── components/
│   ├── ui/                   # Reusable UI components
│   └── forms/                # Form components
├── lib/
│   ├── supabase/            # Supabase client setup
│   ├── actions/             # Server actions
│   ├── email/               # Resend integration
│   └── utils/
├── prisma/
│   └── schema.prisma
└── public/