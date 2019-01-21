import IChatSession from "../src/client/IChatSession"
import { fireEvent, waitForElement } from "dom-testing-library"
// @ts-ignore
import reactTriggerChange from "react-trigger-change"
import getMicrodata from "../../src/getMicrodata"

export default class DomChatSession implements IChatSession {
  constructor(private actorName: string, private $root: HTMLElement) {
  }

  public say(message: string) {
    const $message = this.$root.querySelector("input") as HTMLInputElement
    $message.value = message
    reactTriggerChange($message)

    const $form = this.$root.querySelector("form") as HTMLFormElement
    fireEvent.submit($form)
    return Promise.resolve(this)
  }

  getMessages() {
    const microdata = getMicrodata(this.$root)
    return microdata.messages.map((m: any) => m.value)
  }

  async lookAtMessages() {
    await waitForElement(() => this.$root.querySelector("li"), ({container: this.$root}))
    return this
  }
}
