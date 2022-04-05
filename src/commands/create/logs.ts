import { LOGS } from "../../util/constants"
import Base from "./base"

export default class Logs extends Base<typeof Logs.flags> {

  static description = "Create a logs monitor"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    this.createMonitor(LOGS)
  }

}
