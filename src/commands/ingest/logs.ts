import { CliUx } from "@oclif/core"

import Base from "./base"

export default class Logs extends Base<typeof Logs.flags> {

  static description = "Ingest Logs"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    CliUx.ux.action.start("Starting to ingest logs.. 🔮 ")

    const payload = [
      {
        ddsource: "simo",
        ddtags: "simo",
        service: "shipping",
        message: "Investigating shipping information"
      },
      {
        ddsource: "simo",
        ddtags: "simo",
        service: "inventory",
        message: "Checking current inventory"
      },
    ]

    this.ingestPerApi("https://http-intake.logs.datadoghq.com/api/v2/logs", JSON.stringify(payload))
  }

}
