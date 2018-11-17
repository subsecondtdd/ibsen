import http from "http"
import { AddressInfo } from "net"
import { promisify } from "util"
import World from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/ChatApp"
import ISession from "../../src/ISession"
import DirectSession from "./sessions/DirectSession"
import DomSession from "./sessions/DomSession"
import ChatClient from "../src/ChatClient"
import ChatContext from "./sessions/ChatContext"
import IChatApi from "../src/IChatApi"
import makeRequestListener from "../src/makeRequestListener"

const CHAT_API = process.env.CHAT_API

class ChatWorld extends World {
  private readonly chatApp: ChatApp

  constructor() {
    super()
    this.chatApp = new ChatApp()
  }

  protected async makeContext(): Promise<ChatContext> {
    return {chatApp: this.chatApp}
  }

  protected async makeSession(sessionType: string, actorName: string): Promise<ISession> {
    const chatApi = await this.makeChatApi(CHAT_API)

    switch (sessionType) {
      case "DirectSession":
        return new DirectSession(actorName, chatApi)

      case "DomSession":
        return new DomSession(actorName, chatApi)

      default:
        throw new Error(`Unsupported Session: ${sessionType}`)
    }
  }

  protected async makeChatApi(chatApiType: string): Promise<IChatApi> {
    switch (chatApiType) {
      // TODO: Direct or HTTP

      case "ChatApp":
        return this.chatApp

      case "ChatClient":
        const app = makeRequestListener(this.chatApp)
        // TODO: Extract this
        const server = http.createServer(app)
        const listen = promisify(server.listen.bind(server))
        await listen()
        this.stoppables.push(async () => {
          const close = promisify(server.close.bind(server))
          await close()
        })
        const addr = server.address() as AddressInfo
        const port = addr.port
        const baseurl = `http://localhost:${port}`
        return new ChatClient(baseurl)

      default:
        throw new Error(`Unsupported ChatApi: ${chatApiType}`)
    }
  }
}

Before(async function () {
  await this.start()
})

After(async function () {
  await this.stop()
})

setWorldConstructor(ChatWorld)
