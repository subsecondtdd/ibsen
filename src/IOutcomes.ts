export default interface IOutcomes<T> {
  DomActor?: ($root: HTMLElement) => T
  DirectActor?: (...args: any[]) => T
}
