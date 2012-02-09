# Backpack.js
### A backpack full of UI components for your Backbone.js projects
 
By [@hshoff](http://www.twitter.com/hshoff) & [@daveaugustine](http://www.twitter.com/daveaugustine)

## Work in Progress.

1. Tabs
1. Menus
1. Forms
1. Modals
1. Dialogs
1. Alerts
1. Pagination
1. Infinite Scroll
1. Responsive

## Development

### Cake Build Tools

Cakefile defines the following tasks:

    cake docs                 # Generate annotated source code with Docco
    cake compile              # Compile CoffeeScript source files
    cake smoosh               # Smoosh all the compiled CoffeeScripts
    cake build                # Build /lib from /src. Then creates Backpack-bundle.js & Backpack-bundle.min.js.
    cake watch                # Recompile CoffeeScript source files when modified
    cake test                 # Run tests
    cake test:verbose         # Run tests with verbose flag

### Testing

Backpack tests are written using Jasmine. We use the lovely [jasmine-node](https://github.com/mhevery/jasmine-node). 

Setting up testing is easy. Clone the repo and `cd` into /backpack.js and run `npm install` to install all the dependencies. You can find the list of dependencies in the _package.json_ file.

There are 

You can run `npm test` which will run `jasmine-node --color --coffee ./spec` for you. If you're into the verbose thing you can run `jasmine-node --color --verbose --coffee ./spec` in the command line.