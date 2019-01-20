import IChatSession from "../src/client/IChatSession"
import { Action, Context, Outcome } from "../../src/ibsen"
import ChatApp from "../src/domain/ChatApp"

//// Contexts ////

export function ActorHasSaid(actorName: string, message: string): Context<ChatApp> {
  return (chatApp: ChatApp) => chatApp.say(actorName, message)
}

//// Actions ////

export function LookAtMessages(): Action<IChatSession> {
  return async (session: IChatSession) => session.lookAtMessages()
}

export function Say(message: string): Action<IChatSession> {
  return async (session: IChatSession) => session.say(message)
}

//// Outcomes ////

export function Messages(): Outcome<IChatSession, string[]> {
  return async (session: IChatSession) => session.getMessages()
}
