import IDomainContext from "../../../src/IDomainContext"
import ChatApp from "../../src/ChatApp"

export default interface ChatContext extends IDomainContext {
  chatApp: ChatApp,
}
