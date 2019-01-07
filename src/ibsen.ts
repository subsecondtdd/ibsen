import Actor from "./Actor"
import http from "http"
import { promisify } from "util"
import { AddressInfo } from "net"
import { After, Before, setWorldConstructor } from "cucumber"
import { Context, SessionFactory } from "./types"

const SESSION = process.env.SESSION
const API = process.env.API
const KEEP_DOM = !!process.env.KEEP_DOM

export { Actor, Context, SessionFactory }

interface IbsenOptions<Api> {
  makeRenderApp: (session: any) => ($root: HTMLElement) => void

  makeDomainApi: () => Api

  makeHttpApi: (baseurl: string) => Api

  makeHttpServer: (api: Api) => Promise<http.Server>
}

export interface IbsenWorld<Api> {
  makeSession<Session>(actorName: string, sessionFactory: SessionFactory<Api, Session>): Session
}

export default function ibsen<Api>(options: IbsenOptions<Api>) {
  class World implements IbsenWorld<Api> {
    private readonly actors = new Map<string, Actor<Api>>()
    private readonly stoppables: Array<() => void> = []
    private domainApi: Api
    private baseurl: string

    async context(context: Context<Api>) {
      await context(this.domainApi)
    }

    async getActor(actorName: string): Promise<Actor<Api>> {
      if (this.actors.has(actorName)) return this.actors.get(actorName)

      const actor = new Actor(actorName, this)
      this.actors.set(actorName, actor)
      return actor
    }

    async start() {
      this.domainApi = await options.makeDomainApi()

      if (API === "HTTP") {
        const server = await options.makeHttpServer(this.domainApi)
        const listen = promisify(server.listen.bind(server))
        await listen()
        this.stoppables.push(async () => {
          const close = promisify(server.close.bind(server))
          await close()
        })
        const addr = server.address() as AddressInfo
        const port = addr.port
        this.baseurl = `http://localhost:${port}`
      }
    }

    async stop() {
      for (const stoppable of this.stoppables.reverse()) {
        await stoppable()
      }
    }

    protected makeSessionApi(): Api {
      switch (API) {
        case "Direct":
          return this.domainApi

        case "HTTP":
          return options.makeHttpApi(this.baseurl)

        default:
          throw new Error(`Unsupported Api: ${API}`)
      }
    }

    public makeSession<Session>(actorName: string, sessionFactory: SessionFactory<Api, Session>): Session {
      const apiSession = sessionFactory.ApiSession(actorName, this.makeSessionApi())

      switch (SESSION) {
        case "ApiSession":
          return apiSession

        case "DomSession":
          const $actor = this.makeActorNode(actorName)
          const session = sessionFactory.DomSession(actorName, $actor)
          const renderApp = options.makeRenderApp(apiSession)
          renderApp($actor)
          return session

        default:
          throw new Error(`Unsupported Session: ${SESSION}`)
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
