import type { PaymentProcessor } from "./PaymentProcessor.js";

export abstract class PaymentProcessorCreator {
  abstract createProcessor(): PaymentProcessor;

  collectDeposit(
    amount: number,
    currency: string,
    reservationUid: string
  ) {
    const processor = this.createProcessor();
    console.log(`  Method: ${processor.getMethod()}`);
    return processor.processReservationPayment(amount, currency, reservationUid);
  }
}
