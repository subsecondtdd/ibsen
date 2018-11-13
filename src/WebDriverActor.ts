import webdriverio from "webdriverio"
import BaseActor from "./BaseActor"
import getMicrodata from "./getMicrodata"

/**
 * The Dom Actor interacts with the Dom. It also has a reference to the codebreaker, so it can query for its
 * version. This is used to wait for synchronisation before interacting with the DOM.
 */
export default class WebDriverActor extends BaseActor {
  private readonly baseUrl: string
  private browser: WebdriverIO.Client<void>

  constructor(name: string, baseUrl: string) {
    super(name)
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

  invoke(activity: (...args: any[]) => void): void {
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

