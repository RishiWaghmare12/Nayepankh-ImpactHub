# NayePankh ImpactHub 🕊️

> A full-stack NGO management platform built with React, Vite, Firebase, and modern UI tooling.

![NayePankh ImpactHub](https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format)

## ✨ Features

### Public Pages
- **Home** — Hero, animated impact counters, featured campaigns, testimonials, gallery, CTA
- **About** — Foundation history, vision, mission, core values (timeline design)
- **Campaigns** — Search + filter, progress bars, donation integration
- **Events** — Registration system, calendar view, event categories
- **Volunteer** — Application form, leaderboard, resume upload
- **Donate** — Tiered donation amounts, impact messaging, receipt generation

### Authentication (Firebase)
- Email/password login + registration
- Google OAuth sign-in
- Forgot password flow
- Role-based access (volunteer / donor / admin)

### User Dashboard
- Overview with animated stats + Chart.js charts
- Profile management
- Event registrations tracker
- Donation history with receipt download
- Volunteer activities + leaderboard
- Certificate download system
- Achievement badges

### Admin Panel
- Full analytics with 4 chart types (Line, Bar, Doughnut, Radar)
- Campaign CRUD management
- Event CRUD management
- Volunteer application approval/rejection
- Platform settings

### AI Chat Assistant
- Powered by **Google Gemini API**
- Answers NGO queries: campaigns, volunteering, events, donations
- Demo mode with fallback responses (works without API key)
- Floating button with animated UI

### Advanced Features
- 🌙 Dark / Light mode toggle
- 🔔 Notification system
- 📱 Fully responsive (mobile-first)
- ⚡ PWA-ready (manifest.json)
- 🦴 Loading skeleton components
- 🍞 Toast notification system
- 🏆 Impact tracker
- 🥇 Volunteer leaderboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Charts | Chart.js + react-chartjs-2 |
| AI | Google Gemini API |
| Icons | Lucide React |
| Notifications | react-hot-toast |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/nayepankh-impacthub.git
cd nayepankh-impacthub
npm install
```

### 2. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password + Google)
4. Enable **Firestore Database**
5. Copy your config keys

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Get Gemini API Key (Optional)
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Add to `.env` as `VITE_GEMINI_API_KEY`
> Without a Gemini key, the chatbot uses intelligent demo responses.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔥 Firebase Setup

### Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /campaigns/{id} {
      allow read: if true;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /events/{id} {
      allow read: if true;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /donations/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Create Admin User
After registering, update the user document in Firestore:
```
users/{uid} → role: "admin"
```

---

## 📦 Build & Deploy

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```
Set environment variables in Vercel dashboard.

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify dashboard
# Or: netlify deploy --dir dist --prod
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── ui/             # CampaignCard, EventCard, StatCard, Skeletons
│   ├── AIChatbot.jsx   # Gemini-powered chatbot
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── NotificationContext.jsx
├── data/
│   └── sampleData.js   # Mock data for demo
├── firebase/
│   └── config.js
├── hooks/
│   ├── useCounter.js
│   └── useFirestore.js
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Campaigns.jsx
│   ├── Events.jsx
│   ├── Volunteer.jsx
│   ├── Donate.jsx
│   ├── auth/           # Login, Register, ForgotPassword
│   ├── dashboard/      # User dashboard pages
│   └── admin/          # Admin panel pages
└── App.jsx
```

---

## 🎯 Demo Roles

| Role | Email | Password |
|---|---|---|
| Admin | admin@nayepankh.org | Admin@123 |
| Volunteer | volunteer@demo.com | Demo@123 |
| Donor | donor@demo.com | Demo@123 |

> Create these accounts in Firebase Auth + set `role` in Firestore to use them.

---

## 📸 Screenshots Guide

1. **Home Page** — Dark/light hero, animated counters, campaign cards
2. **Campaigns** — Filter/search in action
3. **Volunteer** — Application form + leaderboard
4. **Donate** — Tier selector + impact message
5. **User Dashboard** — Stats + chart + badges
6. **Admin Dashboard** — Charts, campaign management
7. **AI Chatbot** — Open chatbot, ask a question

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — free to use for any purpose including commercial projects.

---

Built with ❤️ for NayePankh Foundation — *giving new wings to those who deserve to fly.*
