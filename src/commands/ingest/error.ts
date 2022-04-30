import { CliUx } from "@oclif/core"

import { startServer } from "../../util/server/server"
import Base from "./base"

export default class ErrorTracking extends Base<typeof ErrorTracking.flags> {

  static description = "Ingest Error Tracking Events"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    CliUx.ux.action.start("Starting to ingest error tracking events.. 🔮 ")

    startServer()

    // eslint-disable-next-line unicorn/prefer-module
    const puppeteer = require("puppeteer")

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const frequency: number = this.processedFlags.trigger ? 10_000 : 30_000
    const startTime: number = Date.now()
    const interval = setInterval(async () => {
      if (Date.now() - startTime > 240_000) { // run for 4 minutes
        clearInterval(interval)
        await browser.close()
        return
      }

      await page.goto("http://localhost:3000/shipping-error")
      await page.goto("http://localhost:3000/inventory-error")

      // have to clear all cookies as otherwise the RUM SDK won't account each page.goto() as a new session
      // see https://docs.datadoghq.com/real_user_monitoring/browser/troubleshooting/#rum-cookies
      const client = await page.target().createCDPSession()
      await await client.send("Network.clearBrowserCookies")
    }, frequency)
  }

}
