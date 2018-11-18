import { IncomingMessage, ServerResponse } from "http"
import World from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/ChatApp"
import IChatApi from "../src/IChatApi"
import makeRequestListener from "../src/makeRequestListener"
import renderApp from "../src/renderApp"
import ChatClient from "../src/ChatClient"

class ChatWorld extends World<IChatApi> {
  protected makeDomainApi(): IChatApi {
    return new ChatApp();
  }

  protected makeHttpApi(baseurl: string): IChatApi {
    return new ChatClient(baseurl)
  }

  protected makeRenderApp(api: IChatApi): ($root: HTMLElement) => void {
    return ($root: HTMLElement) => renderApp($root, api)
  }

  protected makeRequestListener(api: IChatApi): (request: IncomingMessage, response: ServerResponse) => void {
    return makeRequestListener(api)
  }
}

Before(async function () {
  await this.start()
})

After(async function () {
  await this.stop()
})

setWorldConstructor(ChatWorld)
