# St. Catharines Computers - Modern Website

A complete rebuild of stcatharinescomputers.com using modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material UI (MUI) v6
- **Styling**: Tailwind CSS v3
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Forms**: React Hook Form + Zod
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📋 Features

- 🎨 Modern, responsive design with Material UI + Tailwind
- ⚡ Lightning-fast performance with Next.js 15
- 🔍 SEO optimized with Next.js metadata API
- 📱 Mobile-first responsive design
- 🖼️ Optimized image handling with Next.js Image
- 📝 Content management ready
- 📧 Contact form with email notifications
- 🔒 Secure and scalable architecture

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jtgsystems/stcatharines-computers.git
cd stcatharines-computers
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials and other configurations.

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
stcatharines-computers/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript types
│   └── page.tsx          # Home page
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── scripts/              # Migration and utility scripts
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔄 Migration from WordPress

### Content Export

Run the WordPress export script:
```bash
chmod +x scripts/export-wordpress.sh
./scripts/export-wordpress.sh
```

This will export:
- All posts and pages
- Categories and tags
- Media references
- SEO metadata

### Content Import

After exporting, run the import script:
```bash
npm run migrate:content
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

Vercel will automatically:
- Build your Next.js application
- Set up edge functions for API routes
- Configure CDN for static assets
- Provide SSL certificates

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run migrate      # Run database migrations
```

## 📊 Performance Goals

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Core Web Vitals: All passing

## 🤝 Contributing

This is a private project for St. Catharines Computers.

## 📝 License

Copyright © 2025 JTG Systems. All rights reserved.

## 📞 Contact

For support or inquiries:
- Website: https://www.jtgsystems.com
- Email: info@stcatharinescomputers.com

---

Built with ❤️ by JTG Systems
