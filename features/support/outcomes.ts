import getMicrodata from "../../src/getMicrodata"
import DomSession from "../../src/DomSession"
import DomainSession from "../../src/DomainSession"
import IChatApi from "../src/domain/IChatApi"

export function Messages() {
  return {
    DomainSession: async ({api}: DomainSession<IChatApi>): Promise<string[]> => {
      return api.getMessages()
    },
    DomSession: async ({$root}: DomSession): Promise<string[]> => {
      const microdata = getMicrodata($root)
      return microdata.messages.map((m: any) => m.value)
    }
  }
}
