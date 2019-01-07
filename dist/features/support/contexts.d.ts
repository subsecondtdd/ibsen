import ChatApp from "../src/domain/ChatApp";
export declare function ActorHasSaid(actorName: string, message: string): (chatApp: ChatApp) => Promise<void>;
