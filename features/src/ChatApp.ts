import IChatApi from "./IChatApi"

export default class ChatApp implements IChatApi {
  private readonly messages: string[] = []

  async say(actorName: string, message: string): Promise<void> {
    this.messages.push(`${actorName}: ${message}`)
  }

  async getMessages(): Promise<string[]> {
    return this.messages
  }
}
