import { FlagInput, ParserOutput } from "@oclif/core/lib/interfaces"
import { Command, Flags } from "@oclif/core"
import fetch from "node-fetch"

// This is needed to get type safety working in derived classes
export type InferredFlagsType<T> = T extends FlagInput<infer F>
  ? F & {
      json: boolean | undefined;
    }
  : any;

export default abstract class Base<T extends typeof Base.flags> extends Command {

  static description = "(don't use this)"

  static flags = {
    trigger: Flags.boolean({
      description: "Will ingest too much data in order to make the monitor trigger (only supported if you kept the default values)",
      required: false,
      default: false
    })
  }

  protected parsedOutput?: ParserOutput<any, any>;

  get processedFlags(): InferredFlagsType<T> {
    return this.parsedOutput?.flags ?? {}
  }

  /*
   * Ingests data via Datadog API every 10 or 30 seconds for exactly three minutes.
   *
   * Ingestion frequency depends on the --trigger flag. Ingestion frequency will be higher
   * if the --trigger flag is used in order to trigger the monitor.
   *
   * Note: --trigger will only work if a monitor was created with simo using the default values
   */
  ingestPerApi(apiEndpoint: string, payload: string): void {
    const frequency: number = this.processedFlags.trigger ? 10_000 : 30_000

    const startTime:number = Date.now()
    const interval = setInterval(() => {
      if (Date.now() - startTime > 180_000) { // run for 3 minutes
        clearInterval(interval)
      }

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "DD-API-KEY": process.env.DD_API_KEY!
        },
        body: payload
      })
    }, frequency)
  }

  /*
   * Fetches data from the Datadog API and does nothing with it. Most likely to increase a monitor's count.
   */
  fetchPerApi(apiEndpoint: string): void {
    const frequency: number = this.processedFlags.trigger ? 10_000 : 30_000

    const startTime:number = Date.now()
    const interval = setInterval(() => {
      if (Date.now() - startTime > 180_000) { // run for 3 minutes
        clearInterval(interval)
      }

      fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "DD-API-KEY": process.env.DD_API_KEY!,
          "DD-APPLICATION-KEY": process.env.DD_APPLICATION_KEY!
        }
      })
    }, frequency)
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
