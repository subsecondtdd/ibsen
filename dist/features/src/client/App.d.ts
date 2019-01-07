import React, { ReactNode } from "react";
import ChatSession from "./ChatSession";
interface IAppProps {
    chatSession: ChatSession;
}
interface IState {
    messages: string[];
}
declare class App extends React.Component<IAppProps, IState> {
    state: {
        messages: string[];
    };
    componentDidMount(): void;
    render(): ReactNode;
    private loadMessages;
}
export default App;
