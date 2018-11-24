import fetch from "node-fetch"
import IChatApi from "../domain/IChatApi"

export default class ChatClient implements IChatApi {
  constructor(private readonly baseurl: string) {
  }

  public async say(actorName: string, message: string): Promise<void> {
    const res = await fetch(`${this.baseurl}/messages`, {
      method: "POST",
      body: JSON.stringify({
        actorName,
        message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!res.ok) {
      throw new Error(await res.text())
    }
  }

  public async getMessages(): Promise<string[]> {
    const res = await fetch(`${this.baseurl}/messages`)
    return await res.json()
  }
}
