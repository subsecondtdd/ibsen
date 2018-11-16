import ISession from "./ISession"

type Interaction<T> = {[key: string]: (session: ISession) => Promise<T>}

export default Interaction
