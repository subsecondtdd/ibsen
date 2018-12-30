import { ISession } from "./types"

export default class ApiSession<Api> implements ISession {
  constructor(public actorName: string, public api: Api) {
  }

  start(): void {
  }

  stop(): void {
  }
}
