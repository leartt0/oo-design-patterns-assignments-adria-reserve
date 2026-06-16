import type { PaymentMethod, PaymentStatus } from "../../domain/adria-reserve.js";

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  status: PaymentStatus;
  message: string;
}

export interface PaymentProcessor {
  processReservationPayment(
    amount: number,
    currency: string,
    reservationUid: string
  ): PaymentResult;
  getMethod(): PaymentMethod;
}
