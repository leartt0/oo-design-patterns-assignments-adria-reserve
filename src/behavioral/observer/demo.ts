import {
  AdminAnalyticsObserver,
  GuestEmailObserver,
  PartnerSyncObserver,
  PaymentDeadlineObserver,
  ReservationSubject,
} from "./ReservationNotificationSystem.js";
import {
  SAMPLE_RESERVATION,
  type ReservationContext,
} from "../../domain/adria-reserve.js";

export function runObserverDemo(): void {
  console.log(
    "=== Observer — Adria Reserve Reservation Lifecycle ===\n"
  );

  const subject = new ReservationSubject();
  subject.attach(new GuestEmailObserver());
  subject.attach(new PartnerSyncObserver());
  subject.attach(new PaymentDeadlineObserver());
  const analytics = new AdminAnalyticsObserver();
  subject.attach(analytics);

  const reservation: ReservationContext = { ...SAMPLE_RESERVATION };

  console.log(
    `Booking ${reservation.uid}: ${reservation.propertyName} via ${reservation.partnerName}\n`
  );

  subject.updateStatus(reservation, "confirmed");
  subject.updateStatus(reservation, "amended");
  subject.updateStatus(reservation, "completed");

  console.log("\nCancelling a second reservation:\n");

  const cancelled: ReservationContext = {
    uid: "AR-2026-1043",
    propertyName: "Canaves Oia Suites",
    location: "Oia, Santorini",
    checkinDate: "2026-08-01",
    checkoutDate: "2026-08-05",
    guestName: "Jon Berisha",
    guestEmail: "jon.berisha@example.com",
    partnerName: "Gassi Holidays",
    price: 916.0,
    depositPercent: 30,
    status: "pending",
  };

  subject.updateStatus(cancelled, "cancelled");

  console.log(
    `\nAdmin dashboard recorded ${analytics.getRecordedEvents().length} status transitions.`
  );
}
