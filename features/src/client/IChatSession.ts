export default interface IChatSession {
  say(message: string): Promise<IChatSession>

  getMessages(): Promise<string[]>

  lookAtMessages(): Promise<IChatSession>
}
