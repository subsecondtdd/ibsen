export default interface IActions {
  DomActor?: ($root: HTMLElement) => void
  DirectActor?: (...args: any[]) => void
}
