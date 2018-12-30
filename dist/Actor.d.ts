import { Context, Interaction } from "./types";
export default class Actor<Api = {}, Session = {}> {
    private readonly name;
    private readonly api;
    private readonly session;
    constructor(name: string, api: Api, session: Session);
    getName(): string;
    /**
     * Use this in Given steps to set up a context
     *
     * @param context a function that sets up context
     */
    has(context: Context<Api>): Promise<void>;
    /**
     * Use this in When steps to set up a context
     *
     * @param interaction a function that interacts with the system via a {@link ISession}
     */
    attemptsTo(interaction: Interaction<Session, void>): Promise<void>;
    /**
     * Use this in Then steps to pull data out of the system (e.g. using a view)
     *
     * @param interaction a function that interacts with the system via a {@link ISession}
     */
    check<Result>(interaction: Interaction<Session, Result>): Promise<Result>;
}
