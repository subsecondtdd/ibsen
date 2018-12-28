import { DomSession, Interaction } from "../../../src/ibsen"
import getMicrodata from "../../../src/getMicrodata"

export function Messages(): Interaction<string[]> {
  return async ({$root}: DomSession): Promise<string[]> => {
    const microdata = getMicrodata($root)
    return microdata.messages.map((m: any) => m.value)
  }
}
