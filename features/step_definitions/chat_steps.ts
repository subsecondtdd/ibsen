import { Given, Then, When } from "cucumber"
import Actor from "../../src/Actor"
import DomainSession from "../../src/DomainSession"
import getMicrodata from "../../src/getMicrodata"
import assert from "assert"
import { waitForElement } from "dom-testing-library"
import DomSession from "../../src/DomSession"
import ChatApp from "../src/ChatApp"

const Said = (message: string) => (actorName: string) => (chatApp: ChatApp) => {
  return chatApp.say(actorName, message)
}

function LookAtMessages() {
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
    DomainSession: async ({api}: DomainSession): Promise<string[]> => {
      return api.getMessages()
    },
    DomSession: async ({$root}: DomSession): Promise<string[]> => {
      const microdata = getMicrodata($root)
      return microdata.messages.map((m: any) => m.value)
    }
  }
}

Given("{actor} has said {string}", async function (actor: Actor, message: string) {
  await actor.has(Said(message))
})

When("{actor} looks at the messages", async function (actor: Actor) {
  await actor.attemptsTo(LookAtMessages())
})

Then("{actor} should see {string}", async function (actor: Actor, message: string) {
  const messages: string[] = await actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
