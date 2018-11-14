import IStartable from "./IStartable"
import IStoppable from "./IStoppable"
import IActions from "./IActions"
import IOutcomes from "./IOutcomes"

export default interface IActor extends IStartable, IStoppable {
  getName(): string

  has(context: (...args: any[]) => void): void

  attemptsTo(actions: IActions): void

  check<T>(outcomes: IOutcomes<T>): T
}

