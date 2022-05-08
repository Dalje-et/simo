import { Command, Flags, CliUx } from "@oclif/core"
import fetch from "node-fetch"

import { COMPOSITE, TYPES } from "../../util/constants"

export default class Composite extends Command {

  static description = "Create a composite monitor"

  static args = [
    {
      name: "query",
      description: "The query of the composite monitor.",
      required: true
    }
  ]

  static flags = {
    /* on_missing_data: Flags.string({
      description: "How the monitor should react if no incoming data detected.",
      required: false,
      default: "default",
      options: ["show_no_data", "show_and_notify_no_data", "resolve", "default"]
    }), */
    name: Flags.string({
      description: "How the monitor should be titled.",
      required: false,
      default: ""
    })
  }

  postMonitor(payload: string): Promise<any> {
    return fetch("https://api.datadoghq.com/api/v1/monitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DD-API-KEY": process.env.DD_API_KEY!,
        "DD-APPLICATION-KEY": process.env.DD_APPLICATION_KEY!
      },
      body: payload
    }).then((response:any) => response.json())
  }

  buildCompositeName(name: string, query: string/* , on_missing_data: string */):string {
    if (name === "") {
      return `[composite][${query}]` // [nodata:${on_missing_data}]
    }

    return name
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Composite)

    const payload: any = {
      name: this.buildCompositeName(flags.name, args.query/* , flags.on_missing_data */),
      type: TYPES[COMPOSITE],
      query: args.query,
      tags: ["simo"],
      options: {
        notify_audit: false,
        // on_missing_data: flags.on_missing_data,
      }
    }

    CliUx.ux.action.start("Creating a composite monitor 🔮 ")
    const response = await this.postMonitor(JSON.stringify(payload))
    if (response.errors) {
      CliUx.ux.action.stop(`❌ ${JSON.stringify(response)}`)
    } else {
      CliUx.ux.action.stop(`Done ✅ Created monitor https://app.datadoghq.com/monitors/${response.id}`)
    }
  }

}
