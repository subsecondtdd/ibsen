import ChatApp from "../src/domain/ChatApp"

export function Said(message: string) {
  return (chatApp: ChatApp, actorName: string) => chatApp.say(actorName, message)
}
