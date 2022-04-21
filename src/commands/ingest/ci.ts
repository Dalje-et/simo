import { CliUx } from "@oclif/core"
import { execFile } from "node:child_process"

import Base from "./base"

export default class CIPipeline extends Base<typeof CIPipeline.flags> {

  static description = "Ingest CI Pipeline Events"

  static flags = {
    ...Base.flags
  };

  async run(): Promise<void> {
    CliUx.ux.action.start("Starting to CI Pipeline events.. 🔮 ")
    // TODO replace with ENV VAR
    const repo = "/Users/daljeet.sandu/datadog/simo"

    const frequency: number = this.processedFlags.trigger ? 10_000 : 30_000
    const startTime:number = Date.now()
    const interval = setInterval(async () => {
      if (Date.now() - startTime > 240_000) { // run for 4 minutes
        clearInterval(interval)
        return
      }

      // sudo chmod -R 777 /yourProjectDirectoryName
      execFile(repo + "/src/util/trigger-ci.sh", (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }

        console.log(stdout)

        if (stderr) {
          console.log(stderr)
        }
      })
    }, frequency)
  }

  getStartHour(): string {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}`
  }

}
