export const LOGS = "logs"
export const EVENTS = "events"
export const AUDIT = "audit"
export const ERROR = "error"
export const CI = "ci"
export const RUM = "rum"
export const TRACE = "trace"
export const COMPOSITE = "composite"

// "used in type option in POST /monitors payload"
export const TYPES:{ [key: string]: string } = {
  [LOGS]: "log alert",
  events: "event-v2 alert",
  audit: "audit alert",
  error: "error-tracking alert",
  ci: "ci-pipeline alert",
  rum: "rum alert",
  trace: "trace-analytics alert",
  composite: "composite"
}

export const SIMPLE_QUERIES:{ [key: string]: string } = {
  logs: "logs(\"*\").index(\"*\").rollup(\"count\").last(\"5m\") ",
  events: "events(\"*\").rollup(\"count\").last(\"5m\") ",
  audit: "audits(\"\\\"api/v1/usage\\\"\").rollup(\"count\").last(\"5m\") ",
  error: "error-tracking-rum(\"*\").rollup(\"count\").last(\"5m\") ",
  ci: "ci-pipelines(\"ci_level:pipeline\").rollup(\"count\").last(\"5m\") ",
  rum: "rum(\"-@view.name:\\\"/shipping-error\\\" -@view.name:\\\"/inventory-error\\\"\").rollup(\"count\").last(\"5m\") ",
  trace: "trace-analytics(\"*\").rollup(\"count\").last(\"5m\") "
}

export const MULTI_QUERIES:{ [key: string]: string } = {
  logs: "logs(\"*\").index(\"*\").rollup(\"count\").by(\"service\").last(\"5m\") ",
  events: "events(\"*\").rollup(\"count\").by(\"service\").last(\"5m\") ",
  audit: "audits(\"\\\"api/v1/usage\\\"\").rollup(\"count\").by(\"@http.url_details.path\").last(\"5m\") ",
  error: "error-tracking-rum(\"*\").rollup(\"count\").by(\"@issue.id\").last(\"5m\") ",
  ci: "ci-pipelines(\"ci_level:pipeline\").rollup(\"count\").by(\"@ci.pipeline.name\").last(\"5m\") ",
  rum: "rum(\"-@view.name:\\\"/shipping-error\\\" -@view.name:\\\"/inventory-error\\\"\").rollup(\"count\").by(\"@view.name\").last(\"5m\") ",
  trace: "trace-analytics(\"*\").rollup(\"count\").by(\"resource_name\").last(\"5m\") "
}

export const ABOVE_THRESHOLD = 25

export const ABOVE_THRESHOLD_PAYLOAD = {
  critical: ABOVE_THRESHOLD,
  period: {
    digit: 5,
    name: "5 minute average",
    no_data_timeframe: 10,
    seconds: 300,
    tense: "last",
    text: "5 minutes",
    unit: "minutes",
    value: "last_5m"
  },
  timeAggregator: "avg",
  comparison: ">"
}

export const BELOW_THRESHOLD = 5

export const BELOW_THRESHOLD_PAYLOAD = {
  critical: BELOW_THRESHOLD,
  period: {
    digit: 5,
    name: "5 minute average",
    no_data_timeframe: 10,
    seconds: 300,
    tense: "last",
    text: "5 minutes",
    unit: "minutes",
    value: "last_5m"
  },
  timeAggregator: "avg",
  comparison: "<"
}
