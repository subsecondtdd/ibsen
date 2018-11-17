import fetch from "node-fetch"
import IChatApi from "./IChatApi"

export default class ChatClient implements IChatApi {
  constructor(private readonly baseurl: string) {
  }

  say(actorName: string, message: string): Promise<void> {
    throw new Error("TODO")
  }

  public async getMessages(): Promise<string[]> {
    const res = await fetch(`${this.baseurl}/messages`)
    return await res.json()
  }
}
