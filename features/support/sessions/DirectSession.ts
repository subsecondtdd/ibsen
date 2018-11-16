import ChatApp from "../../src/ChatApp"
import ISession from "../../../src/ISession"

export default class DirectSession implements ISession {
  actorName: string

  constructor(public chatApp: ChatApp) {}

  start(): void {
  }

  stop(): void {
  }
}
