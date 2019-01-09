import { SessionFactory } from "../../src/types"
import IChatApi from "../src/domain/IChatApi"
import ChatSession from "../src/client/ChatSession"
import ApiChatSession from "../src/client/ApiChatSession"
import DomChatSession from "./DomChatSession"

const Home: SessionFactory<IChatApi, ChatSession> = {
  ApiSession: (actorName: string, api: IChatApi) => new ApiChatSession(actorName, api),
  DomSession: (actorName: string, $root: HTMLElement, api: IChatApi) => new DomChatSession(actorName, $root)
}

export { Home }
