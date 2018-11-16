import fetch from "node-fetch"

export default class ChatClient {
  constructor(private readonly baseurl: string) {
  }

  public async getMessages(): Promise<string[]> {
    const res = await fetch(`${this.baseurl}/messages`)
    return await res.json()
  }
}
