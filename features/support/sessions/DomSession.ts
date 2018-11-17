import BaseDomSession from "../../../src/BaseDomSession"
import mountApp from "../../src/mountApp"
import IChatApi from "../../src/IChatApi"

export default class DomSession extends BaseDomSession {
  constructor(actorName: string, public chatApi: IChatApi) {
    super(actorName, ($root: HTMLElement) => mountApp($root, chatApi), true)
  }
}
