import { DomainSession, Interaction } from "../../../src/ibsen"
import IChatApi from "../../src/domain/IChatApi"

export function Messages(): Interaction<string[]> {
  return ({api}: DomainSession<IChatApi>): Promise<string[]> => {
    return api.getMessages()
  }
}
