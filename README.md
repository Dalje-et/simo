simo
=================

Your favourite tool to **si**mulate **mo**nitor behaviour

# Introduction

`simo` is a light-weight CLI tool that has mainly two responsibilities: **create** monitors and **ingest** data into your Datadog org to eventually cause the created monitors to trigger certain behaviour. Its purpose is to introduce e2e tests with on Monitors within production. For optimal results, `simo` should be used in your personal org.

# How it works

TODO: Explain creation and ingestion with diagram

# Getting Started

Being built in Node.js, `simo` could technically be installed via npm, e.g. via `npm install -g simo`. However, the author of this is incredibly lazy and at this point of time doesn't want this tool to be publically available. Therefore, in order to use `simo`, **you need to fork this repository in your own Github account** and work on that fork.

## Prerequisites

Let's make this as quick and easy as possible for you. Make sure you have the following things ready: 

- a Github account (duh)
- have [Node.js and nvm](https://github.com/nvm-sh/nvm#installing-and-updating) installed (you can check with `node -v` and `npm -v`)
- a personal Datdog org
- a locally running Datadog agent
  -  visit the integration page, select agents, and select your OS (e.g. [OSX](https://app.datadoghq.com/account/settings#agent/mac))
  -  follow the installation instructions on the page
  -  for OSX users, it's useful to add these aliases at the bottom of the file `~/.bashrc` or `~/.bash_profile` (create either one of the file if none exists):
  ```
    alias agentstart="launchctl start com.datadoghq.agent"
    alias agentstop="launchctl stop com.datadoghq.agent"
    alias agentstatus="datadog-agent status"
    alias agentconfig="cat /opt/datadog-agent/etc/datadog.yaml"
  ```
  - adjust the agent config to enable apm (search for `apm_config:` and check that it says `enabled: true` below that) and restart the agent (you can control the agent with the aliases above)
  - lastly, don't forget to run `source ~/.bashrc` after editing the file in order to reload

## Installation

Follow these steps to set up `simo` locally:

- Clone your forked Github `simo` repository
- Choose the location of this directory carefully. After cloning the repo, open your terminal and navigate to the clone repo. Make sure you are within the repo and then run `pwd`. The output is likely going to look like `/path/to/directory/simo`
- Copy the output of the `pwd` command and edit your `~/.bashrc` file again, add the following lines to the bottom of the file:
```
export DD_API_KEY="your-api-key-here"
export DD_APPLICATION_KEY="your-application-key-here"
export SIMO_BASE_PATH="output-of-pwd-here"

alias simo="output-of-pwd-here"/bin/dev
```

# Tags

Each monitor created by `simo` is by default tagged with `simo`. If you want to add more default tags, modify the `generatePayload` method in `/src/util/payload-generator.ts` accordingly.

# Documentation
<!-- commands -->
* [`simo create`](#simo-create)
  * [`simo create audit-logs`](#simo-create-audit-logs)
  * [`simo create ci`](#simo-create-ci)
  * [`simo create error-tracking`](#simo-create-error-tracking)
  * [`simo create events`](#simo-create-events)
  * [`simo create logs`](#simo-create-logs)
  * [`simo create rum`](#simo-create-rum)
  * [`simo create trace-analytics`](#simo-create-trace-analytics)
* [`simo ingest`](#simo-ingest)
  * [`simo ingest audit-logs`](#simo-ingest-audit-logs)
  * [`simo ingest ci`](#simo-ingest-ci)
  * [`simo ingest error-tracking`](#simo-ingest-error-tracking)
  * [`simo ingest events`](#simo-ingest-events)
  * [`simo ingest logs`](#simo-ingest-logs)
  * [`simo ingest rum`](#simo-ingest-rum)
  * [`simo ingest trace-analytics`](#simo-ingest-trace-analytics)

## `simo create`

This command group is responsible for the creation of monitors. It needs to be followed by a monitor type, namely one of [`audit`, `ci`, `error`, `events`, `logs`, `rum`, `trace-analytics`]. No other arguments or flags are required. Mostly all commands support the same flags, however, they are all optional. 

The default naming convention of a created monitor is: 

```
[{{type}}][(multi|simple) alert][(above|below) threshold][{{nodata:on_missing_data_value}}]
```

E.g., a simple-alert log monitor created with `simo create logs` will be titled: 

```
[logs][simple alert][above threshold][nodata:default]
```

Created monitors will use certain default values for thresholds. These default values are **not** arbitrary and are chosen to faciliate ingestion. Read more about it in the [ingestion command](#simo-ingest) documentation. For the moment, all created monitors use `count` queries.

### `simo create audit-logs`

Creates an audit logs monitor.

```
USAGE
  $ simo create audit [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

### `simo create ci`

Creates a CI Visibility monitor.

```
USAGE
  $ simo create ci [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

### `simo create error-tracking`

Creates an error-tracking monitor.

```
USAGE
  $ simo create error [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

### `simo create events`

Creates an event monitor.

```
USAGE
  $ simo create event [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

### `simo create logs`

Creates a logs monitor.

```
USAGE
  $ simo create logs [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

### `simo create rum`

Creates a RUM monitor.

```
USAGE
  $ simo create rum [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

### `simo create trace-analytics`

Creates an APM Trace Analytics monitor.

```
USAGE
  $ simo create trace-analytics [--multi] [--operator above|below] [--on_missing_data
    show_no_data|show_and_notify_no_data|resolve|default] [--name <value>]

FLAGS
  --multi                     Whether or not the monitor is broken down on different groups.
  --name=<value>              How the monitor should be titled.
  --on_missing_data=<option>  [default: default] How the monitor should react if no incoming data detected.
                              <options: show_no_data|show_and_notify_no_data|resolve|default>
  --operator=<option>         [default: above] Operator that shall be used for the threshold.
                              <options: above|below>
```

## `simo ingest`

This command group is responsible for the ingestion of data. It needs to be followed by a monitor type, namely one of [`audit-logs`, `ci`, `errors`, `events`, `logs`, `rum`, `traces`]. Running this command will ingest the specific data needed to make previously created monitors of the chosen monitor type evaluate. No additional arguments or flags are required for this command.

The ingestion adheres to the default threshold values that are set when creating monitors with `simo create`. Running `simo ingest` will keep monitors in the `OK` status.

`simo ingest` has only one flag: `--trigger`. This flag will increase the frequency of data being ingested, cross the default set thresholds, and therefore trigger the monitors.

### `simo ingest audit-logs`

Ingests Audit Logs to your instance by calling the endpoints `v1/usage/logs-by-retention` and `v1/usage/hosts`.

![Audit Logs Example](https://github.com/Dalje-et/simo/blob/main/static/images/audit-logs.png)

```
USAGE
  $ simo ingest audit-logs [--trigger]

FLAGS
  --trigger  Will ingest enough data in order to trigger the monitor (only supported if you kept the default values)
```

<!-- commandsstop -->
