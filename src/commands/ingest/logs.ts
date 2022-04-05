import { Command, CliUx } from "@oclif/core"

export default class Logs extends Command {

  static description = "Ingest Logs"

  async run(): Promise<void> {
    CliUx.ux.action.start("Start ingesting logs")
    // Example logs
    //  logger.log("info", "Hello simple log!")
    // logger.info("Hello log with metas", { color: "blue" })
  }

}
