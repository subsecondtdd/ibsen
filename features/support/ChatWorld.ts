import http, { IncomingMessage, ServerResponse } from "http"
import { AddressInfo } from "net"
import { promisify } from "util"
import World from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/ChatApp"
import ISession from "../../src/ISession"
import DirectSession from "./sessions/DirectSession"
import DomSession from "./sessions/DomSession"
import HttpSession from "./sessions/HttpSession"
import ChatClient from "../src/ChatClient"

function makeApp(chatApp: ChatApp) {
  return (req: IncomingMessage, res: ServerResponse) => {
    const messages = chatApp.getMessages()
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(messages))
  }
}

class ChatWorld extends World {
  private readonly chatApp: ChatApp

  constructor() {
    super()
    this.chatApp = new ChatApp()
  }

  public async makeSession(sessionType: string, actorName: string): Promise<ISession> {
    switch (sessionType) {
      case "DirectSession":
        return new DirectSession(actorName, this.chatApp)

      case "DomSession":
        return new DomSession(actorName, this.chatApp)

      case "HttpSession":
        const app = makeApp(this.chatApp)
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
        const chatClient = new ChatClient(baseurl)
        return new HttpSession(actorName, this.chatApp, chatClient)
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
