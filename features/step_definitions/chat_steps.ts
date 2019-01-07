import assert from "assert"
import { Given, Then, When } from "cucumber"
import { Actor } from "../../src/ibsen"
import { ActorHasSaid } from "../support/contexts"
import { LookAtMessages, Say } from "../support/actions"
import { Messages } from "../support/outcomes"
import { Home } from "../support/SessionFactories"

Given("{actor} has said {string}", async function (actor: Actor, message: string) {
  await this.context(ActorHasSaid(actor.getName(), message))
})

When("{actor} looks at the messages", async function (actor: Actor) {
  await actor.attemptsTo(LookAtMessages(), Home)
})

When("{actor} says {string}", async function (actor: Actor, message: string) {
  await actor.attemptsTo(Say(message), Home)
})

Then("{actor} should see {string}", async function (actor: Actor, message: string) {
  const messages: string[] = await actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
