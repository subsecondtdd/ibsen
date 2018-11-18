import Interaction from "./Interaction"
import ISession from "./ISession"
import IDomainContext from "./IDomainContext"

export default class Actor {
  private readonly name: string
  private readonly domainContext: IDomainContext
  private readonly session: ISession

  constructor(name: string, domainContext: IDomainContext, session: ISession) {
    this.name = name
    this.domainContext = domainContext
    this.session = session
  }

  public getName(): string {
    return this.name
  }

  public async has(actorNameFunction: (actorName: string) => (domainContext: IDomainContext) => Promise<void>): Promise<void> {
    const contextFunction = await actorNameFunction(this.getName())
    return contextFunction(this.domainContext)
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
