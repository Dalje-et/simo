import { FlagInput, ParserOutput } from "@oclif/core/lib/interfaces"
import { Command, Flags, CliUx } from "@oclif/core"
import fetch from "node-fetch"

import generatePayload from "../../util/payload-generator"

// This is needed to get type safety working in derived classes
export type InferredFlagsType<T> = T extends FlagInput<infer F>
  ? F & {
      json: boolean | undefined;
    }
  : any;

export default abstract class Base<T extends typeof Base.flags> extends Command {

  static description = "(don't use this)"

  static flags = {
    multi: Flags.boolean({
      description: "Whether or not the monitor is broken down on different groups.",
      required: false,
      default: false
    }),
    operator: Flags.string({
      description: "Operator that shall be used for the threshold.",
      required: false,
      default: "above",
      options: ["above", "below"],
    }),
    on_missing_data: Flags.string({
      description: "How the monitor should react if no incoming data detected.",
      required: false,
      default: "default",
      options: ["show_no_data", "show_and_notify_no_data", "resolve", "default"]
    }),
    name: Flags.string({
      description: "How the monitor should be titled.",
      required: false,
      default: ""
    })
  }

  protected parsedOutput?: ParserOutput<any, any>;

  get processedFlags(): InferredFlagsType<T> {
    return this.parsedOutput?.flags ?? {}
  }

  postMonitor(payload:string): Promise<any> {
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

  async createMonitor(type:string):Promise<any> {
    const payload = generatePayload({
      name: this.processedFlags.name,
      type: type,
      operator: this.processedFlags.operator,
      on_missing_data: this.processedFlags.on_missing_data,
      multi: this.processedFlags.multi
    })

    CliUx.ux.action.start(`Creating a ${type} monitor 🔮 `)
    const response = await this.postMonitor(JSON.stringify(payload))
    if (response.errors) {
      CliUx.ux.action.stop(`❌ ${JSON.stringify(response)}`)
    } else {
      CliUx.ux.action.stop(`Done ✅ Created monitor https://app.datadoghq.com/monitors/${response.id}`)
    }
  }

  async init(): Promise<void> {
    this.parsedOutput = await this.parse(this.ctor)

    if (!process.env.DD_API_KEY) {
      this.error("No value for DD_API_KEY found. Please declare this env variable first.")
    }

    if (!process.env.DD_APPLICATION_KEY) {
      this.error("No value for DD_APPLICATION_KEY found. Please declare this env variable first.")
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async catch(error: any):Promise<any> {
    // add any custom logic to handle errors from the command
    // or simply return the parent class error handling
    return super.catch(error)
  }

}
