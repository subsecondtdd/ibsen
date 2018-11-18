import ISession from "./ISession"

const loc = (typeof window === "object") ? window.location.href : undefined

export default class DomSession implements ISession {
  private readonly actorName: string
  private readonly renderApp: ($root: HTMLElement) => void
  private $actor: HTMLElement
  public $root: HTMLElement

  constructor(actorName: string, renderApp: ($root: HTMLElement) => void) {
    this.actorName = actorName
    this.renderApp = renderApp
  }

  start(): void {
    if (this.$root) throw new Error(`${this.actorName} already started`)

    // Prevent previous scenario's URL from interfering
    window.history.pushState(undefined, undefined, loc)
    this.$actor = document.createElement("div")
    this.$actor.innerHTML = `<h1>${this.actorName}</h1>`
    document.body.appendChild(this.$actor)
    this.$root = document.createElement("div")
    this.$actor.appendChild(this.$root)
    this.renderApp(this.$root)
  }

  stop(): void {
    this.$actor.parentNode.removeChild(this.$actor)
  }
}
