import { Given, Then, When } from "cucumber"
import IActor from "../../src/IActor"
import IActions from "../../src/IActions"
import getMicrodata from "../../src/getMicrodata"
import IOutcomes from "../../src/IOutcomes"
import ChatApp from "../src/ChatApp"
import assert = require("assert")

function SignedIn() {
  return (actorName: string, chatApp: ChatApp) => {
    chatApp.signIn(actorName)
  }
}

function Say(text: string): IActions {
  return {
    DomActor: ($root: HTMLElement) => {
      console.log(`2 Fill in ${text} under ${$root}`)
    },

    DirectActor: (actorName: string, chatApp: ChatApp) => {
      chatApp.say(actorName, text)
    }
  }
}

function Messages(): IOutcomes<string[]> {
  return {
    DomActor: ($root: HTMLElement): string[] => {
      return getMicrodata($root)["messages"]
    },

    DirectActor: (actorName: string, chatApp: ChatApp): string[] => {
      return chatApp.getMessagesFor(actorName)
    }
  }
}


Given("{actor} has signed in", function (actor: IActor) {
  actor.has(SignedIn())
})

When("{actor} says {string}", async function (actor: IActor, text: string) {
  await actor.attemptsTo(Say(text))
})

Then("{actor} should see message {string}", function (actor: IActor, message: string) {
  const messages: string[] = actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
