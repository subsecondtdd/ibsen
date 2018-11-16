import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import ChatApp from "./ChatApp"

export default function($root: HTMLElement, chatApp: ChatApp) {
  ReactDOM.render(<App messages={chatApp.getMessages()}/>, $root)
}

