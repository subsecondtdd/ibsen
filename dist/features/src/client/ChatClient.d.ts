import IChatApi from "../domain/IChatApi";
export default class ChatClient implements IChatApi {
    private readonly baseurl;
    constructor(baseurl: string);
    say(actorName: string, message: string): Promise<void>;
    getMessages(): Promise<string[]>;
}
