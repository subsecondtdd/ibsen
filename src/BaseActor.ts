import IActor from "./IActor"
import IActions from "./IActions"
import IOutcomes from "./IOutcomes"
import World from "./World"

export default abstract class BaseActor implements IActor {
  private readonly name: string
  private readonly world: World

  constructor(name: string, world: World) {
    this.name = name
    this.world = world
  }

  public getName(): string {
    return this.name
  }

  public abstract start(): void

  public abstract stop(): void

  public has(context: (...args: any[]) => void): void {
    return this.world.invokeContextFunction(this.getName(), context)
  }

  public attemptsTo(actions: IActions): void {
    const action = Reflect.get(actions, this.constructor.name)
    return this.world.invokeActionFunction(this.getName(), action)
  }

  public check<T>(outcomes: IOutcomes<T>): T {
    const outcome = Reflect.get(outcomes, this.constructor.name)
    return this.world.invokeOutcomeFunction<T>(this.getName(), outcome)
  }
}
