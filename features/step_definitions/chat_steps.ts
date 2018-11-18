import assert from "assert"
import { Given, Then, When } from "cucumber"
import Actor from "../../src/Actor"
import { Said } from "../support/contexts"
import { LookAtMessages } from "../support/actions"
import { Messages } from "../support/outcomes"

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
