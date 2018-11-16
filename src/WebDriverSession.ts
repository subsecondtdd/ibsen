import webdriverio from "webdriverio"
import Actor from "./Actor"
import getMicrodata from "./getMicrodata"
import ISession from "./ISession"

/**
 * The Dom Actor interacts with the Dom. It also has a reference to the codebreaker, so it can query for its
 * version. This is used to wait for synchronisation before interacting with the DOM.
 */
export default class WebDriverSession implements ISession {
  private readonly baseUrl: string
  private browser: WebdriverIO.Client<void>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async start() {
    const options = {
      chrome: {
        desiredCapabilities: {
          browserName: "chrome"
        }
      }
    }
    this.browser = webdriverio.multiremote(options)
    await this.browser.init().url(this.baseUrl)
  }

  async stop() {
    try {
      await this.browser.close()
    } catch (err) {
      // We always get an error, but the browser seems to close(?)
    }
  }

  invokeAction(activity: (...args: any[]) => void): void {
    activity(this.browser)
  }

  async getTestView() {
    const result = await this.browser.executeAsync(function (getMicrodataSource, done) {
      eval(getMicrodataSource)
      done(getMicrodata(document.body))
    }, getMicrodata.toString())
    // const microdata = result.chrome.value
    // return microdata
    return result
  }
}

