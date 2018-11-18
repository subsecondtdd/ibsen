import ISession from "./ISession"

export default class DomainSession implements ISession {
  constructor(public actorName: string, public api: any) {
  }

  start(): void {
  }

  stop(): void {
  }
}
