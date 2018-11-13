import BaseActor from "./BaseActor"

const loc = (typeof window === "object") ? window.location.href : undefined

export default class DomActor extends BaseActor {
  private readonly keepDom: boolean
  private readonly mountApp: ($root: HTMLElement) => void
  private $actor: HTMLElement
  private $root: HTMLElement

  constructor(name: string, mountApp: ($root: HTMLElement) => void, keepDom: boolean) {
    super(name)
    this.mountApp = mountApp
    this.keepDom = keepDom
  }

  start(): void {
    if (this.$root) throw new Error(`DomActor ${this.getName()} already started`)

    // Prevent previous scenario's URL from interfering
    window.history.pushState(undefined, undefined, loc)
    this.$actor = document.createElement("div")
    this.$actor.innerHTML = `<h1>${this.getName()}</h1>`
    document.body.appendChild(this.$actor)
    this.$root = document.createElement("div")
    this.$actor.appendChild(this.$root)
    this.mountApp(this.$root)
  }

  stop(): void {
    if (!this.keepDom)
      this.$actor.parentNode.removeChild(this.$actor)
  }

  protected invoke(activity: (...args: any[]) => void): void {
    activity(this.$root)
  }

  protected invokeQuestion<T>(question: (...args: any[]) => T): T {
    return question(this.$root)
  }
}
