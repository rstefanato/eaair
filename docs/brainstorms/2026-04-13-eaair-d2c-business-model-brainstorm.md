---
date: 2026-04-13
topic: eaair-d2c-business-model
---

# EA Air — Direct-to-Consumer Business Model

## What We're Building

A **direct-to-consumer sales and delivery operation** for EA Air that bypasses the dentist entirely. The patient discovers the product online, gets qualified through a STOP-Bang quiz, purchases a 12-month treatment plan (R$299/mo), gets a 3D scan at a partner lab, and receives 3 devices at home over the course of treatment — all with centralized clinical review by EA's internal orthodontist team.

## Why D2C (Not B2B2C Like Aligners)

Three fundamental problems with the dentist-mediated model for EA Air:

1. **Dentists are bad salespeople** — first contact with the patient is often poor, killing conversion before it starts
2. **Uncontrolled pricing** — dentists charge whatever they want, making it impossible to communicate consistent value
3. **Unnecessary clinical friction** — unlike aligners, EA Air doesn't require a dentist evaluation, only a 3D scan available at any partner lab

No regulatory barrier exists — EA Air does not require a dentist's prescription, and every device is clinically reviewed by EA's internal orthodontist team regardless.

## The Business Model

### Value Chain

```
AWARENESS           QUALIFICATION         CONVERSION              FULFILLMENT
                                                                  
Ads / SEO    →  eaair.com.br quiz  →  Self-checkout       →  Partner lab (3D scan)
                      |                    OR                     |
                Lead capture    →  AI Chatbot (24/7)       EA clinical review
                      |                    OR                     |
                Risk result     →  Sales team (phone)      Manufacturing
                                                                 |
                                                           Ship to home
                                                           (x3 over 12mo)
```

### Revenue Model

| Component | Detail |
|---|---|
| Product | EA Air mandibular advancement device |
| Treatment duration | 12 months |
| Devices per treatment | 3 (replaced every 4 months) |
| Delivery schedule | Device #1 at month 1, #2 at month 5, #3 at month 9 |
| Price | R$299/month x 12 = R$3,588 total |
| Payment options | Credit card 12x (non-cancellable) OR Pix one-time (discount TBD) |
| Payment processor | Asaas |

### Customer Journey

```
Month 1:   Quiz → Purchase → 3D scan at partner lab → Clinical review → Device #1 arrives
Month 2-4: Treatment with Device #1 (CX team follow-up)
Month 5:   Device #2 arrives (automatic shipment)
Month 6-8: Treatment with Device #2
Month 9:   Device #3 arrives (automatic shipment)
Month 10-12: Treatment with Device #3
Month 12:  Treatment complete
```

### Sales Architecture (3 Tiers)

| Tier | Channel | Role | Availability |
|---|---|---|---|
| Self-service | Website (quiz + checkout) | Educate + convert high-intent patients | 24/7 |
| AI Chatbot | WhatsApp / site widget | Answer questions, handle objections, nudge to close | 24/7 |
| Sales rep | Phone / WhatsApp | Close hesitant leads, complex questions, personal touch | Business hours |

### AI Chatbot — "Dr. EA"

- **AI-powered** conversational assistant with a dentist persona
- **Clearly branded as AI** — patient knows it's an assistant, not a real dentist
- Clinical language and authority tone, backed by EA's real orthodontist team
- Handles: product questions, treatment expectations, pricing clarification, scan logistics
- Escalates to human sales rep when needed

### 3D Scan Network

- EA already has a **vast network of partner scan labs** across Brazil
- Integrated into eaair.com.br with **interactive map + pin points**
- Patient finds nearest lab, walks in, gets scanned, done
- No dentist appointment required — scan only

### Post-Sale Customer Experience

- **Dedicated CX team** (in-house) manages the entire post-sale relationship
- Follow-up after each device delivery
- Handles complaints, adjustments, questions
- Coordinates device #2 and #3 shipments
- Owns NPS, satisfaction, retention

### Dentist Channel (Reformed)

Instead of cutting dentists out entirely, the model **converts them from resellers to affiliates**:

| Before (B2B2C) | After (D2C with affiliate) |
|---|---|
| Dentist buys EA Air wholesale | Dentist refers patient to EA |
| Dentist sets own price (uncontrolled) | **Price capped at R$299/mo** |
| Dentist keeps full margin | **Dentist earns commission (TBD)** |
| Dentist owns the patient relationship | **EA owns the patient relationship** |

This avoids creating adversaries out of the existing 7,000+ dentist network while maintaining price control.

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Sales model | D2C with in-house sales team | Control CX, consistent pricing, better conversion |
| Pricing | R$299/mo x 12 months (R$3,588 total) | Validated with EA, subscription feel (3 devices delivered) |
| Payment | Asaas, credit card 12x non-cancellable or Pix with discount | Eliminates churn risk completely |
| 3D scan | Existing partner lab network with map on site | Already built, no new infrastructure |
| Clinical review | EA's internal orthodontist team | Same team as aligners, zero incremental cost |
| Delivery | 3 devices shipped to home (months 1, 5, 9) | Three touchpoints reinforce treatment relationship |
| Lead handling | 3-tier: self-checkout / AI chatbot / sales rep | Maximize conversion across all intent levels |
| Chatbot | AI-powered, dentist persona, clearly branded as AI | Clinical authority without liability risk |
| CX | Dedicated in-house CX team | EA owns the full patient relationship |
| Dentist role | Commission-based referrers, price-capped | Preserves network goodwill, eliminates pricing chaos |

## What's Different From Aligners

| Dimension | Aligners (B2B2C) | EA Air (D2C) |
|---|---|---|
| Who sells | 7,000 dentists (uncontrolled) | In-house team (controlled) |
| Who sets price | Dentist (variable) | EA (R$299/mo fixed) |
| First contact | Dentist (inconsistent CX) | Sales team or AI chatbot (trained CX) |
| Clinical touchpoint | Dentist office | Partner scan lab (scan only) |
| Delivery | Dentist hands over | Shipped to home |
| Customer relationship | Dentist owns it | EA owns it |
| Revenue model | B2B (sell to dentist) | D2C (sell to patient) |
| Dentist incentive | Margin on resale | Commission on referral |

## Resolved Questions

| Question | Answer | Notes |
|---|---|---|
| Pix discount | **10% off** (R$3,229 one-time vs R$3,588 on card) | Standard Brazilian e-commerce practice |
| Dentist commission | **~15%** of sale (~R$538 per patient) | TBD final number, but this is the target |
| Marketing budget | **R$10k/mo** to start | Lean launch — prove unit economics, then scale |
| Chatbot platform | **Custom build on ChatGPT API** | Claude is better but cost prohibitive at scale |
| Scan lab cost | **Patient pays separately** | Future goal: negotiate free scans with partner labs |
| Device adjustments | **Non-issue historically** | Should have a replacement process just in case |
| Clinical screening | **No rejection** — scan is for manufacturing fit only | Not a clinical evaluation, just mouth mapping |
| Geographic coverage | **Non-issue** — self-selecting filter | Sparse lab coverage = sparse purchasing power |

## Unit Economics (Estimates)

| Metric | Value |
|---|---|
| LTV per patient | R$3,588 (card) or R$3,229 (Pix) |
| Marketing budget (launch) | R$10,000/mo |
| CAC target range | R$150 - R$500 (to be validated) |
| Patients/mo at R$150 CAC | ~66 |
| Patients/mo at R$300 CAC | ~33 |
| Patients/mo at R$500 CAC | ~20 |
| Dentist commission (~15%) | ~R$538 per referred patient |
| Gross margin | TBD (depends on manufacturing cost + scan lab deals) |

## Next Steps

-> `/workflows:plan` to structure formal business plan and site implementation
