import IChatApi from "../../src/IChatApi"
import ISession from "../../../src/ISession"

export default class DomainSession implements ISession {
  constructor(public actorName: string, public chatApi: IChatApi) {}

  start(): void {
  }

  stop(): void {
  }
}
