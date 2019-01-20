import IChatSession from "../src/client/IChatSession"
import { fireEvent, waitForElement } from "dom-testing-library"
// @ts-ignore
import reactTriggerChange from "react-trigger-change"
import getMicrodata from "../../src/getMicrodata"

export default class DomChatSession implements IChatSession {
  constructor(private actorName: string, private $root: HTMLElement) {
  }

  say(message: string) {
    const $message = this.$root.querySelector("input") as HTMLInputElement
    $message.value = message
    reactTriggerChange($message)

    const $form = this.$root.querySelector("form") as HTMLFormElement
    fireEvent.submit($form)
  }

  getMessages(): Promise<string[]> {
    const microdata = getMicrodata(this.$root)
    return microdata.messages.map((m: any) => m.value)
  }

  async lookAtMessages(): Promise<void> {
    await waitForElement(() => this.$root.querySelector("li"), ({container: this.$root}))
  }
}
