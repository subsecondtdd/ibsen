import { Given, Then, When } from "cucumber"
import Actor from "../../src/Actor"
import DomainSession from "../support/sessions/DomainSession"
import getMicrodata from "../../src/getMicrodata"
import assert from "assert"
import { waitForElement } from "dom-testing-library"
import DomSession from "../support/sessions/DomSession"
import ChatContext from "../support/sessions/ChatContext"

const Said = (message: string) => (actorName: string) => ({chatApp}: ChatContext) => {
  return chatApp.say(actorName, message)
}

function Look() {
  return {
    DomainSession: async () => {
    },
    DomSession: async ({$root}: DomSession) => {
      await waitForElement(() => $root.querySelector("li"), ({container: $root}))
    },
  }
}


function Messages() {
  return {
    DomainSession: async ({chatApi}: DomainSession): Promise<string[]> => {
      return chatApi.getMessages()
    },
    DomSession: async ({$root}: DomSession): Promise<string[]> => {
      const microdata = getMicrodata($root)
      return microdata.messages.map((m: any) => m.value)
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
