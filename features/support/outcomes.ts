import ChatSession from "../src/client/ChatSession"

export function Messages() {
  return async (session: ChatSession) => session.getMessages()
}
