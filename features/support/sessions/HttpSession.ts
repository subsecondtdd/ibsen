import ISession from "../../../src/ISession"
import ChatClient from "../../src/ChatClient"

export default class HttpSession implements ISession {
  constructor(public actorName: string, public chatClient: ChatClient) {
  }

  start(): void {
  }

  stop(): void {
  }
}
