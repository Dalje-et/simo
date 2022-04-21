import tracer from "../../util/tracer" // has to be at the top

import { CliUx } from "@oclif/core"

import Base from "./base"

export default class Traces extends Base<typeof Traces.flags> {

  static description = "Ingest Traces"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    CliUx.ux.action.start("Starting to ingest traces, please make sure agent is running.. 🔮 ")

    const frequency: number = this.processedFlags.trigger ? 10_000 : 30_000
    const startTime:number = Date.now()
    const interval = setInterval(async () => {
      if (Date.now() - startTime > 240_000) { // run for 4 minutes
        clearInterval(interval)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const shipping = await tracer.trace("shipping", { resource: "shipping" }, async () => {
          const test = "test"
          return test
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const inventory = await tracer.trace("inventory", { resource: "inventory" }, async () => {
          const test = "test"
          return test
        })
      }
    }, frequency)
  }

}
