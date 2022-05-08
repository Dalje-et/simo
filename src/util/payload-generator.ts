import {
  TYPES,
  ABOVE_THRESHOLD,
  ABOVE_THRESHOLD_PAYLOAD,
  BELOW_THRESHOLD,
  BELOW_THRESHOLD_PAYLOAD,
  SIMPLE_QUERIES,
  MULTI_QUERIES,
  COMPOSITE
} from "./constants"

export class PayloadOptions {

  name: string
  type: string
  operator: string
  on_missing_data: string
  multi: boolean

  constructor(name: string, type: string, operator: string, on_missing_data: string, multi: boolean) {
    this.name = name
    this.type = type
    this.operator = operator
    this.on_missing_data = on_missing_data
    this.multi = multi
  }

}

/*
 * Takes the arguments provided by the cli and generates the monitor payload for it.
 */
export default function generatePayload(options: PayloadOptions):any {
  return {
    name: buildName(options),
    type: TYPES[options.type],
    query: buildQuery(options.type, options.operator, options.multi),
    tags: ["simo"],
    options: {
      thresholds: options.operator === "above" ? ABOVE_THRESHOLD_PAYLOAD : BELOW_THRESHOLD_PAYLOAD,
      notify_audit: false,
      restriction_query: null,
      on_missing_data: options.on_missing_data,
    }
  }
}

/*
 * Builds the name of the monitor.
 *
 * Uses the set name if it's not empty, otherwise builds the name based on the options used.
 * The generated name will have the format
 * [{{type}}][multi/simple][{{operator}} threshold][nodata:{{on_misssing_dat}}]
 */
function buildName(options: PayloadOptions):string {
  if (options.name === "") {
    const multi = options.multi ? "multi alert" : "simple alert"
    return `[${options.type}][${multi}][${options.operator} threshold][nodata:${options.on_missing_data}]`
  }

  return options.name
}

/*
 * Composes the query of the monitor.
 *
 * Makes use of predefined queries depending on multi or simple alert.
 * Uses different thresholds depending on the used operator.
 */
function buildQuery(type: string, operator: string, multi:boolean):string {
  if (!multi) {
    return SIMPLE_QUERIES[type] + getOperatorChar(operator) + " " + getThreshold(operator)
  }

  return MULTI_QUERIES[type] + getOperatorChar(operator) + " " + getThreshold(operator)
}

function getOperatorChar(operator: string):string {
  if (operator === "above") {
    return ">"
  }

  return "<"
}

function getThreshold(operator: string):number {
  if (operator === "above") {
    return ABOVE_THRESHOLD
  }

  return BELOW_THRESHOLD
}

