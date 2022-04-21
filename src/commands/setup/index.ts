import { Command, CliUx } from "@oclif/core"

export default class Setup extends Command {

  static description = "Sets up your repository"

  async run(): Promise<void> {
    this.log("Starting setup process..")

    CliUx.ux.action.start("Something something")
    CliUx.ux.action.stop("Something something")

    // RUM
    // repository for rum
    // setup rum application
  }

}
