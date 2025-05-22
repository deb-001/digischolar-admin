# 🛠️ DIGISCHOLAR Admin Portal

The **DIGISCHOLAR Admin Portal** is the administrative dashboard for the DIGISCHOLAR platform built under the PMSSS (Prime Minister’s Special Scholarship Scheme). This portal empowers administrators to manage student applications, review documents, approve eligibility, and maintain real-time insights into the scholarship distribution process.

---

## 🚀 Features

- 🔐 **Admin Authentication** — Secure access with role-based login.
- 📥 **Application Review** — View and verify submitted applications.
- 📑 **Document Validation** — Check eligibility and uploaded proof.
- 📊 **Dashboard Overview** — Visual insights into total applications, approvals, pending cases, etc.
- 🔎 **Search & Filter** — Quickly locate student records.
- 🧾 **Status Management** — Approve or reject applications with comments.
- 🌐 **Responsive UI** — Optimized for both desktop and mobile admin use.

---

## 🧰 Tech Stack

| Frontend            | Backend / Hosting         | Tools / Libraries         |
|---------------------|---------------------------|----------------------------|
| React + TypeScript  | Firebase Firestore         | Tailwind CSS (or CSS Modules) |
| React Router        | Firebase Authentication    | Vite, Prettier, ESLint      |
| Zustand / Redux     | Firebase Storage           | Chart.js / Recharts (for graphs) |

---

## 📁 Project Structure

```
admin/
├── components/        # Shared components like Header, Sidebar, StatusCard
├── pages/             # Routes such as Dashboard, Applications, Login
├── firebase.ts        # Firebase configuration
├── App.tsx            # Routing and Layout
├── main.tsx           # Entry point
└── vite-env.d.ts      # Environment types
```

---

## 🧪 Setup Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/deb-001/digischolar-admin.git
cd digischolar-admin
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Start the development server

```bash
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🔐 Security Notes

- `.env` is excluded via `.gitignore`
- Admin access is protected with Firebase Auth
- Sensitive operations use role-based validation

---

## 🙋‍♂️ Maintainer

- [deb-001](https://github.com/deb-001)

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📌 Acknowledgements

- [React Documentation](https://reactjs.org/)
- [Firebase Docs](https://firebase.google.com/docs)
- [PMSSS - AICTE](https://www.aicte-india.org/bureaus/jk)
