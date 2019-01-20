import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import IChatSession from "./IChatSession"

export default function ($root: HTMLElement, chatSession: IChatSession) {
  ReactDOM.render(<App chatSession={chatSession}/>, $root)
}

