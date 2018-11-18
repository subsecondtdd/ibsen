export default interface IChatApi {
  say(actorName: string, message: string): Promise<void>
  getMessages(): Promise<string[]>
}
