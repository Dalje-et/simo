import { EVENTS } from "../../util/constants"
import Base from "./base"

export default class Events extends Base<typeof Events.flags> {

  static description = "Create an events monitor"

  static flags = {
    ...Base.flags
  };

  async run(): Promise<void> {
    this.createMonitor(EVENTS)
  }

}
