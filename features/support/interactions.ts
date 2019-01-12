import ChatSession from "../src/client/ChatSession"
import { Action, Context, Outcome } from "../../src/ibsen"
import ChatApp from "../src/domain/ChatApp"

//// Contexts ////

export function ActorHasSaid(actorName: string, message: string): Context<ChatApp> {
  return (chatApp: ChatApp) => chatApp.say(actorName, message)
}

//// Actions ////

export function LookAtMessages(): Action<ChatSession> {
  return async (session: ChatSession) => session.lookAtMessages()
}

export function Say(message: string): Action<ChatSession> {
  return async (session: ChatSession) => session.say(message)
}

//// Outcomes ////

export function Messages(): Outcome<ChatSession, string[]> {
  return async (session: ChatSession) => session.getMessages()
}
