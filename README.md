# StartupForge — Client

StartupForge is a platform that connects **founders** looking for collaborators with **skilled individuals** eager to join early-stage startups. Founders can list opportunities, manage applications, and grow their team, while collaborators can browse and apply to startups that match their interests.

**Live Link:** [https://startupforge-client-mauve.vercel.app/](https://startupforge-client-mauve.vercel.app/)

![StartupForge Banner](./startupforge.png)

---

## ✨ Features

- 🔐 **Authentication** — Email/password and Google login via Better Auth (JWT-based sessions)
- 🧑‍💼 **Role-based Dashboard** — Dedicated dashboard views and permissions for Founder, Collaborator, and Admin roles
- 🚀 **Startup Profiles** — Founders can create, edit, and manage their startup profile
- 📋 **Opportunity Management** — Post, edit, and delete collaboration opportunities
- 📨 **Applications** — Collaborators can apply to opportunities and track application status
- 🛠️ **Admin Panel** — Manage users, approve/reject startups, and monitor transactions
- 💳 **Payment System** — Integrated payment gateway to upgrade from Free to Premium plan
- 👑 **Premium Plans** — Unlock unlimited opportunity postings and priority features after upgrading
- 🌗 **Dark / Light Mode** — Full theme support across the app
- 📱 **Responsive UI** — Optimized for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Category         | Technology                                      |
| ----------------- | ------------------------------------------------ |
| Framework         | [Next.js](https://nextjs.org/)                   |
| UI Library        | [HeroUI](https://www.heroui.com/)                |
| Styling           | [Tailwind CSS](https://tailwindcss.com/)         |
| Icons             | [Gravity UI Icons](https://gravity-ui.com/icons) |
| Authentication    | [Better Auth](https://www.better-auth.com/)      |
| Notifications     | React Toastify                                   |

---

## 📂 Project Structure

```
startupforge-client/
├── app/
│   ├── dashboard/
│   │   ├── founder/
│   │   ├── collaborator/
│   │   └── admin/
│   └── (public routes)
├── components/
│   ├── layout/        # Sidebar, Navbar, etc.
│   └── home/           # Landing page components
├── lib/
│   └── auth-client.js  # Better Auth client setup
└── public/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [StartupForge server](#) (Express + MongoDB)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/rupa3670/startupforge-client.git
   cd startupforge-client
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the required environment variables (see below).

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file with the following:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
BETTER_AUTH_URL=your_better_auth_url
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URL=your_mongodb_connection_string

# Payment gateway
PAYMENT_GATEWAY_API_KEY=your_payment_gateway_key
```

> ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

---

## 👥 User Roles

| Role              | Capabilities                                                       |
| ------------------ | -------------------------------------------------------------------|
| **Founder**        | Create startup profile, post opportunities, manage applications    |
| **Collaborator**   | Browse opportunities, apply, track application status              |
| **Admin**          | Manage users, approve/reject startups, view transactions           |

---

## 📸 Screenshots

<!-- Add screenshots of your project here -->
<!--
| Landing Page | Founder Dashboard |
|:---:|:---:|
| ![Landing](./public/screenshots/landing.png) | ![Dashboard](./public/screenshots/dashboard.png) |
-->

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/rupa3670/startupforge-client/issues).

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions or feedback, please open an issue on the [GitHub repository](https://github.com/rupa3670/startupforge-client).