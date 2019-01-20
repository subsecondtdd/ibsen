import http from "http"
import ibsen, { SessionFactory } from "../../src/ibsen"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/domain/ChatApp"
import IChatApi from "../src/domain/IChatApi"
import makeChatExpressApp from "../src/server/makeChatExpressApp"
import renderApp from "../src/client/renderApp"
import ChatClient from "../src/client/ChatClient"
import IChatSession from "../src/client/IChatSession"
import { Home } from "./SessionFactories"

ibsen<IChatApi, IChatSession>({
  makeDomainApi(): IChatApi {
    return new ChatApp()
  },

  makeHttpApi(baseurl: string): IChatApi {
    return new ChatClient(baseurl)
  },

  makeRenderApp(session: IChatSession): ($root: HTMLElement) => void {
    return ($root: HTMLElement) => renderApp($root, session)
  },

  async makeHttpServer(api: IChatApi): Promise<http.Server> {
    const expressApp = makeChatExpressApp(api)
    return http.createServer(expressApp)
  },

  initialSessionFactory(): SessionFactory<IChatApi, IChatSession> {
    return Home
  },
})

