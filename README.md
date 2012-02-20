    ______            _                     _      _        |
    | ___ \          | |                   | |    (_)       |   A backpack full of UI components for your Backbone.js projects.
    | |_/ / __ _  ___| | ___ __   __ _  ___| | __  _ ___    |   Grab your backpack and get some nice Views. 
    | ___ \/ _` |/ __| |/ / '_ \ / _` |/ __| |/ / | / __|   |
    | |_/ / (_| | (__|   <| |_) | (_| | (__|   < _| \__ \   |
    \____/ \__,_|\___|_|\_\ .__/ \__,_|\___|_|\_(_) |___/   |
                          | |                    _/ |       |
                          |_|                   |__/        |




## Development

### Quick Start

1. `git clone git@github.com:airbnb/backpack.js.git`
1. `cd backpack.js && npm install`

### Cake Build Tools

The Cakefile defines the following tasks:

    cake compile          # Compile CoffeeScript source files
    cake bundle           # Creates /lib_path/Backpack-bundle.js & /lib_path/js/*.js
    cake build            # Creates /lib_path/Backpack-bundle.js & /lib_path/Backpack-bundle.min.js
    cake watch:js         # Recompile CoffeeScript source files when modified to individual .js files
    cake watch:bundle     # Recompile CoffeeScript source files when modified to Backage-bundle.js
    cake test             # Run tests
    cake docs             # Generate annotated source code with Docco

### Testing

Backpack.js tests are written using [jasmine](http://pivotal.github.com/jasmine/) with [sinon.js](https://github.com/cjohansen/Sinon.JS) and [jasmine-sinon](https://github.com/froots/jasmine-sinon).

You can run the test suite with `cake test`.