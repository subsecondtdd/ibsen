import { fireEvent, waitForElement } from "dom-testing-library"
import DomSession from "../../src/DomSession"
import DomainSession from "../../src/DomainSession"
import IChatApi from "../src/domain/IChatApi"
// @ts-ignore
import reactTriggerChange from "react-trigger-change"

export function LookAtMessages() {
  return {
    DomainSession: async () => {
    },
    DomSession: async ({$root}: DomSession) => {
      await waitForElement(() => $root.querySelector("li"), ({container: $root}))
    },
  }
}

export function Say(message: string) {
  return {
    DomainSession: async ({actorName, api}: DomainSession<IChatApi>) => {
      await api.say(actorName, message)
    },
    DomSession: async ({$root}: DomSession) => {
      const $message = $root.querySelector("input") as HTMLInputElement
      $message.value = message
      reactTriggerChange($message)

      const $form = $root.querySelector("form") as HTMLFormElement
      fireEvent.submit($form)
    },
  }
}
