import type { PageComponent } from "./PageComponent.js";
import { BasePageComponent } from "./PageComponent.js";
import {
  AdminStatsSection,
  AggregatedResultsSection,
  AiTripPlannerSection,
  B2bB2cSection,
  BookingFormSection,
  CityBreaksSection,
  ClientConciergeSection,
  ContactSection,
  FlightSearchSection,
  FooterSection,
  HeaderSection,
  HeroSection,
  HowItWorksSection,
  NewsletterSection,
  PartnerDashboardSection,
  PropertySearchSection,
  SpecialOffersSection,
  TopDestinationsSection,
  WhyChooseUsSection,
} from "./sections.js";

export class AdriaReservePage extends BasePageComponent {
  private children: PageComponent[] = [];

  constructor(name: string) {
    super(name);
  }

  add(component: PageComponent): void {
    this.children.push(component);
  }

  remove(component: PageComponent): void {
    this.children = this.children.filter((c) => c !== component);
  }

  render(indent = 0): string {
    const pad = this.indent(indent);
    const header = `${pad}<page route="${this.name}">`;
    const body = this.children.map((c) => c.render(indent + 1)).join("\n");
    const footer = `${pad}</page>`;
    return [header, body, footer].join("\n");
  }
}

/**
 * Builds Adria Reserve page layouts by composing reusable UI sections,
 * mirroring how the React frontend assembles routes from shared components.
 */
export class AdriaReservePageBuilder {
  /** Mirrors src/pages/Index.tsx */
  static consumerHomepage(): AdriaReservePage {
    const page = new AdriaReservePage("/");
    page.add(new HeaderSection());
    page.add(new HeroSection());
    page.add(new AiTripPlannerSection());
    page.add(
      new TopDestinationsSection([
        "Santorini",
        "Dubrovnik",
        "Kotor",
        "Corfu",
      ])
    );
    page.add(new SpecialOffersSection(6));
    page.add(new CityBreaksSection());
    page.add(new FlightSearchSection());
    page.add(new HowItWorksSection());
    page.add(new WhyChooseUsSection());
    page.add(new B2bB2cSection());
    page.add(new ContactSection());
    page.add(new NewsletterSection());
    page.add(new FooterSection());
    return page;
  }

  /** Mirrors the search → book flow on Reservation / SearchResults pages */
  static bookingFlow(): AdriaReservePage {
    const page = new AdriaReservePage("/reservation");
    page.add(new HeaderSection());
    page.add(new PropertySearchSection());
    page.add(new AggregatedResultsSection(2));
    page.add(new BookingFormSection());
    page.add(new HowItWorksSection());
    page.add(new FooterSection());
    return page;
  }

  /** Mirrors B2B partner + admin surfaces */
  static partnerPortal(): AdriaReservePage {
    const page = new AdriaReservePage("/partner");
    page.add(new HeaderSection());
    page.add(new PartnerDashboardSection("Bros Travel"));
    page.add(new AdminStatsSection());
    page.add(new FooterSection());
    return page;
  }

  /** Mirrors ClientDashboard concierge experience */
  static clientDashboard(): AdriaReservePage {
    const page = new AdriaReservePage("/client-dashboard");
    page.add(new HeaderSection());
    page.add(new ClientConciergeSection());
    page.add(new SpecialOffersSection(3));
    page.add(new ContactSection());
    page.add(new FooterSection());
    return page;
  }
}
