import { DomSession, Interaction } from "../../../src/ibsen"
import { fireEvent, waitForElement } from "dom-testing-library"
// @ts-ignore
import reactTriggerChange from "react-trigger-change"

export function LookAtMessages(): Interaction<void> {
  return async ({$root}: DomSession) => {
    await waitForElement(() => $root.querySelector("li"), ({container: $root}))
  }
}

export function Say(message: string) {
  return async ({$root}: DomSession) => {
    const $message = $root.querySelector("input") as HTMLInputElement
    $message.value = message
    reactTriggerChange($message)

    const $form = $root.querySelector("form") as HTMLFormElement
    fireEvent.submit($form)
  }
}
