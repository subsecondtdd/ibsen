import ChatSession from "../src/client/ChatSession"

export function LookAtMessages() {
  return async (session: ChatSession) => session.lookAtMessages()
}

export function Say(message: string) {
  return async (session: ChatSession) => session.say(message)
}
