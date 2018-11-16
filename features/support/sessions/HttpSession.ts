import ISession from "../../../src/ISession"
import ChatApp from "../../src/ChatApp"
import ChatClient from "../../src/ChatClient"

export default class HttpSession implements ISession {
  // TODO: should not have access to chatApp
  constructor(public actorName: string, public chatApp: ChatApp, public chatClient: ChatClient) {
  }

  start(): void {
  }

  stop(): void {
  }
}
