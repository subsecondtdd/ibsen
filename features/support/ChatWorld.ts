import http from "http"
import ibsen from "../../src/ibsen"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/domain/ChatApp"
import IChatApi from "../src/domain/IChatApi"
import makeChatExpressApp from "../src/server/makeChatExpressApp"
import renderApp from "../src/client/renderApp"
import ChatClient from "../src/client/ChatClient"
import ChatSession from "../src/client/ChatSession"

ibsen<IChatApi>({
  makeDomainApi(): IChatApi {
    return new ChatApp()
  },

  makeHttpApi(baseurl: string): IChatApi {
    return new ChatClient(baseurl)
  },

  makeRenderApp(session: ChatSession): ($root: HTMLElement) => void {
    return ($root: HTMLElement) => renderApp($root, session)
  },

  async makeHttpServer(api: IChatApi): Promise<http.Server> {
    const expressApp = makeChatExpressApp(api)
    return http.createServer(expressApp)
  },
})

