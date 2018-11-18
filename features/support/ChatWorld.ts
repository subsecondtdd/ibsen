import { IncomingMessage, ServerResponse } from "http"
import ibsen from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/domain/ChatApp"
import IChatApi from "../src/domain/IChatApi"
import makeChatListener from "../src/server/makeChatListener"
import renderApp from "../src/client/renderApp"
import ChatClient from "../src/client/ChatClient"

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

