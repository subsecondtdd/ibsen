import ChatApp from "../../src/ChatApp"
import ISession from "../../../src/ISession"

export default class DirectSession implements ISession {
  constructor(public actorName: string, public chatApp: ChatApp) {}

  start(): void {
  }

  stop(): void {
  }
}
