# Future Letter Vault

A web application for writing letters to your future self. Create a letter, choose when it should become available, and come back when the time is right.

**Live Demo:** https://futurelettervault.vercel.app/

**Powered by Codyza**

---

## About the Project

Future Letter Vault allows users to write personal messages and store them until a selected future date. Each letter remains locked until its scheduled unlock time, giving users a way to reflect on their thoughts, goals, and experiences in the future.

The project was built using Next.js, TypeScript, and Supabase, with a focus on authentication, secure data access, and a simple user experience.

## Features

- **User Authentication:** Sign up, log in, and manage an authenticated session.
- **Create Future Letters:** Write a letter with a title, message, and future unlock date.
- **Scheduled Unlocking:** Letters remain locked until their selected date and time.
- **Countdown Timer:** View the time remaining until a letter becomes available.
- **Letter Timeline:** View created letters in chronological order.
- **Read Unlocked Letters:** Open and read letters once their unlock time has passed.
- **Delete Letters:** Remove letters from your collection.
- **Responsive Interface:** Designed for a clean experience across different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive UI |
| Supabase | Database and authentication |
| PostgreSQL | Relational data storage |
| Vercel | Deployment and hosting |
| Lucide React | Icons |

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- A Supabase account

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd future-letter-vault
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

You can find these values in your Supabase project under:

**Project Settings → API**

Do not commit `.env.local` or expose secret or service-role keys.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

The application uses Supabase PostgreSQL with two main tables.

### `letters`

Stores letter information, including:

- Letter ID
- User ID
- Title
- Unlock date and time
- Creation date

### `letter_contents`

Stores the actual content of each letter separately from its metadata.

This separation allows the application to restrict access to letter content until the scheduled unlock time.

## Security

Future Letter Vault uses Supabase Row Level Security (RLS) to protect user data.

- Users can access only their own letters.
- Letter content is restricted until the associated unlock time.
- Users must be authenticated to create or delete letters.
- Database policies enforce access restrictions independently of the frontend.

The application uses server-side Supabase clients for protected operations and session handling.

## Deployment

The application is deployed on Vercel.

To deploy your own instance:

1. Fork or clone the repository.
2. Import the repository into Vercel.
3. Add the required Supabase environment variables.
4. Deploy the application.

Vercel automatically builds and deploys the application when changes are pushed to the connected repository.

## Project Structure

```text
future-letter-vault/
├── app/
│   ├── auth/
│   ├── components/
│   ├── create-letter/
│   ├── dashboard/
│   ├── letters/
│   ├── login/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── proxy.ts
├── public/
├── proxy.ts
├── .env.local
├── package.json
└── README.md
```

## Author

Developed by **Yousif Alansari**

Powered by **Codyza**
