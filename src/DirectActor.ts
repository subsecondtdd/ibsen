import BaseActor from "./BaseActor"

export default class DirectActor extends BaseActor {
  start(): void {
  }

  stop(): void {
  }

  protected invoke(activity: (...args: any[]) => void): void {
    activity()
  }

  protected invokeQuestion<T>(question: (...args: any[]) => T): T {
    return question();
  }
}
