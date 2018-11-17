import ChatApp from "./ChatApp"
import { IncomingMessage, ServerResponse } from "http"

/**
 * Makes a request listener that acts as a thin HTTP adapter in front of the application
 * This could be implemented using a framework like Express.
 *
 * @param chatApp the domain logic
 */
export default function makeRequestLinstener(chatApp: ChatApp) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const messages = await chatApp.getMessages()
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(JSON.stringify(messages))
    } catch (e) {
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.end(e.message)
    }
  }
}
