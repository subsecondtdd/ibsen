import { SessionFactory } from "../../src/ibsen"
import IChatApi from "../src/domain/IChatApi"
import IChatSession from "../src/client/IChatSession"
import ApiChatSession from "../src/client/ApiChatSession"
import DomChatSession from "./DomChatSession"

const Home: SessionFactory<IChatApi, IChatSession> = {
  ApiSession: (actorName: string, api: IChatApi) => new ApiChatSession(actorName, api),
  DomSession: (actorName: string, api: IChatApi, $root: HTMLElement) => new DomChatSession(actorName, $root)
}

export { Home }
