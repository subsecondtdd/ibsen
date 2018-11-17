import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import IChatApi from "./IChatApi"

export default function($root: HTMLElement, chatApi: IChatApi) {
  ReactDOM.render(<App chatApi={chatApi}/>, $root)
}

