import ChatApp from "../../src/ChatApp"
import BaseDomSession from "../../../src/BaseDomSession"
import mountApp from "../../src/mountApp"

export default class DomSession extends BaseDomSession {
  constructor(actorName: string, public chatApp: ChatApp) {
    super(actorName, ($root: HTMLElement) => mountApp($root, chatApp), true)
  }
}
