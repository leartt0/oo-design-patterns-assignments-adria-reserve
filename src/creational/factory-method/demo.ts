import { SAMPLE_RESERVATION } from "../../domain/adria-reserve.js";
import {
  BankTransferProcessorFactory,
  CashProcessorFactory,
  CreditCardProcessorFactory,
} from "./factories.js";

export function runFactoryMethodDemo(): void {
  console.log(
    "=== Factory Method — Adria Reserve Reservation Payments ===\n"
  );

  const reservation = SAMPLE_RESERVATION;
  const depositAmount = (reservation.price * reservation.depositPercent) / 100;

  console.log(
    `Reservation ${reservation.uid}: ${reservation.propertyName}, ${reservation.location}`
  );
  console.log(
    `Guest: ${reservation.guestName} | Total: ${reservation.price} EUR | Deposit (${reservation.depositPercent}%): ${depositAmount} EUR\n`
  );

  const factories = [
    new CreditCardProcessorFactory(),
    new BankTransferProcessorFactory(),
    new CashProcessorFactory(),
  ];

  for (const factory of factories) {
    const result = factory.collectDeposit(
      depositAmount,
      "EUR",
      reservation.uid
    );
    console.log(
      `  Result: ${result.message} [${result.status}] (id: ${result.paymentId})\n`
    );
  }
}
