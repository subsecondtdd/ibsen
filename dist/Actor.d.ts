import { Context, Interaction, ISession } from "./types";
export default class Actor<Api = {}> {
    private readonly name;
    private readonly api;
    private readonly session;
    constructor(name: string, api: Api, session: ISession);
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
    attemptsTo(interaction: Interaction<void>): Promise<void>;
    /**
     * Use this in Then steps to pull data out of the system (e.g. using a view)
     *
     * @param interaction a function that interacts with the system via a {@link ISession}
     */
    check<T>(interaction: Interaction<T>): Promise<T>;
}
