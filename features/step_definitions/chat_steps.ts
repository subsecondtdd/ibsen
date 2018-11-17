import { Given, Then, When } from "cucumber"
import Actor from "../../src/Actor"
import DirectSession from "../support/sessions/DirectSession"
import getMicrodata from "../../src/getMicrodata"
import assert from "assert"
import DomSession from "../support/sessions/DomSession"
import HttpSession from "../support/sessions/HttpSession"
import ChatContext from "../support/sessions/ChatContext"

const Said = (message: string) => (actorName: string) => ({chatApp}: ChatContext) => {
  return chatApp.say(actorName, message)
}

function Look() {
  return {
    DirectSession: async () => {
    },
    DomSession: async () => {
    },
    HttpSession: async () => {
    },
  }
}


function Messages() {
  return {
    DirectSession: async ({chatApi}: DirectSession): Promise<string[]> => {
      return chatApi.getMessages()
    },
    DomSession: async ({$root}: DomSession): Promise<string[]> => {
      const microdata = getMicrodata($root)
      return microdata.messages.map((m: any) => m.value)
    },
    HttpSession: async ({chatClient}: HttpSession): Promise<string[]> => {
      return chatClient.getMessages()
    }
  }
}


Given("{actor} has said {string}", async function (actor: Actor, message: string) {
  const context = Said(message)
  await actor.has(context)
})

When("{actor} looks at the messages", async function (actor: Actor) {
  await actor.attemptsTo(Look())
})

Then("{actor} should see {string}", async function (actor: Actor, message: string) {
  const messages: string[] = await actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
