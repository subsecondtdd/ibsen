import World from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"
import ChatApp from "../src/ChatApp"

class MyWorld extends World {
  private readonly chatApp: ChatApp

  constructor() {
    super()
    this.chatApp = new ChatApp()
  }

  public invokeContextFunction<T>(actorName: string, context: (...args: any[]) => void): void {
    context(actorName, this.chatApp)
  }

  public invokeActionFunction(actorName: string, action: (...args: any[]) => void): void {
    action(actorName, this.chatApp)
  }

  public invokeOutcomeFunction<T>(actorName: string, outcome: (...args: any[]) => T): T {
    return outcome(actorName, this.chatApp)
  }

  // public invokeContextFunction(actorName: string, context: (...args: any[]) => void) {
  //   context(actorName, this.chatApp)
  // }

  // actionArgs(actorName: string): any[] {
  //   return [actorName, this.chatApp]
  // }
  //
  // outcomeArgs(actorName: string): any[] {
  //   return [actorName, this.chatApp]
  // }
}

Before(async function () {
  await this.start()
})

After(async function () {
  await this.stop()
})

setWorldConstructor(MyWorld)
