import Base from "./base"

export default class Ci extends Base<typeof Ci.flags> {

  static description = "Create a CI Pipelines monitor"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    // this.createMonitor("ci")
  }

}
