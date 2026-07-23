# 🚀 AI-Powered SEO Audit Report — ASEMFY

A static HTML/CSS/JS dashboard for comprehensive AI-powered SEO auditing. No build tools or npm install required.

---

## How to Run Locally

### Option 1 — Python HTTP Server (Recommended)

Open your terminal and run:

```bash
cd /Users/seo
python3 -m http.server 8080
```

Then open your browser and go to:

```
http://localhost:8080
```

> ⚠️ Note: The correct module name is `http.server` — not `http.serve`.

---

### Option 2 — VSCode Live Server

1. Install the **Live Server** extension in VSCode
2. Open `index.html`
3. Click **"Go Live"** in the bottom status bar
4. The browser will open automatically

---

### Option 3 — npx serve (requires Node.js)

```bash
cd /Users/seo
npx -y serve .
```

Then open: `http://localhost:3000`

---

## Project Structure

```
seo/
├── index.html              ← Main entry point
├── css/
│   └── style.css           ← All styles
├── src/
│   └── controllers/
│       └── ChartController.js
└── assets/                 ← Images and static files
```

---

## Quick Start (Copy & Paste)

```bash
cd /Users/seo && python3 -m http.server 8080
```

Open your browser at → **http://localhost:8080**
