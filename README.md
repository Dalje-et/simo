oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g simo
$ simo COMMAND
running command...
$ simo (--version)
simo/0.0.0 darwin-x64 node-v17.5.0
$ simo --help [COMMAND]
USAGE
  $ simo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`simo hello PERSON`](#simo-hello-person)
* [`simo hello world`](#simo-hello-world)
* [`simo help [COMMAND]`](#simo-help-command)
* [`simo plugins`](#simo-plugins)
* [`simo plugins:install PLUGIN...`](#simo-pluginsinstall-plugin)
* [`simo plugins:inspect PLUGIN...`](#simo-pluginsinspect-plugin)
* [`simo plugins:install PLUGIN...`](#simo-pluginsinstall-plugin-1)
* [`simo plugins:link PLUGIN`](#simo-pluginslink-plugin)
* [`simo plugins:uninstall PLUGIN...`](#simo-pluginsuninstall-plugin)
* [`simo plugins:uninstall PLUGIN...`](#simo-pluginsuninstall-plugin-1)
* [`simo plugins:uninstall PLUGIN...`](#simo-pluginsuninstall-plugin-2)
* [`simo plugins update`](#simo-plugins-update)

## `simo hello PERSON`

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
