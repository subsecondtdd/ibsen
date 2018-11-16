import React from "react"

interface IAppProps {
  messages: string[]
}

const App: React.FunctionComponent<IAppProps> = ({messages}) => (
  <div itemScope={true}>
    <ul itemScope={true} itemProp="messages" itemType="http://schema.org/ItemList">
      {messages.map((message, i) =>
        <li key={i} itemScope={true}>
          <span itemType="http://schema.org/Text" itemProp="value">{message}</span>
        </li>
      )}
    </ul>
  </div>
)

export default App
