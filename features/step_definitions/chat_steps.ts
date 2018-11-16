import { Given, Then, When } from "cucumber"
import Actor from "../../src/Actor"
import DirectSession from "../support/sessions/DirectSession"
import BaseDomSession from "../../src/BaseDomSession"
import getMicrodata from "../../src/getMicrodata"
import assert from "assert"
import DomSession from "../support/sessions/DomSession"
import HttpSession from "../support/sessions/HttpSession"

function Said(message: string) {
  return {
    DirectSession: async ({chatApp, actorName}: DirectSession) => {
      chatApp.say(actorName, message)
    },
    DomSession: async ({chatApp, actorName}: DomSession) => {
      chatApp.say(actorName, message)
    },
    HttpSession: async ({chatApp, actorName}: HttpSession) => {
      chatApp.say(actorName, message)
    },
  }
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
    DirectSession: async ({chatApp}: DirectSession): Promise<string[]> => {
      return chatApp.getMessages()
    },
    DomSession: async ({$root}: BaseDomSession): Promise<string[]> => {
      const microdata = getMicrodata($root)
      return microdata.messages.map((m: any) => m.value)
    },
    HttpSession: async ({chatClient}: HttpSession): Promise<string[]> => {
      return chatClient.getMessages()
    }
  }
}


Given("{actor} has said {string}", async function (actor: Actor, message: string) {
  await actor.has(Said(message))
})

When("{actor} looks at the messages", async function (actor: Actor) {
  await actor.attemptsTo(Look())
})

Then("{actor} should see {string}", async function (actor: Actor, message: string) {
  const messages: string[] = await actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
