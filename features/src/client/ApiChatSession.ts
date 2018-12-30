import ChatSession from "./ChatSession"
import IChatApi from "../domain/IChatApi"

export default class ApiChatSession implements ChatSession {
  constructor(private actorName: string, private api: IChatApi) {
  }

  async say(message: string): Promise<void> {
    await this.api.say(this.actorName, message)
  }

  async getMessages(): Promise<string[]> {
    return this.api.getMessages()
  }

  lookAtMessages(): void {
  }
}
