# PixelPerfect - Full-Stack Blogging and Learning Platform

PixelPerfect is a modern, full-stack web application built with Next.js, TypeScript, and Tailwind CSS. It combines a feature-rich blogging platform with a structured learning track system, designed for both content creators and learners. The platform uses Clerk for robust authentication and Prisma with a PostgreSQL database for data management.

#Link to the website : "https://pixel-perfect-1.vercel.app/"

## ✨ Features

### Blogging Platform
- **Article Management:** Admins can create, and manage articles.
- **User Engagement:** Users can read articles, leave comments, and like their favorite posts.
- **Dashboard:** Personalized user dashboards for managing liked articles and comments.
- **Admin Panel:** A dedicated admin section for managing articles and learning tracks.

### Learning Tracks
- **Structured Learning:** Admins can create learning tracks composed of modules and individual roadmap items (e.g., tutorials, articles, videos).
- **Progress Tracking:** Authenticated users can track their progress through learning paths, marking items as "Not Started," "In Progress," or "Completed."
- **Admin Management:** Admins have full control over creating, editing, and deleting tracks and their content.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Authentication:** [Clerk](https://clerk.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (using Radix UI primitives)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/) running locally or on a cloud service.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pixel-perfect.git
    cd pixel-perfect
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. You will need to create a Clerk application and a PostgreSQL database to get these values.

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    # Database (Prisma)
    DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
    ```

4.  **Run database migrations:**
    This will apply the database schema to your PostgreSQL database.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    The application uses Turbopack for faster development.
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

The project follows the standard Next.js App Router structure.

```
my-app/
├── app/                      # Main application source code
│   ├── (auth)/               # Authentication pages (sign-in, sign-up)
│   ├── actions/              # Server actions for mutations
│   ├── admin/                # Admin dashboard for managing content
│   ├── api/                  # API routes
│   ├── articles/             # Public-facing article pages
│   ├── dashboard/            # User-specific dashboard
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # Reusable UI components
│   ├── landingpage/          # Components specific to the landing page
│   ├── sub/                  # Shared sub-components
│   └── ui/                   # Base UI components (from Shadcn)
├── constants/                # Shared constants
├── lib/                      # Library files (db connection, auth utils)
├── prisma/                   # Prisma schema and migrations
├── public/                   # Static assets (images, icons)
└── ...
```

## 📜 Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
- `npx prisma studio`: Opens a local web UI to view and edit database records.

---

This README provides a comprehensive overview of the PixelPerfect application. Enjoy coding!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
