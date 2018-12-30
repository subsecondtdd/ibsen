import IChatApi from "../../src/domain/IChatApi"
import { ApiSession, Interaction } from "../../../src/ibsen"

export function LookAtMessages(): Interaction<void> {
  return (session: ApiSession<IChatApi>) => undefined
}

export function Say(message: string) {
  return async ({actorName, api}: ApiSession<IChatApi>) => {
    await api.say(actorName, message)
  }
}
