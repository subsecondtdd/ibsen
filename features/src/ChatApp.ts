export default class ChatApp {
  private readonly messages: string[] = []

  signIn(actorName: string) {
  }

  say(actorName: string, message: string) {
    this.messages.push(message)
  }

  getMessagesFor(actorName: string): string[] {
    return this.messages
  }
}
