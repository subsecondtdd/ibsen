import { Given, Then, When } from "cucumber"
import IActor from "../../src/IActor"
import IActivities from "../../src/IActivities"
import assert = require("assert")
import getMicrodata from "../../src/getMicrodata"
import IQuestions from "../../src/IQuestions"

function Say(text: string): IActivities {
  return {
    DomActor: ($root: HTMLElement) => {
      console.log(`2 Fill in ${text} under ${$root}`)
    },

    DirectActor: () => {
      console.log(`2 Directly say ${text}`)
    }
  }
}

function SignedIn() {
  return (actorName: string) => {
    console.log(`Signed in ${actorName}`)
  }
}

function Messages(): IQuestions<string[]> {
  return {
    DomActor: ($root: HTMLElement): string[] => {
      return getMicrodata($root)["messages"]
    },

    DirectActor: (): string[] => {
      return ["HMMMM", "OK..."]
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
  const messages: string[] = actor.ask(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
