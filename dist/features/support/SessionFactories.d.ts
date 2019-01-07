import { SessionFactory } from "../../src/types";
import IChatApi from "../src/domain/IChatApi";
import ChatSession from "../src/client/ChatSession";
declare const Home: SessionFactory<IChatApi, ChatSession>;
export { Home };
