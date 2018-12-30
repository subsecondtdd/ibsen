import { ApiSession, Interaction } from "../../../src/ibsen"
import IChatApi from "../../src/domain/IChatApi"

export function Messages(): Interaction<string[]> {
  return ({api}: ApiSession<IChatApi>): Promise<string[]> => {
    return api.getMessages()
  }
}
