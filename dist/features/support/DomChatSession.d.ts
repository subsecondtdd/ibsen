import ChatSession from "../src/client/ChatSession";
export default class DomChatSession implements ChatSession {
    private actorName;
    private $root;
    constructor(actorName: string, $root: HTMLElement);
    say(message: string): void;
    getMessages(): Promise<string[]>;
    lookAtMessages(): Promise<void>;
}
