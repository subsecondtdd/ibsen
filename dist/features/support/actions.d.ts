import ChatSession from "../src/client/ChatSession";
import { Action } from "../../src/types";
export declare function LookAtMessages(): Action<ChatSession>;
export declare function Say(message: string): Action<ChatSession>;
