import { AdriaReservePageBuilder } from "./AdriaReservePage.js";

export function runCompositeDemo(): void {
  console.log(
    "=== Composite — Adria Reserve Page Composition ===\n"
  );

  const pages = [
    AdriaReservePageBuilder.consumerHomepage(),
    AdriaReservePageBuilder.bookingFlow(),
    AdriaReservePageBuilder.partnerPortal(),
    AdriaReservePageBuilder.clientDashboard(),
  ];

  for (const page of pages) {
    console.log(`Route: ${page.getName()}`);
    console.log(page.render());
    console.log();
  }
}
