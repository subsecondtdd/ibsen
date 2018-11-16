import { Given, Then, When } from "cucumber"
import Actor from "../../src/Actor"
import DirectSession from "../support/sessions/DirectSession"
import BaseDomSession from "../../src/BaseDomSession"
import getMicrodata from "../../src/getMicrodata"
import assert from "assert"
import DomSession from "../support/sessions/DomSession"

function Said(message: string) {
  return {
    DirectSession: ({chatApp, actorName}: DirectSession) => {
      chatApp.say(actorName, message)
    },
    DomSession: ({chatApp, actorName}: DomSession) => {
      chatApp.say(actorName, message)
    },
  }
}


function Look() {
  return {
    DirectSession: () => {},
    DomSession: () => {},
  }
}


function Messages() {
  return {
    DirectSession: ({chatApp}: DirectSession): string[] => {
      return chatApp.getMessages()
    },
    DomSession: ({$root}: BaseDomSession): string[] => {
      const microdata = getMicrodata($root)
      return microdata.messages.map((m: any) => m.value)
    }
  }
}


Given("{actor} has said {string}", function (actor: Actor, message: string) {
  actor.has(Said(message))
})

When("{actor} looks at the messages", async function (actor: Actor) {
  await actor.attemptsTo(Look())
})

Then("{actor} should see {string}", function (actor: Actor, message: string) {
  const messages: string[] = actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
