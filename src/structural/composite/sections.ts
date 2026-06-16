import { BasePageComponent } from "./PageComponent.js";

export class PageSection extends BasePageComponent {
  constructor(
    name: string,
    private content: string
  ) {
    super(name);
  }

  render(indent = 0): string {
    const pad = this.indent(indent);
    return `${pad}<section id="${this.name}">\n${pad}  ${this.content}\n${pad}</section>`;
  }
}

/** Sections from Adria Reserve Index.tsx and related B2C pages */
export class HeaderSection extends PageSection {
  constructor() {
    super("header", "Adria Reserve — navigation, B2C/B2B login links");
  }
}

export class HeroSection extends PageSection {
  constructor() {
    super("hero", "Discover the Adriatic — search hotels, flights, and packages");
  }
}

export class AiTripPlannerSection extends PageSection {
  constructor() {
    super("ai-trip-planner", "AI-assisted itinerary suggestions");
  }
}

export class TopDestinationsSection extends PageSection {
  constructor(destinations: string[]) {
    super("top-destinations", `Featured: ${destinations.join(", ")}`);
  }
}

export class SpecialOffersSection extends PageSection {
  constructor(offerCount: number) {
    super("special-offers", `${offerCount} early-booking and seasonal offers`);
  }
}

export class CityBreaksSection extends PageSection {
  constructor() {
    super("city-breaks", "Weekend city-break packages across the region");
  }
}

export class FlightSearchSection extends PageSection {
  constructor() {
    super("flight-search", "Flight search widget — departures to coastal hubs");
  }
}

export class HowItWorksSection extends PageSection {
  constructor() {
    super("how-it-works", "Search → Compare multi-agency prices → Book → Travel");
  }
}

export class WhyChooseUsSection extends PageSection {
  constructor() {
    super("why-choose-us", "Multi-agency aggregation, Bros Travel + Gassi Holidays");
  }
}

export class B2bB2cSection extends PageSection {
  constructor() {
    super("b2b-b2c", "Partner portal access vs. consumer self-service booking");
  }
}

export class ContactSection extends PageSection {
  constructor() {
    super("contact", "Contact form — support@adriareserve.com");
  }
}

export class NewsletterSection extends PageSection {
  constructor() {
    super("newsletter", "Subscribe for deal alerts and destination guides");
  }
}

export class FooterSection extends PageSection {
  constructor() {
    super("footer", "© Adria Reserve — terms, privacy, social links");
  }
}

/** Booking flow sections (Reservation.tsx / SearchResults.tsx) */
export class PropertySearchSection extends PageSection {
  constructor() {
    super("property-search", "Destination, dates, and traveler picker");
  }
}

export class AggregatedResultsSection extends PageSection {
  constructor(providerCount: number) {
    super(
      "aggregated-results",
      `Hotels ranked by best price across ${providerCount} agency APIs`
    );
  }
}

export class BookingFormSection extends PageSection {
  constructor() {
    super("booking-form", "Guest details, ID, contact — prepare reservation");
  }
}

/** B2B / Admin sections */
export class PartnerDashboardSection extends PageSection {
  constructor(partnerName: string) {
    super("partner-dashboard", `${partnerName} — reservations, payments, reports`);
  }
}

export class AdminStatsSection extends PageSection {
  constructor() {
    super("admin-stats", "Platform statistics, partner oversight, payment reports");
  }
}

export class ClientConciergeSection extends PageSection {
  constructor() {
    super(
      "client-concierge",
      "AI concierge chat — transfers, amendments, confirmation emails"
    );
  }
}
