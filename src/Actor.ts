import Interaction from "./Interaction"
import World from "./World"
import ISession from "./ISession"

export default class Actor {
  private readonly name: string
  private readonly world: World
  private readonly session: ISession

  constructor(name: string, world: World, session: ISession) {
    this.name = name
    this.world = world
    this.session = session
  }

  public getName(): string {
    return this.name
  }

  // TODO: Don't use Interaction here, but something representing *context* (the "past")
  public async has(interaction: Interaction<void>): Promise<void> {
    return this.invoke(interaction)
  }

  public async attemptsTo(interaction: Interaction<void>): Promise<void> {
    return this.invoke(interaction)
  }

  public async check<T>(interaction: Interaction<T>): Promise<T> {
    return this.invoke(interaction)
  }

  private async invoke<T>(interaction: Interaction<T>): Promise<T> {
    const key = this.session.constructor.name
    const fn = interaction[key]
    if (!fn) throw new Error(`No ${key} in ${Object.keys(interaction)}`)
    return fn(this.session)
  }
}
