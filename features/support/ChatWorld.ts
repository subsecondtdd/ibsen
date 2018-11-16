import World from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/ChatApp"
import ISession from "../../src/ISession"
import DirectSession from "./sessions/DirectSession"
import DomSession from "./sessions/DomSession"

class ChatWorld extends World {
  private readonly chatApp: ChatApp

  constructor() {
    super()
    this.chatApp = new ChatApp()
  }

  public makeSession(sessionType: string, actorName: string): ISession {
    switch (sessionType) {
      case "DirectSession":
        return new DirectSession(this.chatApp)

      case "DomSession":
        return new DomSession(actorName, this.chatApp)
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
