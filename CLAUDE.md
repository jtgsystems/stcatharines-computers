# CLAUDE.md - St. Catharines Computers

## Project Overview
A modern computer repair business website for St. Catharines Computers, built with Next.js 16 and Material UI.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI**: Material UI v7 + Tailwind CSS v4
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **Auth**: NextAuth.js

## Project Structure
```
├── app/
│   ├── components/      # React components (Header, Footer, ThemeRegistry)
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── prisma/
│   └── schema.prisma    # Database schema (Page, Post models)
├── scripts/             # Utility scripts
└── wordpress-export/    # Legacy content migration
```

## Key Commands
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run migrate      # Run Prisma migrations
npm run migrate:content  # Import content from WordPress
```

## Database Models
- **Page**: CMS pages with slug, title, content, SEO fields
- **Post**: Blog posts (similar structure)

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- Auth credentials as needed

## Development Guidelines
- Use App Router patterns (not Pages Router)
- Components go in `app/components/`
- Use MUI components with Tailwind for custom styling
- Validate forms with Zod schemas
- Run `npx prisma generate` after schema changes

## Build & Deploy
- Deployed on Vercel
- Prisma migrations run automatically
- Environment variables set in Vercel dashboard
