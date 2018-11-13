import IStartable from "./IStartable"
import IStoppable from "./IStoppable"
import IActivities from "./IActivities"
import IQuestions from "./IQuestions"

export default interface IActor extends IStartable, IStoppable {
  getName(): string

  has(pastActivity: (actorName: string) => void): void

  attemptsTo(activities: IActivities): void

  ask<T>(question: IQuestions<T>): T
}

