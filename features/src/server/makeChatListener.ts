import express from "express"
import IChatApi from "../domain/IChatApi"
import bodyParser = require("body-parser")

/**
 * Makes a request listener that acts as a thin HTTP adapter in front of the application
 * This could be implemented using a framework like Express.
 *
 * @param chatApi the domain logic
 */
export default function (chatApi: IChatApi) {
  const app = express()

  app.use(bodyParser.json())

  app.get("/messages", async (req, res) => {
    try {
      const messages = await chatApi.getMessages()
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(JSON.stringify(messages))
    } catch (e) {
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.end(e.message)
    }
  })

  app.post("/messages", async (req, res) => {
    try {
      const {actorName, message} = req.body
      await chatApi.say(actorName, message)
      res.writeHead(201)
      res.end()
    } catch (e) {
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.end(e.message)
    }
  })

  return app
}
