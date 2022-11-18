import { FlagInput, ParserOutput } from "@oclif/core/lib/interfaces"
import { Command, Flags } from "@oclif/core"
// import * as notifier from "node-notifier"
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
      description: "Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)",
      required: false,
      default: false
    })
  }

  protected parsedOutput?: ParserOutput<any, any>;

  get processedFlags(): InferredFlagsType<T> {
    return this.parsedOutput?.flags ?? {}
  }

  // static nc = new notifier.NotificationCenter()

  /*
   * Sends a notification at the end of an ingestion to ask the user how to proceed.
   *
   * The user can either decide to continue the ingestion or stop.
   *
   * Returns "continue" if the users wants to resume ingestions or "stop" if the user wants to halt ingestion,
   * dismiss the notification, or let the notification time out.
  async notify(type: string): Promise<string> {
    let res = ""

    nc.notify({
      title: "simo",
      message: `Done ingesting ${type}. How do you want to proceed?`,
      sound: "Funk",
      // case sensitive
      closeLabel: "Stop ingesting",
      actions: "Continue",
      timeout: 6
    }, function (err, _, metadata) {
      if (err) throw err
      res = metadata && metadata.activationValue === "Continue" ? "continue" : "stop"
    })

    console.log(1)
    await this.sleep(10_000)
    console.log(2)

    return res
  }

  sleep(ms: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
  */

  /*
   * Schedules ingestion of data via Datadog API every 10 or 30 seconds for exactly three minutes.
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
      if (Date.now() - startTime > 360_000) { // run for 6 minutes
        clearInterval(interval)
      }

      this.postPerApi(apiEndpoint, payload)
    }, frequency)
  }

  /*
   * Ingests data via Datadog API every 10 or 30 seconds for exactly three minutes without scheduling anything.
   *
   * This method leaves the scheduling aspect to the caller and solely fetches the specified API endpoint with
   * HTTP POST and passes on the specified payload.
   *
   */
  postPerApi(apiEndpoint: string, payload: string): void {
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DD-API-KEY": process.env.DD_API_KEY!
      },
      body: payload
    })
  }

  /*
   * Fetches data from the Datadog API and does nothing with it. Most likely to increase a monitor's count.
   */
  fetchPerApi(apiEndpoint: string): void {
    const frequency: number = this.processedFlags.trigger ? 10_000 : 30_000

    const startTime:number = Date.now()
    const interval = setInterval(() => {
      if (Date.now() - startTime > 360_000) { // run for 3 minutes
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
