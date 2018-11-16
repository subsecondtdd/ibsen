import IStoppable from "./IStoppable"
import Actor from "./Actor"
import ISession from "./ISession"

const SESSION = process.env.SESSION

export default abstract class World {
  private readonly actors = new Map<string, Actor>()
  private readonly stoppables: IStoppable[] = []

  async getActor(actorName: string): Promise<Actor> {
    if (this.actors.has(actorName)) return this.actors.get(actorName)

    if (!SESSION) {
      throw new Error(`Please define the $SESSION environment variable`)
    }

    const session = this.makeSession(SESSION, actorName)
    if (!session) {
      throw new Error(`No session created for ${SESSION}`)
    }
    await session.start()
    this.stoppables.push(session)

    const actor = new Actor(actorName, this, session)
    this.actors.set(actorName, actor)
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

  public abstract makeSession(sessionType: string, actorName: string): ISession
}
