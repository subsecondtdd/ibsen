import ChatSession from "../src/client/ChatSession";
export declare function LookAtMessages(): (session: ChatSession) => Promise<void>;
export declare function Say(message: string): (session: ChatSession) => Promise<void>;
