import IChatSession from "./IChatSession"
import IChatApi from "../domain/IChatApi"

export default class ApiChatSession implements IChatSession {
  constructor(private readonly actorName: string, private readonly api: IChatApi) {
  }

  async say(message: string): Promise<IChatSession> {
    await this.api.say(this.actorName, message)
    return this
  }

  // TODO: Cache/poll messages?
  async getMessages(): Promise<string[]> {
    return this.api.getMessages()
  }

  async lookAtMessages(): Promise<IChatSession> {
    return this
  }
}
