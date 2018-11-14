import BaseActor from "./BaseActor"

export default class DirectActor extends BaseActor {
  start(): void {
  }

  stop(): void {
  }

  protected invokeAction(action: (...args: any[]) => void): void {
    action()
  }

  protected invokeOutcome<T>(question: (...args: any[]) => T): T {
    return question()
  }
}
