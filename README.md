# TinyChurch

Church directory and communication tool for small churches (<100 members).

## Tech Stack

- **Next.js 14** with App Router
- **Supabase** (PostgreSQL + Auth with magic links)
- **Prisma ORM** for database management
- **Tailwind CSS** for styling
- **Resend** for email delivery
- **Deployed on Vercel**

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and configure your Supabase connection:

```bash
cp .env.example .env
```

Fill in the following values:
- `DATABASE_URL`: Your Supabase PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `RESEND_API_KEY`: Your Resend API key (for email)

### 3. Set Up Database

Once you've configured your Supabase connection, generate the Prisma client and run migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Create and run the migration
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
tinychurch/
├── app/
│   ├── (marketing)/          # Public marketing pages
│   │   ├── page.tsx          # Landing page
│   │   └── signup/           # Church signup
│   ├── [churchSlug]/         # Multi-tenant routes
│   │   ├── join/             # Member registration
│   │   ├── visitor/          # Visitor form (public)
│   │   ├── directory/        # Member directory
│   │   ├── profile/          # Member profile
│   │   ├── prayer/           # Prayer requests
│   │   └── admin/            # Admin pages
│   │       ├── page.tsx      # Dashboard
│   │       ├── members/      # Member management
│   │       ├── groups/       # Group management
│   │       ├── visitors/     # Visitor tracking
│   │       ├── prayers/      # Prayer request management
│   │       └── email/        # Email sending
│   └── auth/                 # Authentication
├── components/
│   ├── ui/                   # Reusable UI components
│   └── forms/                # Form components
├── lib/
│   ├── prisma.ts             # Prisma client
│   ├── supabase/             # Supabase client setup
│   ├── actions/              # Server actions
│   ├── email/                # Resend integration
│   └── utils/                # Utility functions
└── prisma/
    └── schema.prisma         # Database schema
```

## Database Schema

The application uses the following core entities:

- **Church**: Multi-tenant church organizations
- **Member**: Church members with household grouping
- **Visitor**: First-time visitors to track
- **Group**: Member groups (e.g., Prayer Chain, Leadership)
- **GroupMember**: Many-to-many relationship for group membership
- **PrayerRequest**: Prayer requests from members
- **EmailLog**: Audit log for all emails sent

## Development Phases

See [PROJECT.md](./PROJECT.md) for detailed development phases and tasks.

## Design Principles

- No passwords (magic link authentication only)
- Members maintain their own data
- No automation—facilitate authentic connection
- Mobile-first, works on old devices
- Large touch targets, high contrast for accessibility
