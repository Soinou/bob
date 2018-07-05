# Bob (the builder)

**Warning** Totally in development, totally not usable, mostly for my personal use, so I won't do support on this

Builder wrapping webpack and webpack-serve in a more friendly way

## Usage:

`bob [OPTIONS]`

Options:

```
    --watch Enables the watch mode, rebuilding if a file changed

    --production Enables the production mode, making some optimizations (Minifying and stuff)

    --config Changes the config file used (Defaults to bobfile.toml)

    --serve Enables the webpack-serve mode, doing what you expect it to do
```

## Configuration file example:

```toml
# What to target (Web in this example)
target = "web"

# Entry file (Relative)
entry = "client/index.ts"

# Namespace of the project (Aliased to the packages directory)
namespace = "@web"

# Loaders to use (These are already included and configured like I want them to)
loaders = ["css", "stylus", "typescript"]

# List of module aliases
[alias]
joi = "joi-browser"

[plugins.clean]
# paths = ["some/path"] # Paths that need to be cleaned up by the clean plugin (In addition to public/assets)
# exclude = ["some", "file"] # Files ignored by the cleanup (In all directories)

# Html plugin parameters
[plugins.html]
title = "Web" # Title (- Dev will be added when in serve)

# webpack-serve configuration (Only for web targets)
[serve]
# port = 8080 # Bind port (Default 8080)
host = "0.0.0.0" # Bind host (Default 127.0.0.1)
# content = ["some/directory"] # Directories to serve as static content (In addition to public)

# webpack-hot-client
[serve.hot]
# port = 8081 # Bind port (Default 8081)
serverHost = "0.0.0.0" # Specific server-side host
clientHost = "localhost" # Specific client-side host (Where the websocket should make requests)
# host = "127.0.0.1" # Host on both sides (Default 127.0.0.1)
```

**Note:** Some things cannot be configured (Convention over configuration and all of this), such as:

-   Where the sources are: Uses the `packages` directory relative to where you execute the command
-   Custom aliases: Sets the namespace as an alias (For example if you use `@web` as a namespace like above, you will have this namespace aliased to the `packages` directory)
-   And probably other stuff I can't remember right now
