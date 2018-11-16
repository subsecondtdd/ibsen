import ISession from "./ISession"

const loc = (typeof window === "object") ? window.location.href : undefined

export default class BaseDomSession implements ISession {
  private readonly actorName: string
  private readonly keepDom: boolean
  private readonly mountApp: ($root: HTMLElement) => void
  private $actor: HTMLElement
  public $root: HTMLElement

  constructor(actorName: string, mountApp: ($root: HTMLElement) => void, keepDom: boolean) {
    this.actorName = actorName
    this.mountApp = mountApp
    this.keepDom = keepDom
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
    this.mountApp(this.$root)
  }

  stop(): void {
    if (this.keepDom) {
      return
    }
    this.$actor.parentNode.removeChild(this.$actor)
  }
}
