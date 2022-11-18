import { CliUx } from "@oclif/core"
import fetch from "node-fetch"

import Base from "./base"

export default class Metric extends Base<typeof Metric.flags> {

  static description = "Ingest a single Metric"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    CliUx.ux.action.start("Starting to ingest single metric.. 🔮 ")

    const startTime:number = Date.now()

    const interval = setInterval(() => {
      if (Date.now() - startTime > 360_000) { // run for 6 minutes
        clearInterval(interval)
      }

      const payload = {
        series: [
          {
            metric: "daljeet.count",
            type: 1,
            points: [
              {
                timestamp: Date.now(),
                value: 1
              }
            ]
          }
        ]
      }

      this.postPerApi("https://api.datadoghq.com/api/v2/series", JSON.stringify(payload))
    }, 30_000)
  }

}
