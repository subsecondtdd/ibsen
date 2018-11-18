import ChatApp from "../src/domain/ChatApp"

export function Said(message: string) {
  return (actorName: string) => (chatApp: ChatApp) => chatApp.say(actorName, message)
}
