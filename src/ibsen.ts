import Actor from "./Actor"
import http from "http"
import { promisify } from "util"
import { AddressInfo } from "net"
import { After, Before, setWorldConstructor } from "cucumber"
import { Interaction } from "./types"

const SESSION = process.env.SESSION
const API = process.env.API
const KEEP_DOM = !!process.env.KEEP_DOM

export { Actor, Interaction }

interface IbsenOptions<Api, Session> {
  makeApiSession: (actorName: string, api: Api) => Session

  makeDomSession: (actorName: string, $root: HTMLElement) => Session

  makeRenderApp: (api: Api) => ($root: HTMLElement) => void

  makeDomainApi: () => Api

  makeHttpApi: (baseurl: string) => Api

  // makeRequestListener: (api: Api) => (request: IncomingMessage, response: ServerResponse) => void

  makeHttpServer: (api: Api) => http.Server
}

export default function ibsen<Api, Session>(options: IbsenOptions<Api, Session>) {
  class World {
    private domainApi: Api
    private readonly actors = new Map<string, Actor<Api, Session>>()
    protected readonly stoppables: Array<() => void> = []

    async getActor(actorName: string): Promise<Actor<Api, Session>> {
      if (this.actors.has(actorName)) return this.actors.get(actorName)

      if (!SESSION) {
        throw new Error(`Please define the $SESSION environment variable`)
      }

      const api = await this.makeApi(API)
      const session = this.makeSession(SESSION, actorName, api)
      if (!session) {
        throw new Error(`No ${SESSION} defined in ${this.constructor.name}`)
      }

      const actor = new Actor(actorName, this.domainApi, session)
      this.actors.set(actorName, actor)
      return actor
    }

    async start() {
      this.domainApi = await options.makeDomainApi()
    }

    async stop() {
      for (const stoppable of this.stoppables.reverse()) {
        await stoppable()
      }
    }

    protected async makeApi(apiType: string): Promise<Api> {
      switch (apiType) {
        case "Direct":
          return this.domainApi

        case "HTTP":
          // const app = options.makeRequestListener(this.domainApi)
          // const server = http.createServer(app)
          const server = options.makeHttpServer(this.domainApi)
          const listen = promisify(server.listen.bind(server))
          await listen()
          this.stoppables.push(async () => {
            const close = promisify(server.close.bind(server))
            await close()
          })
          const addr = server.address() as AddressInfo
          const port = addr.port
          const baseurl = `http://localhost:${port}`
          return options.makeHttpApi(baseurl)

        default:
          throw new Error(`Unsupported Api: ${apiType}`)
      }
    }

    private makeSession(sessionType: string, actorName: string, api: Api): Session {
      switch (sessionType) {
        case "ApiSession":
          return options.makeApiSession(actorName, api)

        case "DomSession":
          const $actor = this.makeActorNode(actorName)
          const renderApp = options.makeRenderApp(api)
          renderApp($actor)
          return options.makeDomSession(actorName, $actor)

        default:
          throw new Error(`Unsupported Session: ${sessionType}`)
      }
    }

    private makeActorNode(actorName: string): HTMLElement {
      const loc = (typeof window === "object") ? window.location.href : undefined

      // Prevent previous scenario's URL from interfering
      window.history.pushState(undefined, undefined, loc)
      const $actor = document.createElement("div")
      $actor.innerHTML = `<h1>${actorName}</h1>`
      document.body.appendChild($actor)
      const $root = document.createElement("div")
      $actor.appendChild($root)

      if (!KEEP_DOM) {
        this.stoppables.push(async () => {
          $actor.remove()
        })
      }

      return $root
    }
  }

  Before(async function () {
    await this.start()
  })

  After(async function () {
    await this.stop()
  })

  setWorldConstructor(World)
}
