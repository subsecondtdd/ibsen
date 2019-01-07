import ChatSession from "./ChatSession";
import IChatApi from "../domain/IChatApi";
export default class ApiChatSession implements ChatSession {
    private actorName;
    private api;
    constructor(actorName: string, api: IChatApi);
    say(message: string): Promise<void>;
    getMessages(): Promise<string[]>;
    lookAtMessages(): void;
}
