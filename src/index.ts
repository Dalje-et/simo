const { createLogger, format, transports } = require("winston");
export { run } from "@oclif/core"

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: "../logs/logs.log" })
  ]
})

module.exports = logger
