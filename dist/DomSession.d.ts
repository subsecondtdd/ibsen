import { ISession } from "./types";
export default class DomSession implements ISession {
    private readonly actorName;
    private readonly renderApp;
    private $actor;
    $root: HTMLElement;
    constructor(actorName: string, renderApp: ($root: HTMLElement) => void);
    start(): void;
    stop(): void;
}
