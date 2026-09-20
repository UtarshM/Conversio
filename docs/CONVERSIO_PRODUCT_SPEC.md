# Conversio by Scalezix — Full Product Specification & Architecture Document

## 1. Product Vision & Positioning

- **Product**: Conversio by Scalezix
- **Category**: AI Revenue & Customer Automation Platform for D2C Brands
- **Core Promise**: Convert more customers. Recover lost revenue. Increase repeat purchases. Automate the customer journey.
- **Customer Journey Lifecycle**:
  $$\text{Acquire} \longrightarrow \text{Engage} \longrightarrow \text{Convert} \longrightarrow \text{Recover} \longrightarrow \text{Deliver} \longrightarrow \text{Retain} \longrightarrow \text{Repeat}$$

### The Problem Conversio Solves
A typical D2C brand manages an uncoordinated software maze:
`Shopify + WhatsApp / AiSensy + Email platform + CRM + Customer support + Calling + Razorpay + Shiprocket + Meta Ads + Google Analytics`

**Result**:
- Customer data is scattered across tools
- Communication is disconnected
- Orders and cart intent lack single-profile attribution
- Customer purchase intent is lost in silos
- Revenue attribution is opaque and inflated

Conversio unifies data, communication, orders, intent, and revenue attribution into an autonomous AI operating system.

---

## 2. Five-Layer Core Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       AI AGENT LAYER                        │
│   Sales Agent • Support Agent • COD Agent • Retention Agent │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      AUTOMATION LAYER                       │
│    Event-Driven Workflows • Visual Cadences • AI Routing    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    CUSTOMER INTELLIGENCE                    │
│    Customer 360 • RTO Risk Scoring • Reorder Predictions    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                     DATA & EVENT ENGINE                     │
│    Cart Abandonment • Orders • Checkouts • Timeline Logs    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                     INTEGRATIONS LAYER                      │
│     Shopify • WhatsApp Cloud API • Email • Razorpay •       │
│                Shiprocket • AI Voice Telephony              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Ten Core Modules

### Module 1 — Revenue-First Dashboard
Focuses strictly on business and revenue outcomes rather than vanity operational numbers:
- **Revenue Metrics**:
  - Total Revenue: ₹82.4L
  - Conversio Attributed: ₹18.7L
  - Recovered Revenue: ₹6.4L
  - Repeat Purchase Revenue: ₹8.2L
  - COD Losses Saved: ₹2.1L
  - Campaign Revenue: ₹2.0L
- **Customer Metrics**:
  - Total Customers: 48,291
  - New: 4,281 | Returning: 8,912 | VIP: 1,240 | At Risk: 5,821
- **Signature Differentiator — AI Revenue Opportunities**:
  - ₹2.4L Cart Recovery (1,284 customers) `[Activate]`
  - ₹2.1L Reorder Opportunity (842 customers) `[Activate]`
  - ₹1.6L Win-back (1,820 customers) `[Activate]`
  - ₹1.4L Cross-sell (920 customers) `[Activate]`
  - ₹1.2L VIP Upsell (284 customers) `[Activate]`
  - **`[Activate All Opportunities]`**: 1-click batch workflow deployment.

### Module 2 — Customer 360 (The Heart of Conversio)
Single unified profile for every shopper:
- Customer Score: 82/100
- LTV: ₹14,820 | AOV: ₹2,964 | Total Orders: 5 | Last Order: 12 Sept
- Next Purchase Prediction: 8–14 days
- Churn Risk: Low | COD Risk: Low
- **Profile Tabs**: Overview, Orders, Products, Conversations, Campaigns, Calls, Activities, AI Insights.
- **Unified Event Timeline**:
  - 12 Sept: Order ₹2,499 (#SC-1829)
  - 10 Sept: WhatsApp template clicked ("Festive Serum Offer")
  - 08 Sept: Product viewed ("Hydrating Face Cream")
  - 04 Sept: Email opened ("VIP Skincare Guide")
  - 28 Aug: Cart created (₹3,200)
  - 27 Aug: WhatsApp customer support conversation
  - 20 Aug: Order delivered (#SC-1644)

### Module 3 — Commerce & RTO Intelligence
- **Order Pipeline**: Pending &rarr; Confirmed &rarr; Paid &rarr; Processing &rarr; Shipped &rarr; Delivered &rarr; Cancelled &rarr; Returned &rarr; RTO.
- **Cart Abandonment Engine**: Tracks Cart created &rarr; Checkout started &rarr; Payment initiated &rarr; Abandoned &rarr; Recovered.
- **COD & RTO Shield**:
  - Total COD Orders: 1,248 | Verified: 1,102 | Unverified: 146 | Potential RTO: 78 | Recovered Revenue: ₹4.8L.
  - **RTO Risk Score Calculation**: Customer history + previous RTO + address quality + order value + COD frequency + delivery history + engagement.
  - Output Breakdown: LOW (72%), MEDIUM (18%), HIGH (10%).
  - **High-Risk Verification Cascade**:
    $$\text{COD Order} \longrightarrow \text{WhatsApp Ping} \xrightarrow{\text{No reply}} \text{AI Voice Call} \xrightarrow{\text{Confirmed}} \text{Dispatch}$$

### Module 4 — Unified Omnichannel Inbox & Multi-Lingual AI
- Channels: WhatsApp, Email, Voice, Website Chat.
- **Intent Classification Engine**:
  - Purchase intent, Product questions, Order status, Return/Exchange, Refund, Complaint, COD confirmation, Price enquiry, Recommendations.
- **Indian Multi-Lingual Intelligence**:
  - Example: *"Bhai aa product kyare malse?"*
  - Extracted: Language: Gujarati, Intent: Delivery enquiry, Order: #SC-1829, Action: Fetch Shiprocket tracking and send structured WhatsApp update.
  - Initial Languages: English, Hindi, Gujarati.
  - Roadmap: Marathi, Tamil, Telugu, Bengali, Kannada, Malayalam, Punjabi.

### Module 5 — Campaigns & Sequences
- **Customer Campaigns**: New customer, Repeat purchase, VIP, Win-back, Cross-sell, Upsell, Reorder, Birthday, Anniversary.
- **Commerce Campaigns**: Abandoned cart, COD verification, Payment failure, Delivery updates, Review requests, Return recovery.
- **Visual Builder**: Trigger &rarr; Audience Segment &rarr; Channel &rarr; Delay &rarr; Condition Check (Purchased? Yes/No) &rarr; Fallback Channel.

### Module 6 — Event-Driven Automation Engine
Core taxonomy of 20+ real-time events:
`customer.created`, `customer.updated`, `product.viewed`, `cart.created`, `cart.abandoned`, `cart.recovered`, `checkout.started`, `checkout.failed`, `order.created`, `order.paid`, `order.cancelled`, `order.shipped`, `order.delivered`, `order.returned`, `order.rto`, `message.sent`, `message.delivered`, `message.read`, `message.replied`, `call.started`, `call.completed`, `customer.reordered`, `customer.churn_risk_changed`.

### Module 7 — Autonomous AI Action Agents
Agents are equipped with executable tools:
- **Sales Agent**: Answers product questions and converts shoppers.
- **Support Agent**: Handles order tracking, return queries, and complaints.
- **COD Agent**: Verifies high-risk orders and collects prepayments.
- **Retention & Reorder Agent**: Nurtures past buyers based on consumption cycles.
- **Voice Agent**: Conducts autonomous multi-lingual calls.
- **Agent Executable Tools**:
  `search_products`, `check_inventory`, `lookup_order`, `generate_coupon`, `create_cart`, `generate_payment_link`, `book_appointment`, `escalate_to_human`.

### Module 8 — Revenue Intelligence & Attribution
- **Attribution Tiers**:
  - **Direct Revenue**: Customer clicked message/link &rarr; purchased within 24 hours.
  - **Assisted Revenue**: Customer engaged with Conversio touchpoint &rarr; purchased within 7 days.
  - **Organic Revenue**: Zero Conversio touchpoint in purchase window.
- Eliminates vanity attribution.

### Module 9 — Analytics & Founder Executive Decisioning
Answers the ultimate founder question: **"What should I do next?"**
- AI Action Cards:
  - *1,240 customers are likely to reorder within 14 days.*
  - *842 customers have high win-back probability before 60-day churn threshold.*
  - *182 high-value COD orders require immediate voice verification.*

### Module 10 — Ecosystem & Integrations
- Phase 1: Shopify, WooCommerce, Razorpay, WhatsApp Cloud API, Email, AI Voice, Shiprocket, Google Analytics, Meta Ads.
- Phase 2: Amazon, Flipkart, Unicommerce, Zoho, Tally, Cashfree, Delhivery, Bluedart.
- Phase 3: Conversio Public REST API & Webhook Dispatcher.

---

## 4. Transparent D2C Pricing Structure

- **Starter**: ₹4,999/month (Emerging D2C brands, up to 5,000 customers)
- **Growth**: ₹9,999/month (Scaling D2C brands, up to 25,000 customers, full AI scoring)
- **Scale**: ₹24,999/month (High volume brands, unlimited workflows, advanced attribution)
- **Enterprise**: Custom (₹50,000+/month)
- **Usage Transparency**: Meta WhatsApp conversation fees and AI voice minutes are billed at-cost with zero hidden markups.
