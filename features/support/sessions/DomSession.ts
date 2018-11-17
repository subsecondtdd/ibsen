import BaseDomSession from "../../../src/BaseDomSession"
import renderApp from "../../src/renderApp"
import IChatApi from "../../src/IChatApi"

export default class DomSession extends BaseDomSession {
  constructor(actorName: string, public chatApi: IChatApi) {
    super(actorName, ($root: HTMLElement) => renderApp($root, chatApi), true)
  }
}
