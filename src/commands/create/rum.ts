import { RUM } from "../../util/constants"
import Base from "./base"

export default class Rum extends Base<typeof Rum.flags> {

  static description = "Create a rum monitor"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    this.createMonitor(RUM)
  }

}
