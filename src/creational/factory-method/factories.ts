import { PaymentProcessorCreator } from "./PaymentProcessorCreator.js";
import type { PaymentProcessor } from "./PaymentProcessor.js";
import {
  BankTransferProcessor,
  CashProcessor,
  CreditCardProcessor,
} from "./processors.js";

export class CreditCardProcessorFactory extends PaymentProcessorCreator {
  createProcessor(): PaymentProcessor {
    return new CreditCardProcessor();
  }
}

export class BankTransferProcessorFactory extends PaymentProcessorCreator {
  createProcessor(): PaymentProcessor {
    return new BankTransferProcessor();
  }
}

export class CashProcessorFactory extends PaymentProcessorCreator {
  createProcessor(): PaymentProcessor {
    return new CashProcessor();
  }
}
