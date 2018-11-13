export default interface IQuestions<T> {
  DomActor?: ($root: HTMLElement) => T
  DirectActor?: () => T
}
