import { TRACE } from "../../util/constants"
import Base from "./base"

export default class TraceAnalytics extends Base<typeof TraceAnalytics.flags> {

  static description = "Create a trace analytics monitor"

  static flags = {
    ...Base.flags
  };

  async run(): Promise<void> {
    this.createMonitor(TRACE)
  }

}
