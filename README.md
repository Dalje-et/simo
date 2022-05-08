simo
=================

**simo** is a light-weight CLI tool that has mainly two responsibilities: **create** monitors and **ingest** data into your Datadog org to eventually cause the created monitors to trigger. Its purpose is to introduce e2e tests on Monitors within production. For optimal results, **simo** should be used in your personal org. 

![RUM Events Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/simo_in_action.mp4)

# How it works

Creation and ingestion are closely tied to each other. In fact, **simo** doesn't allow you to enter arbitrary thresholds during monitor creation. It works on fixed values. The idea is that the values themselves are not interesting for e2e testing, but rather the transitions of monitors. Therefore, by default, users are not able to control the thresholds during monitor creation. Here's how it works:



# Getting Started

Being built in Node.js, **simo** could technically be installed via npm, e.g. via `npm install -g simo`. However, the author of this is incredibly lazy and at this point of time doesn't want this tool to be publically available. Therefore, in order to use simo, **you need to fork this repository in your own Github account** and work on that fork.

## Prerequisites

Let's make this as quick and easy as possible for you. Make sure you have the following things ready (~10mins): 

- a Github account that you can use in your terminal
- have [Node.js and nvm](https://github.com/nvm-sh/nvm#installing-and-updating) installed (you can check with `node -v` and `npm -v`)
- a personal Datadog org
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
  - lastly, don't forget to run `source ~/.bashrc` after editing the file in order to save and load the changes.

## Installation

Follow these steps to set up **simo** locally (~3mins):

- Clone your forked Github **simo** repository
- Choose the location of this directory carefully. After cloning the repo, open your terminal and navigate to the clone repo. Make sure you are within the repo and then run `pwd`. The output is likely going to look like `/path/to/directory/simo`
- Copy the output of the `pwd` command and edit your `~/.bashrc` file again, add the following lines to the bottom of the file:
```
export DD_API_KEY="your-api-key-here"
export DD_APPLICATION_KEY="your-application-key-here"
export SIMO_BASE_PATH="output-of-pwd-here"

alias simo="output-of-pwd-here"/bin/dev
```

Don't forget to run `source ~/.bashrc` after editing the file in order to save and load the changes.

**Making CI Pipeline Events work (~3mins)**
In order to make CI Pipeline Events work you need to instrument your forked GitHub repository's Actions. For this, follow the tutorial [here](https://app.datadoghq.com/ci/setup/pipeline?provider=github).

**Making RUM Events work (~2mins)**
To make sure that RUM events are sent to the correct place, you need to create a RUM Application in your Datadog organisation. Visit [RUM](https://app.datadoghq.com/rum/list) in-app and select "New Application", enter `simo` as an application name,  and hit "Create". Now,  make sure you choose `CDN Sync` as your instrumentation type. You should then see a code snippet on the left side of your screen. Edit the file over at `src/util/server/env.js` and fill it out with the corresponding applicationId and client token that you see in the code snippet. Save the file afterwards.

# Tags

Each monitor created by **simo** is by default tagged with `simo`. If you want to add more default tags, modify the `generatePayload` method in `/src/util/payload-generator.ts` accordingly.

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

Creates a CI Pipeline monitor.

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

**Ingestion Frequency and Triggering**
`simo ingest` has only one flag: `--trigger`. This flag will increase the frequency of data being ingested, cross the default set thresholds, and therefore trigger the monitors.

Explain how it usually works


### `simo ingest audit-logs`

Ingests Audit Logs into your org by calling the endpoints `v1/usage/logs-by-retention` and `v1/usage/hosts`.

![Audit Logs Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/audit-logs.png)

```
USAGE
  $ simo ingest audit-logs [--trigger]

FLAGS
  --trigger  Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

### `simo ingest ci`

Ingests CI Pipeline events into your org by automatically triggering builds in your fork of this repository. Running this command will run the [trigger-ci.sh file](src/util/trigger-ci.sh). This script adds a file called `allgood.txt` and commits and pushes it. Afterwards, it removes the file again from the repository, and pushes the changes again. 

The repository has two Github Actions configured that run after each push:

- File existence check: checks if a file called `allgood.txt` exists. If said file is missing, the build fails.
- Echo some stuff: prints some random stuff during the build process (honestly is just here to have another pipeline so that we can build multi-alerts)

Putting it all together, `simo ingest ci` adds and removes a file, pushes the changes after each change, and the Github Actions CI of **simo** succeeds / fails depending on that. The reason for that was to have a bit more flexibility when creating monitors (group by pipeline name, group by build status etc). The result of running this command can be seen below:

![CI Pipeline Events Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/ci.png)

```
USAGE
  $ simo ingest ci [--trigger]

FLAGS
  --trigger  Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

### `simo ingest errors`

Ingests Error Tracking events into your org by running a lightweight local web server and simulate page vists with Cypress. On each page load an error is generated using the [RUM SDK](https://docs.datadoghq.com/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually):

```
  DD_RUM.onReady(function() {
    DD_RUM.addError(new Error('Shipping error!'));
  })
```

![Error Tracking Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/error-tracking.png)
 
```
USAGE
  $ simo ingest errors [--trigger]

FLAGS
  --trigger Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

### `simo ingest events`

Events are ingested into your org using the official [API](https://docs.datadoghq.com/api/latest/events/#post-an-event). The payload used for ingestion is:

```
[
  {
    text: "This event is generated by simo",
    title: "Investigating shipping information",
    alert_type: "info",
    tags: "service:shipping"
  },
  {
    text: "This event is generated by simo",
    title: "Checking current inventory",
    alert_type: "info",
    tags: "service:inventory"
  }
]
```

![Events Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/events.png)
 
```
USAGE
  $ simo ingest events [--trigger]

FLAGS
  --trigger  Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

### `simo ingest logs`

Logs are ingested into your org using the official [API](https://docs.datadoghq.com/api/latest/logs/#send-logs). The payload used for ingestion is:

```
[
  {
    ddsource: "simo",
    ddtags: "simo",
    service: "shipping",
    message: "Investigating shipping information"
  },
  {
    ddsource: "simo",
    ddtags: "simo",
    service: "inventory",
    message: "Checking current inventory"
  }
]
```

![Logs Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/logs.png)
 
```
USAGE
  $ simo ingest logs [--trigger]

FLAGS
  --trigger  Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

### `simo ingest rum`

Ingests RUM events into your org by running a lightweight local web server and simulate page vists with Cypress. On each page load a RUM session is started and a `VIEW` event is created.

![RUM Events Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/rum.png)
 
```
USAGE
  $ simo ingest rum [--trigger]

FLAGS
  --trigger Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

### `simo ingest traces`

Ingests APM traces into your org by running instrumted Node.js code within simo. In order to make this work, an agent has to be running in the same environment as simo.

![Trace Ingestion](https://github.com/Dalje-et/simo/blob/main/static/images/traces.png)
 
```
USAGE
  $ simo ingest traces [--trigger]

FLAGS
  --trigger Will ingest enough data in order to trigger a monitor created by simo (only supported if you kept the default values)
```

<!-- commandsstop -->
