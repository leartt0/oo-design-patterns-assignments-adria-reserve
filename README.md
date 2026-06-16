# OO Design & Patterns Assignments — Adria Reserve

Standalone coursework project demonstrating three Gang of Four design patterns — one from each category (Creational, Structural, Behavioral) — using domain concepts from **Adria Reserve**, a full-stack travel booking platform.

Adria Reserve aggregates hotel availability from **Bros Travel** and **Gassi Holidays**, manages reservations in PostgreSQL, and serves a React frontend for B2C consumers and B2B partners. This project models the same business ideas in a console application without touching the production codebase.

## Selected Assignments

| Category    | Pattern        | Adria Reserve mapping                            |
| ----------- | -------------- | ------------------------------------------------ |
| Creational  | Factory Method | Reservation payment processing (Assignment I)    |
| Structural  | Composite      | Frontend page composition from reusable sections |
| Behavioral  | Observer       | Reservation status notifications across systems  |

> **Note on Behavioral:** The Classroom list included five Creational assignments and one Structural (Composite). The assessment rubric requires one pattern from each category, so **Observer** was added — modeling how Adria Reserve reacts when a reservation moves through `pending → confirmed → amended → completed / cancelled`.

## Connection to Adria Reserve

| Pattern area  | Main project reference                                                         |
| ------------- | ------------------------------------------------------------------------------ |
| Payments      | `Payment.ts` — methods: `credit_card`, `bank_transfer`, `cash`                 |
| Reservations  | `Reservation.ts` — status enum, deposit %, guest fields                        |
| Page layout   | `Index.tsx`, `Reservation.tsx`, `PartnerDashboard.tsx`                         |
| Multi-agency  | `ApiAggregator.ts` — Bros Travel + Gassi Holidays                              |
| Notifications | `ClientDashboard.tsx` — confirmation emails, concierge chat                      |

## Design Considerations

### 1. Factory Method — Reservation Payments (Creational)

**Problem:** When a guest books a Santorini property, Adria Reserve must collect deposits using different payment methods. Each method has different processing rules and status outcomes (`confirmed` vs `pending`).

**Solution:**
- `PaymentProcessor` — common interface aligned with the `Payment.method` enum
- `CreditCardProcessor`, `BankTransferProcessor`, `CashProcessor` — concrete products
- `PaymentProcessorCreator` — abstract creator with `collectDeposit()` template method
- `CreditCardProcessorFactory`, `BankTransferProcessorFactory`, `CashProcessorFactory` — concrete factories

**Why Factory Method:** The booking service depends on the abstract creator, not individual processors. Adding a new method (e.g. `partner_credit`) means one new processor + one factory — the deposit collection flow stays unchanged.

### 2. Composite — Page Composition (Structural)

**Problem:** Adria Reserve serves different experiences (consumer homepage, booking flow, partner portal, client dashboard) by combining the same UI building blocks in different orders — exactly how `Index.tsx` composes `<HeroSection />`, `<TopDestinations />`, `<ContactSection />`, etc.

**Solution:**
- `PageComponent` — common interface (`render`, `getName`)
- Leaf sections: `HeroSection`, `AggregatedResultsSection`, `PartnerDashboardSection`, …
- `AdriaReservePage` — composite node holding child sections
- `AdriaReservePageBuilder` — assembles route layouts: `/`, `/reservation`, `/partner`, `/client-dashboard`

**Why Composite:** A single section and a full page share the same interface. The builder composes leaves into pages the same way React composes components into routes.

### 3. Observer — Reservation Lifecycle (Behavioral)

**Problem:** When `Reservation.status` changes, multiple subsystems must react: guest confirmation email, partner API sync, payment deadline scheduling, and admin analytics — without the reservation service knowing each handler's details.

**Solution:**
- `Subject` / `Observer` interfaces
- `ReservationSubject` — broadcasts `reservation.statusChanged`
- `GuestEmailObserver`, `PartnerSyncObserver`, `PaymentDeadlineObserver`, `AdminAnalyticsObserver`

**Why Observer:** New channels (e.g. SMS, Slack alerts) subscribe at runtime. `ReservationSubject` only calls `notify()` — decoupling reservation writes from side effects.

## Project Structure

```
oo-design-patterns-assignments-adria-reserve/
├── src/
│   ├── index.ts                        # Main entry — runs all demos
│   ├── domain/
│   │   └── adria-reserve.ts            # Shared types from Adria Reserve
│   ├── creational/factory-method/      # Payment processors
│   ├── structural/composite/           # Page section composition
│   └── behavioral/observer/            # Reservation notifications
├── package.json
├── tsconfig.json
└── README.md
```

## Requirements

- [Node.js](https://nodejs.org/) 18 or later

## Build and Run

```bash
cd oo-design-patterns-assignments-adria-reserve
npm install
npm start
```

Compiled output:

```bash
npm run build
node dist/index.js
```

## Expected Output

1. **Factory Method** — three payment methods collecting a 30% deposit on reservation `AR-2026-1042` (Santo Maris Oia)
2. **Composite** — four Adria Reserve page layouts rendered as section trees
3. **Observer** — reservation status transitions triggering guest email, partner sync, payment deadlines, and admin analytics

## Language Choice

The course assignments reference C# and a `Main` method. This project uses **TypeScript** to stay consistent with Adria Reserve's stack (`React + Node.js/Express`). The assignment instructions allow alternative languages; `src/index.ts` serves as the equivalent entry point.

## Related Project

This assignment is based on the **Adria Reserve** capstone — a separate repository containing the full React frontend, Express backend, PostgreSQL database, and external API integrations.

**Repository:** https://github.com/leartt0/oo-design-patterns-assignments-adria-reserve

## License

**Live demo:** [demo.adriatours-ks.com](https://demo.adriatours-ks.com)

Licensed to **ADRIA TOURS SHPK**. Developed by **xbranding L.L.C**.

Academic submission based on the Adria Reserve platform — SEEU coursework.
