import type { PaymentProcessor, PaymentResult } from "./PaymentProcessor.js";

export class CreditCardProcessor implements PaymentProcessor {
  getMethod() {
    return "credit_card" as const;
  }

  processReservationPayment(
    amount: number,
    currency: string,
    reservationUid: string
  ): PaymentResult {
    const paymentId = `cc_${Date.now()}`;
    console.log(
      `  [Credit Card] Authorizing ${amount} ${currency} for reservation ${reservationUid}...`
    );
    return {
      success: true,
      paymentId,
      status: "confirmed",
      message: `Deposit of ${amount} ${currency} captured for ${reservationUid}`,
    };
  }
}

export class BankTransferProcessor implements PaymentProcessor {
  getMethod() {
    return "bank_transfer" as const;
  }

  processReservationPayment(
    amount: number,
    currency: string,
    reservationUid: string
  ): PaymentResult {
    const paymentId = `bt_${Date.now()}`;
    console.log(
      `  [Bank Transfer] Awaiting wire confirmation for ${amount} ${currency} (${reservationUid})...`
    );
    return {
      success: true,
      paymentId,
      status: "pending",
      message: `Bank transfer of ${amount} ${currency} initiated — pending confirmation`,
    };
  }
}

export class CashProcessor implements PaymentProcessor {
  getMethod() {
    return "cash" as const;
  }

  processReservationPayment(
    amount: number,
    currency: string,
    reservationUid: string
  ): PaymentResult {
    const paymentId = `cash_${Date.now()}`;
    console.log(
      `  [Cash] Recording agency cash payment of ${amount} ${currency} for ${reservationUid}...`
    );
    return {
      success: true,
      paymentId,
      status: "confirmed",
      message: `Cash payment of ${amount} ${currency} recorded at partner desk`,
    };
  }
}
