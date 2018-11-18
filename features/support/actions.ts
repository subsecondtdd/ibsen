import { waitForElement } from "dom-testing-library"
import DomSession from "../../src/DomSession"

export function LookAtMessages() {
  return {
    DomainSession: async () => {
    },
    DomSession: async ({$root}: DomSession) => {
      await waitForElement(() => $root.querySelector("li"), ({container: $root}))
    },
  }
}
