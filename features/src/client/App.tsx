import React, { ReactNode, useState } from "react"
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

  componentDidMount(): void {
    this.loadMessages()
  }

  render(): ReactNode {
    return <div itemScope={true}>
      <MessageForm chatApi={this.props.chatApi}/>
      <MessageList messages={this.state.messages}/>
    </div>
  }

  private async loadMessages() {
    try {
      const messages = await this.props.chatApi.getMessages()
      this.setState({messages})
    } catch (e) {
      console.error(e)
    }
  }
}

const MessageForm: React.FunctionComponent<IAppProps> = ({chatApi}) => {
  const [value, setValue] = useState("")

  async function submitMessage(value: string) {
    await chatApi.say("Sean", value)
  }

  return <form onSubmit={e => {
    e.preventDefault()
    submitMessage(value)
    setValue("")
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
