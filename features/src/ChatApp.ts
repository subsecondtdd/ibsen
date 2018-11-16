export default class ChatApp {
  private readonly messages: string[] = []

  say(actorName: string, message: string) {
    this.messages.push(`${actorName}: ${message}`)
  }

  getMessages(): string[] {
    return this.messages
  }
}
