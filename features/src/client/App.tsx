import React, { ReactNode } from "react"
import IChatApi from "../domain/IChatApi"

interface IAppProps {
  chatApi: IChatApi
}

interface IState {
  messages: string[]
}

class App extends React.Component<IAppProps, IState> {
  state = {
    messages: [] as string[],
  }

  async componentDidMount() {
    try {
      const messages = await this.props.chatApi.getMessages()
      this.setState({messages});
    } catch (e) {
      console.error(e)
    }
  }

  render(): ReactNode {
    return <div itemScope={true}>
      <MessageList messages={this.state.messages}/>
    </div>
  }
}

const MessageList: React.FunctionComponent<{ messages: string[] }> = ({messages}) => (
  <ul itemScope={true} itemProp="messages" itemType="http://schema.org/ItemList">
    {messages.map((message, i) =>
      <li key={i} itemScope={true}>
        <span itemType="http://schema.org/Text" itemProp="value">{message}</span>
      </li>
    )}
  </ul>
)

export default App
