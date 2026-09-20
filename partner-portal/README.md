# Conversio Partner & White-Label Portal (AiSensy Model)

Dedicated, standalone Partner & White-Label Platform for **Affiliates**, **Agency Resellers**, and **White-Label SaaS Providers**.

---

## 🌟 Key Architecture & Features

### 1. **Affiliate Partner System**
- **Unique Referral Links & Codes**: Automatic multi-tier referral tracking (`https://conversio.ai/signup?ref=SCALEZIX25`).
- **Recurring Revenue Share**: 20% to 35% automated commission on every client top-up and subscription renewal.
- **Interactive Earnings Calculator**: Dynamic slider calculator estimating monthly and annual passive earnings based on store counts and pricing tiers.
- **Payout Management**: Direct payout request center with UPI ID and Bank Transfer (NEFT/IMPS) processing.

### 2. **White-Label & Custom Domain Management**
- **Custom Domain Mapping**: Point `chat.youragency.com` with CNAME to `app.conversio.ai`.
- **Live DNS & SSL Verification**: Real-time validation of DNS records and automated SSL provisioning.
- **Brand Customization**: Custom Brand Name, Logo, Favicon, Primary Theme Color, Support Email/Phone, and Legal Terms/Privacy URLs.
- **Reseller WhatsApp Pricing Markup**: Resellers can set custom per-message margins (e.g., `+₹0.15/message`) added to Meta conversation rates for automated client billing.
- **Live Preview Sandbox**: Real-time visual mockup of the client's branded login and dashboard experience.

### 3. **Agency Multi-Tenant Workspace Provisioning**
- **Sub-Workspace Provisioning**: Provision dedicated, sandboxed client workspaces directly from the partner console.
- **Meta Tech Provider Integration**: Shared master WABA infrastructure with dynamic phone routing, allowing clients to onboard with Meta Embedded Signup without their own Tech Provider account.
- **Central Wallet Pool**: Credit and allocate messaging balances to client sub-workspaces in 1-click.

---

## 🚀 Directory Structure

```
conversio-partner-portal/
├── src/
│   ├── components/
│   │   ├── EarningsCalculator.tsx   # Interactive affiliate calculator slider
│   │   └── PartnerNavbar.tsx        # Top header with tier & wallet stats
│   ├── context/
│   │   └── PartnerAuthContext.tsx   # Partner session & profile state
│   ├── pages/
│   │   ├── PartnerLandingPage.tsx   # AiSensy-style Partner Sales & Application Page
│   │   ├── PartnerDashboardPage.tsx # Core Affiliate & Reseller Dashboard
│   │   ├── WhiteLabelConsolePage.tsx# Custom domain, branding & conversation markup
│   │   ├── ClientWorkspacesPage.tsx # Multi-tenant sub-account provisioning
│   │   └── CommissionsLedgerPage.tsx# Transparent transaction-by-transaction ledger
│   ├── services/
│   │   └── partnerApi.ts            # Standalone API client with local mock fallback
│   ├── types/
│   │   └── partner.types.ts         # TypeScript data models
│   ├── App.tsx                      # Routing & navigation
│   ├── main.tsx                     # Entrypoint
│   └── index.css                    # Tailwind CSS styles
├── server/
│   └── partnerServer.ts             # Standalone Express API backend (Port 3002)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ How to Run

### Run the Partner Frontend:
```bash
cd conversio-partner-portal
npm install
npm run dev
# Starts frontend on http://localhost:5175
```

### Run the Standalone Partner API Server (Optional):
```bash
cd conversio-partner-portal
npm run server
# Starts backend on http://localhost:3002
```
