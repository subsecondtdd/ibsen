import ChatSession from "../src/client/ChatSession";
import { Action, Context, Outcome } from "../../src/types";
import ChatApp from "../src/domain/ChatApp";
export declare function ActorHasSaid(actorName: string, message: string): Context<ChatApp>;
export declare function LookAtMessages(): Action<ChatSession>;
export declare function Say(message: string): Action<ChatSession>;
export declare function Messages(): Outcome<ChatSession, string[]>;
