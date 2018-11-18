import { IncomingMessage, ServerResponse } from "http"
import ibsen from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/ChatApp"
import IChatApi from "../src/IChatApi"
import makeChatListener from "../src/makeChatListener"
import renderApp from "../src/renderApp"
import ChatClient from "../src/ChatClient"

ibsen<IChatApi>({
  makeDomainApi(): IChatApi {
    return new ChatApp();
  },

  makeHttpApi(baseurl: string): IChatApi {
    return new ChatClient(baseurl)
  },

  makeRenderApp(api: IChatApi): ($root: HTMLElement) => void {
    return ($root: HTMLElement) => renderApp($root, api)
  },

  makeRequestListener(api: IChatApi): (request: IncomingMessage, response: ServerResponse) => void {
    return makeChatListener(api)
  },
})

