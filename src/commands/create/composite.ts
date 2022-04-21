import { ERROR } from "../../util/constants"
import Base from "./base"

export default class ErrorTracking extends Base<typeof ErrorTracking.flags> {

  static description = "Create a composite monitor"

  static flags = {
    ...Base.flags
  };

  async run(): Promise<void> {
    this.createMonitor(ERROR)
  }

}
