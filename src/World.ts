import IActor from "./IActor"
import IStoppable from "./IStoppable"
import DirectActor from "./DirectActor"
import DomActor from "./DomActor"

const ACTOR = process.env.ACTOR
type ActorFactory = (actorName: string) => IActor

// TODO: Open-Closed (make final)
export default abstract class World {
  private readonly actors = new Map<string, IActor>()
  private readonly stoppables: IStoppable[] = []

  async getActor(actorName: string): Promise<IActor> {
    if (this.actors.has(actorName)) return this.actors.get(actorName)

    const makerName = `make${ACTOR}`
    const actorMaker: ActorFactory = (this as any)[makerName]
    if (!actorMaker) {
      throw new Error(`No such method: ${this.constructor.name}#${makerName}`)
    }
    const actor = actorMaker.call(this, actorName)
    await actor.start()
    this.actors.set(actorName, actor)
    this.stoppables.push(actor)
    return actor
  }

  async start() {
    // no-op
  }

  async stop() {
    for (const stoppable of this.stoppables.reverse()) {
      await stoppable.stop()
    }
  }

  private makeDirectActor(actorName: string): IActor {
    return new DirectActor(actorName, this)
  }

  private makeDomActor(actorName: string): IActor {
    return new DomActor(actorName, this, this.mountApp.bind(this), true)
  }

  protected mountApp($root: HTMLElement): void {
    console.log("Mounting app...")
  }

  public abstract invokeContextFunction(actorName: string, context: (...args: any[]) => void): void

  public abstract invokeActionFunction(actorName: string, context: (...args: any[]) => void): void

  public abstract invokeOutcomeFunction<T>(actorName: string, context: (...args: any[]) => T): T
}
