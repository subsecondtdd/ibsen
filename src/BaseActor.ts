import IActor from "./IActor"
import IActivities from "./IActivities"
import IQuestions from "./IQuestions"

export default abstract class BaseActor implements IActor {
  private readonly name: string

  constructor(name: string) {
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public abstract start(): void

  public abstract stop(): void

  public has(pastActivity: (actorName: string) => void): void {
    pastActivity(this.getName())
  }

  public attemptsTo(activities: IActivities): void {
    const activity = Reflect.get(activities, this.constructor.name)
    this.invoke(activity)
  }

  public ask<T>(questions: IQuestions<T>): T {
    const question = Reflect.get(questions, this.constructor.name)
    return this.invokeQuestion<T>(question)
  }

  protected abstract invoke(activity: (...args: any[]) => void): void

  protected abstract invokeQuestion<T>(question: (...args: any[]) => T): T
}
