import Interaction from "./Interaction"
import ISession from "./ISession"

export default class Actor<DomainApi = {}> {
  private readonly name: string
  private readonly api: DomainApi
  private readonly session: ISession

  constructor(name: string, api: DomainApi, session: ISession) {
    this.name = name
    this.api = api
    this.session = session
  }

  public getName(): string {
    return this.name
  }

  public async has(actorNameFunction: (actorName: string) => (api: DomainApi) => Promise<void>): Promise<void> {
    const contextFunction = await actorNameFunction(this.getName())
    return contextFunction(this.api)
  }

  public async attemptsTo(interaction: Interaction<void>): Promise<void> {
    return this.callSessionFunction(interaction)
  }

  public async check<T>(interaction: Interaction<T>): Promise<T> {
    return this.callSessionFunction(interaction)
  }

  private async callSessionFunction<T>(interaction: Interaction<T>): Promise<T> {
    const key = this.session.constructor.name
    const sessionFunction = interaction[key]
    if (!sessionFunction) throw new Error(`No ${key} in ${Object.keys(interaction)}`)
    return sessionFunction(this.session)
  }
}
