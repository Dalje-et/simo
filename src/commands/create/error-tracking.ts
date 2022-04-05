import { ERROR } from "../../util/constants"
import Base from "./base"

export default class ErrorTracking extends Base<typeof ErrorTracking.flags> {

  static description = "Create an error tracking monitor"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    this.createMonitor(ERROR)
  }

}
