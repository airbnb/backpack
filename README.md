    ______            _                     _      _
    | ___ \          | |                   | |    (_)
    | |_/ / __ _  ___| | ___ __   __ _  ___| | __  _ ___
    | ___ \/ _` |/ __| |/ / '_ \ / _` |/ __| |/ / | / __|
    | |_/ / (_| | (__|   <| |_) | (_| | (__|   < _| \__ \
    \____/ \__,_|\___|_|\_\ .__/ \__,_|\___|_|\_(_) |___/
                          | |                    _/ |
                          |_|                   |__/

### A backpack full of UI components for your Backbone.js projects
 
By [@hshoff](http://www.twitter.com/hshoff) & [@daveaugustine](http://www.twitter.com/daveaugustine)

## Work in Progress.

- Tabs
- Menus
- Forms
- Modals
- Dialogs
- Alerts
- Pagination
- Infinite Scroll
- Responsive

## Development

### Quick Start

1. `git clone git@github.com:airbnb/backpack.js.git`
1. `cd backpack.js`
1. `npm install`

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

Backpack.js tests are written using [Mocha](https://github.com/visionmedia/mocha) with [expect.js](https://github.com/LearnBoost/expect.js).

You can run the test suite with `cake test` and edit the options you pass to mocha in `./test/mocha.opts`.