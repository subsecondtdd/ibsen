import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import ChatSession from "./ChatSession"

export default function ($root: HTMLElement, chatSession: ChatSession) {
  ReactDOM.render(<App chatSession={chatSession}/>, $root)
}

