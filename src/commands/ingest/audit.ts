import { CliUx } from "@oclif/core"

import Base from "./base"

export default class AuditLogs extends Base<typeof AuditLogs.flags> {

  static description = "Ingest Audit Logs"

  static flags = {
    ...Base.flags,
  };

  async run(): Promise<void> {
    CliUx.ux.action.start("Starting to ingest audit logs.. 🔮 ")

    const currentTimestamp = this.getStartHour()
    this.fetchPerApi(`https://api.datadoghq.com/api/v1/usage/logs-by-retention?start_hr${currentTimestamp}`)
    this.fetchPerApi(`https://api.datadoghq.com/api/v1/usage/hosts?start_hr${currentTimestamp}`)
  }

  getStartHour(): string {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}`
  }

}
