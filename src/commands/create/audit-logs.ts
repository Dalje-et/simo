import { AUDIT } from "../../util/constants"
import Base from "./base"

export default class AuditLogs extends Base<typeof AuditLogs.flags> {

  static description = "Create an audit logs monitor"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    this.createMonitor(AUDIT)
  }

}
