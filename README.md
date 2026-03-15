# 🍽️ Foodela — Food Delivery App

A modern food delivery web app built with **React**, **Vite**, and **Tailwind CSS**, featuring restaurant browsing, cart management, checkout, order tracking, and user profiles.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ⚙️ GitHub Actions: Create Gist Workflow

The workflow at `.github/workflows/create-gist.yml` automatically publishes key repository configuration files as a **public GitHub Gist** whenever code is pushed to the `main` branch (or triggered manually).

### Required Secret: `GIST_TOKEN`

The workflow needs a **Personal Access Token (PAT)** with the `gist` scope, stored as a repository secret named `GIST_TOKEN`.

Follow the steps below to create one.

---

### Step 1 — Create a Personal Access Token (PAT)

1. Sign in to [github.com](https://github.com).
2. Click your **profile picture** (top-right) → **Settings**.
3. Scroll down to the bottom of the left sidebar and click **Developer settings**.
4. Click **Personal access tokens** → **Tokens (classic)**.
5. Click **Generate new token** → **Generate new token (classic)**.
6. Fill in the form:
   - **Note** – give it a memorable name, e.g. `Foodela Gist Token`.
   - **Expiration** – choose an expiry that suits you (e.g. 90 days or No expiration).
   - **Select scopes** – tick the **`gist`** checkbox.
7. Click **Generate token** at the bottom of the page.
8. **Copy the token immediately** — GitHub only shows it once. Store it somewhere safe (e.g. a password manager).

> ⚠️ Keep your PAT private. Anyone with this token can create and manage Gists on your behalf.

---

### Step 2 — Add the Token as a Repository Secret

1. Go to your **Foodela** repository on GitHub.
2. Click the **Settings** tab (near the top of the repo page).
3. In the left sidebar, click **Secrets and variables** → **Actions**.
4. Click **New repository secret**.
5. Fill in:
   - **Name** – `GIST_TOKEN`
   - **Secret** – paste the PAT you copied in Step 1.
6. Click **Add secret**.

The secret is now stored securely and is available to the workflow as `${{ secrets.GIST_TOKEN }}`.

---

### Step 3 — Run the Workflow

The workflow runs automatically on every push to `main`. You can also trigger it manually:

1. Go to the **Actions** tab in your repository.
2. Click **Create GitHub Gist** in the left sidebar.
3. Click **Run workflow** → **Run workflow**.

On success the workflow prints the Gist URL in the job log:

```
Gist created successfully: https://gist.github.com/<your-username>/<gist-id>
```

---

## 🗂️ Project Structure

```
Foodela/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers (Auth, Cart, Order)
│   ├── data/           # Static mock data
│   ├── pages/          # Page components (Home, Restaurants, Cart, …)
│   └── services/       # API service helpers
├── app/                # Spring Boot backend
├── .github/
│   └── workflows/
│       └── create-gist.yml  # Gist creation workflow
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite 5, Tailwind CSS 3    |
| Animation  | Framer Motion                       |
| Routing    | React Router v6                     |
| HTTP       | Axios                               |
| WebSocket  | STOMP.js + SockJS                   |
| Backend    | Spring Boot (Java)                  |
| CI/CD      | GitHub Actions                      |
