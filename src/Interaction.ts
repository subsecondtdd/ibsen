import ISession from "./ISession"

type Interaction<T> = {[key: string]: (session: ISession) => T}

export default Interaction
