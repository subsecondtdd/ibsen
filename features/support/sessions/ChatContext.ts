import IContext from "../../../src/IContext"
import ChatApp from "../../src/ChatApp"

export default interface ChatContext extends IContext {
  chatApp: ChatApp,
}
