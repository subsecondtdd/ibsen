import { IncomingMessage, ServerResponse } from "http"
import IChatApi from "./IChatApi"

/**
 * Makes a request listener that acts as a thin HTTP adapter in front of the application
 * This could be implemented using a framework like Express.
 *
 * @param chatApi the domain logic
 */
export default function (chatApi: IChatApi) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const messages = await chatApi.getMessages()
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(JSON.stringify(messages))
    } catch (e) {
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.end(e.message)
    }
  }
}
