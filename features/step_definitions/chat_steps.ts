import assert from "assert"
import { Given, Then, When } from "cucumber"
import { Actor } from "../../src/ibsen"
import { Said } from "../support/contexts"
import * as DomainSessionActions from "../support/DomainSession/actions"
import * as DomSessionActions from "../support/DomSession/actions"
import * as DomainSessionOutcomes from "../support/DomainSession/outcomes"
import * as DomSessionOutcomes from "../support/DomSession/outcomes"

const {LookAtMessages, Say} = process.env.SESSION === "DomSession" ? DomSessionActions : DomainSessionActions
const {Messages} = process.env.SESSION === "DomSession" ? DomSessionOutcomes : DomainSessionOutcomes

Given("{actor} has said {string}", async function (actor: Actor, message: string) {
  await actor.has(Said(message))
})

When("{actor} looks at the messages", async function (actor: Actor) {
  await actor.attemptsTo(LookAtMessages())
})

When("{actor} says {string}", async function (actor: Actor, message: string) {
  await actor.attemptsTo(Say(message))
})

Then("{actor} should see {string}", async function (actor: Actor, message: string) {
  const messages: string[] = await actor.check(Messages())
  assert(messages.indexOf(message) != -1, `No "${message}" in ${messages}`)
})
