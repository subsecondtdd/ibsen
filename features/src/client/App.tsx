import React, { ReactNode, useState } from "react"
import ChatSession from "./ChatSession"

interface IAppProps {
  chatSession: ChatSession
}

interface IState {
  messages: string[]
}

class App extends React.Component<IAppProps, IState> {
  state = {
    messages: [] as string[],
  }

  componentDidMount(): void {
    this.loadMessages()
  }

  render(): ReactNode {
    return <div itemScope={true}>
      <MessageForm chatSession={this.props.chatSession}/>
      <MessageList messages={this.state.messages}/>
    </div>
  }

  private async loadMessages() {
    try {
      const messages = await this.props.chatSession.getMessages()
      this.setState({messages})
    } catch (e) {
      console.error(e)
    }
  }
}

const MessageForm: React.FunctionComponent<IAppProps> = ({chatSession}) => {
  const [value, setValue] = useState("")

  async function submitMessage(value: string) {
    await chatSession.say(value)
  }

  return <form onSubmit={async e => {
    e.preventDefault()
    try {
      await submitMessage(value)
      setValue("")
    } catch (e) {
      console.error(e)
    }
  }}>
    <input value={value} onChange={e => setValue(e.target.value)}/>
  </form>
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
