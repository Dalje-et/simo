import { Command, CliUx } from "@oclif/core"
import fetch from "node-fetch"

export default class Delete extends Command {

  static description = "Delete a monitor"

  static args = [
    {
      name: "monitorId",
      description: "The id of the monitor that shall be deleted.",
      required: true
    }
  ]

  deleteMonitor(monitorId: string): Promise<any> {
    return fetch(`https://api.datadoghq.com/api/v1/monitor/${monitorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "DD-API-KEY": process.env.DD_API_KEY!,
        "DD-APPLICATION-KEY": process.env.DD_APPLICATION_KEY!
      },
    }).then((response: any) => response.body)
  }

  async run(): Promise<void> {
    const { args } = await this.parse(Delete)

    CliUx.ux.action.start("Deleting monitor 🔮 ")
    const response = await this.deleteMonitor(args.monitorId)
    if (response.errors) {
      CliUx.ux.action.stop(`❌ ${JSON.stringify(response)}`)
    } else {
      CliUx.ux.action.stop(`Done ✅ Deleted monitor with ID ${args.monitorId}`)
    }
  }

}
