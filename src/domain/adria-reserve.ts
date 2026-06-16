/** Domain types mirrored from the Adria Reserve travel booking platform. */

export type PaymentMethod = "credit_card" | "bank_transfer" | "cash";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "amended"
  | "cancelled"
  | "completed";

export type PaymentStatus = "pending" | "confirmed" | "failed" | "refunded";

export interface ReservationContext {
  uid: string;
  propertyName: string;
  location: string;
  checkinDate: string;
  checkoutDate: string;
  guestName: string;
  guestEmail: string;
  partnerName: string;
  price: number;
  depositPercent: number;
  status: ReservationStatus;
}

export const SAMPLE_RESERVATION: ReservationContext = {
  uid: "AR-2026-1042",
  propertyName: "Santo Maris Oia Luxury Suites & Spa",
  location: "Oia, Santorini",
  checkinDate: "2026-07-12",
  checkoutDate: "2026-07-18",
  guestName: "Elena Marku",
  guestEmail: "elena.marku@example.com",
  partnerName: "Bros Travel",
  price: 1134.0,
  depositPercent: 30,
  status: "pending",
};
