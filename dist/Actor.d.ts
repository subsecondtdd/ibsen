import { Action, Outcome } from "./types";
/**
 * An Actor is used to interact with the system in When and Then steps.
 * (For Given steps, interact with the system using this.context).
 */
export default class Actor<Api = {}, InitialSession = {}> {
    private readonly memory;
    private readonly name;
    private session;
    constructor(name: string, session: InitialSession);
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
     * @param action a function that interacts with the system via a Session
     */
    attemptsTo<Session, NextSession>(action: Action<Session, NextSession>): Promise<void>;
    /**
     * Use this in Then steps to pull data out of the system (e.g. using a view)
     *
     * @param outcome a function that interacts with the system via a Session
     */
    check<Session, Result>(outcome: Outcome<Session, Result>): Promise<Result>;
}
