simo
=================

Your favourite tool to **si**mulate **mo**nitor behaviour

# Introduction

`simo` is a light-weight CLI tool that has mainly two responsibilities: **create** monitors and **ingest** data into your Datadog org to eventually cause the created monitors to trigger certain behaviour. Its purpose is to introduce e2e tests with on Monitors within production. For optimal results, `simo` should be used in your personal org.

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
  - don't forget to run `source ~/.bashrc` after editing the file in order to reload

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
- run 

# Documentation
<!-- commands -->
* [`simo create`](#simo-create)
  * [`simo create ci`](#simo-create-ci)
* [`simo ingest`](#simo-ingest)
  * [`simo ingest ci`](#simo-ingest-ci)

## `simo create`

Say hello

```
USAGE
  $ simo hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Dalj-et/simo/blob/v0.0.0/dist/commands/hello/index.ts)_

## `simo hello world`

Say hello world

```
USAGE
  $ simo hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `simo help [COMMAND]`

Display help for simo.

```
USAGE
  $ simo help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for simo.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `simo plugins`

List installed plugins.

```
USAGE
  $ simo plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ simo plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `simo plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ simo plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ simo plugins add

EXAMPLES
  $ simo plugins:install myplugin 

  $ simo plugins:install https://github.com/someuser/someplugin

  $ simo plugins:install someuser/someplugin
```

## `simo plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ simo plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ simo plugins:inspect myplugin
```

## `simo plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ simo plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ simo plugins add

EXAMPLES
  $ simo plugins:install myplugin 

  $ simo plugins:install https://github.com/someuser/someplugin

  $ simo plugins:install someuser/someplugin
```

## `simo plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ simo plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ simo plugins:link myplugin
```

## `simo plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ simo plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ simo plugins unlink
  $ simo plugins remove
```

## `simo plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ simo plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ simo plugins unlink
  $ simo plugins remove
```

## `simo plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ simo plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ simo plugins unlink
  $ simo plugins remove
```

## `simo plugins update`

Update installed plugins.

```
USAGE
  $ simo plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
