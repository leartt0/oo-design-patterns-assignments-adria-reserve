import { runFactoryMethodDemo } from "./creational/factory-method/demo.js";
import { runCompositeDemo } from "./structural/composite/demo.js";
import { runObserverDemo } from "./behavioral/observer/demo.js";

function main(): void {
  console.log("OO Design & Patterns Assignments — Adria Reserve\n");
  console.log("=".repeat(55));
  console.log();

  runFactoryMethodDemo();

  console.log("=".repeat(55));
  console.log();

  runCompositeDemo();

  console.log("=".repeat(55));
  console.log();

  runObserverDemo();

  console.log("=".repeat(55));
  console.log("\nAll demonstrations completed.");
}

main();
