import IChatSession from "./IChatSession"
import IChatApi from "../domain/IChatApi"

export default class ApiChatSession implements IChatSession {
  constructor(private readonly actorName: string, private readonly api: IChatApi) {
  }

  async say(message: string): Promise<void> {
    await this.api.say(this.actorName, message)
  }

  // TODO: Cache/poll messages?
  async getMessages(): Promise<string[]> {
    return this.api.getMessages()
  }

  lookAtMessages(): void {
  }
}
