import ChatApp from "../src/domain/ChatApp"

export function ActorHasSaid(actorName: string, message: string) {
  return (chatApp: ChatApp) => chatApp.say(actorName, message)
}
