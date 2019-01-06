import { Interaction } from "./types";
/**
 * An Actor is used to interact with the system in When and Then steps.
 * (For Given steps, interact with the system using this.context).
 */
export default class Actor<Api = {}, Session = {}> {
    private readonly name;
    private readonly api;
    private readonly session;
    private readonly memory;
    constructor(name: string, api: Api, session: Session);
    getName(): string;
    /**
     * Remember something
     *
     * @param key the name of the thing to remember
     * @param value what to remember
     */
    remember(key: any, value: any): void;
    /**
     * Recall something previously remembered
     *
     * @param key the name of the thing to recall
     * @return the value that was recalled
     * @throws Error if nothing can be recalled.
     */
    recall<T>(key: any): T;
    /**
     * Use this in When steps to set up a context
     *
     * @param interaction a function that interacts with the system via a Session
     * @param rememberKey an optional key to remember the result of the interaction
     */
    attemptsTo<Result>(interaction: Interaction<Session, Result>, rememberKey?: any): Promise<void>;
    /**
     * Use this in Then steps to pull data out of the system (e.g. using a view)
     *
     * @param interaction a function that interacts with the system via a Session
     */
    check<Result>(interaction: Interaction<Session, Result>): Promise<Result>;
}
