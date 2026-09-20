# Conversio - Monorepo (WhatsApp CRM & Automation Platform)

Welcome to the **Conversio** monorepo repository. This workspace contains all the core services for the multi-tenant, multi-industry WhatsApp CRM platform.

---

## 📁 Repository Structure

```
conversio/
├── frontend/          # React + Vite + Tailwind + shadcn UI (Deploy to Vercel)
├── backend/           # Node.js + Express + Prisma ORM + Redis + Bull Queues (Deploy to AWS ECS/App Runner/EC2)
├── partner-portal/    # Partner & Reseller Portal (Deploy to Vercel)
└── package.json       # Monorepo workspace configuration
```

---

## 🚀 Deployment Targets

- **Frontend (`/frontend`)**: Deploys to **Vercel** as a high-speed Single Page Application (SPA).
- **Backend (`/backend`)**: Deploys to **AWS** (ECS, App Runner, or EC2) alongside **Amazon ElastiCache (Redis)** and **Amazon RDS (PostgreSQL)** to handle high-volume WhatsApp Meta Graph API messaging and real-time webhooks.
- **Partner Portal (`/partner-portal`)**: Deploys to **Vercel** as an isolated partner administration portal.

---

## 💻 Local Development

Run services using the root npm workspace commands:

```bash
# Run Frontend (Vite on http://localhost:5173)
npm run dev:frontend

# Run Backend (Express API on http://localhost:4000)
npm run dev:backend

# Run Partner Portal (Vite on http://localhost:5175)
npm run dev:partner
```

---

## 🛠 Features & Capabilities

- **Meta Embedded Signup & OAuth**: Connect WhatsApp Business Accounts (WABA) seamlessly.
- **WhatsApp Cloud API Integration**: Real-time message send/receive with automated status tracking.
- **Webhook Security**: HMAC-SHA256 signature verification for Meta Graph API webhooks.
- **Campaigns & Automations**: Visual Workflow Builder powered by `reactflow` & Redis background queues.
- **Multi-Tenant SaaS Data Model**: Workspace isolation, contact consent management, and industry presets.
