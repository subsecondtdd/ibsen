import IChatApi from "../../src/domain/IChatApi"
import { DomainSession, Interaction } from "../../../src/ibsen"

export function LookAtMessages(): Interaction<void> {
  return (session: DomainSession<IChatApi>) => undefined
}

export function Say(message: string) {
  return async ({actorName, api}: DomainSession<IChatApi>) => {
    await api.say(actorName, message)
  }
}
