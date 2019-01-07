import IChatApi from "./IChatApi";
export default class ChatApp implements IChatApi {
    private readonly messages;
    say(actorName: string, message: string): Promise<void>;
    getMessages(): Promise<string[]>;
}
