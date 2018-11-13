import World from "../../src/World"
import { After, Before, setWorldConstructor } from "cucumber"

class MyWorld extends World {
}

Before(async function () {
  await this.start()
})

After(async function () {
  await this.stop()
})

setWorldConstructor(MyWorld)
