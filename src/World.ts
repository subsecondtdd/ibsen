import Actor from "./Actor"
import ISession from "./ISession"
import DomainSession from "./DomainSession"
import DomSession from "./DomSession"
import http, { IncomingMessage, ServerResponse } from "http"
import { promisify } from "util"
import { AddressInfo } from "net"

const SESSION = process.env.SESSION
const API = process.env.API

export default abstract class World<Api> {
  private domainApi: Api
  private readonly actors = new Map<string, Actor<Api>>()
  protected readonly stoppables: Array<() => void> = []

  async getActor(actorName: string): Promise<Actor<Api>> {
    if (this.actors.has(actorName)) return this.actors.get(actorName)

    if (!SESSION) {
      throw new Error(`Please define the $SESSION environment variable`)
    }

    const session = await this.makeSession(SESSION, actorName)
    if (!session) {
      throw new Error(`No ${SESSION} defined in ${this.constructor.name}`)
    }
    await session.start()
    this.stoppables.push(session.stop.bind(session))

    const actor = new Actor(actorName, this.domainApi, session)
    this.actors.set(actorName, actor)
    return actor
  }

  async start() {
    this.domainApi = await this.makeDomainApi()
  }

  async stop() {
    for (const stoppable of this.stoppables.reverse()) {
      await stoppable()
    }
  }

  protected async makeSession(sessionType: string, actorName: string): Promise<ISession> {
    const api = await this.makeApi(API)

    switch (sessionType) {
      case "DomainSession":
        return new DomainSession(actorName, api)

      case "DomSession":
        return new DomSession(actorName, this.makeRenderApp(api))

      default:
        throw new Error(`Unsupported Session: ${sessionType}`)
    }
  }

  protected async makeApi(chatApiType: string): Promise<Api> {
    switch (chatApiType) {
      case "Direct":
        return this.domainApi

      case "HTTP":
        const app = this.makeRequestListener(this.domainApi)
        const server = http.createServer(app)
        const listen = promisify(server.listen.bind(server))
        await listen()
        this.stoppables.push(async () => {
          const close = promisify(server.close.bind(server))
          await close()
        })
        const addr = server.address() as AddressInfo
        const port = addr.port
        const baseurl = `http://localhost:${port}`
        return this.makeHttpApi(baseurl)

      default:
        throw new Error(`Unsupported ChatApi: ${chatApiType}`)
    }
  }

  protected abstract makeRenderApp(api: Api): ($root: HTMLElement) => void

  protected abstract makeDomainApi(): Api

  protected abstract makeHttpApi(baseurl: string): Api

  protected abstract makeRequestListener(api: Api): (request: IncomingMessage, response: ServerResponse) => void
}
