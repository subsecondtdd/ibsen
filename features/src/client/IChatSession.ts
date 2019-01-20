export default interface IChatSession {
  say(message: string): void

  getMessages(): Promise<string[]>

  lookAtMessages(): void
}
