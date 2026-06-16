import type { Observer, Subject } from "./Observer.js";
import type {
  ReservationContext,
  ReservationStatus,
} from "../../domain/adria-reserve.js";

export class ReservationSubject implements Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(event: string, data: Record<string, unknown>): void {
    for (const observer of this.observers) {
      observer.update(event, data);
    }
  }

  updateStatus(
    reservation: ReservationContext,
    newStatus: ReservationStatus
  ): void {
    const previous = reservation.status;
    reservation.status = newStatus;
    this.notify("reservation.statusChanged", {
      uid: reservation.uid,
      propertyName: reservation.propertyName,
      location: reservation.location,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      partnerName: reservation.partnerName,
      price: reservation.price,
      previousStatus: previous,
      newStatus,
    });
  }
}

/** Sends confirmation emails — mirrors ClientDashboard concierge messaging */
export class GuestEmailObserver implements Observer {
  update(event: string, data: Record<string, unknown>): void {
    if (event !== "reservation.statusChanged") return;
    const status = data.newStatus as string;
    if (status === "confirmed" || status === "completed") {
      console.log(
        `  [Guest Email] ${data.guestEmail}: Your stay at ${data.propertyName} (${data.location}) is ${status}.`
      );
    }
    if (status === "cancelled") {
      console.log(
        `  [Guest Email] ${data.guestEmail}: Reservation ${data.uid} has been cancelled.`
      );
    }
  }
}

/** Notifies the travel partner agency (Bros Travel / Gassi Holidays) */
export class PartnerSyncObserver implements Observer {
  update(event: string, data: Record<string, unknown>): void {
    if (event !== "reservation.statusChanged") return;
    console.log(
      `  [Partner Sync] Pushing ${data.newStatus} status for ${data.uid} to ${data.partnerName} API...`
    );
  }
}

/** Tracks deposit and full-payment deadlines from the Reservation model */
export class PaymentDeadlineObserver implements Observer {
  update(event: string, data: Record<string, unknown>): void {
    if (event !== "reservation.statusChanged") return;
    if (data.newStatus === "confirmed") {
      console.log(
        `  [Payment Deadline] Schedule deposit reminder for ${data.uid} (total ${data.price} EUR).`
      );
    }
    if (data.newStatus === "cancelled") {
      console.log(
        `  [Payment Deadline] Release held funds / cancel pending payments for ${data.uid}.`
      );
    }
  }
}

/** Records events for admin statistics and reporting endpoints */
export class AdminAnalyticsObserver implements Observer {
  private events: string[] = [];

  update(event: string, data: Record<string, unknown>): void {
    const entry = `${data.uid}:${data.previousStatus}->${data.newStatus}`;
    this.events.push(entry);
    console.log(`  [Admin Analytics] Logged reservation transition — ${entry}`);
  }

  getRecordedEvents(): string[] {
    return [...this.events];
  }
}
