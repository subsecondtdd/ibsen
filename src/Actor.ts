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

  public has(interaction: Interaction<void>): void {
    return this.invoke(interaction)
  }

  public attemptsTo(interaction: Interaction<void>): void {
    return this.invoke(interaction)
  }

  public check<T>(interaction: Interaction<T>): T {
    return this.invoke(interaction)
  }

  private invoke<T>(interaction: Interaction<T>): T {
    const key = this.session.constructor.name
    const fn = interaction[key]
    if (!fn) throw new Error(`No ${key} in ${Object.keys(interaction)}`)
    return fn(this.session)
  }
}
