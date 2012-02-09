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

## Usage

### Cake Build Tools

The Cakefile defines the following tasks:

  - `cake docs` - Generate annotated source code with [Docco](https://github.com/jashkenas/docco)
  - `cake compile` - Compile CoffeeScript source files
  - `cake smoosh` - Smoosh all the compiled CoffeeScripts. Creates Backpack-bundle.js & Backpack-bundle.min.js.
  - `cake smoosh:verbose` - Smoosh all the compiled CoffeeScript source files & print out Smoosh output. Creates Backpack-bundle.js & Backpack-bundle.min.js.
  - `cake build` - Compiles and smooshes CoffeeScript source files. Creates Backpack-bundle.js & Backpack-bundle.min.js.
  - `cake build:verbose` - Compiles and smooshes CoffeScript source files with smoosh analyses Creates Backpack-bundle.js & Backpack-bundle.min.js.
  - `cake watch` - Recompile CoffeeScript source files when modified
  - `cake ci` - Recompile CoffeeScript source files when modified. Creates Backpack-bundle.js & Backpack-bundle.min.js.

### Testing

Backpack tests are written using Jasmine. We use the lovely [jasmine-node](https://github.com/mhevery/jasmine-node). 

Setting up testing is easy. Clone the repo and `cd` into /backpack.js and run `npm install` to install all the dependencies. You can find the list of dependencies in the _package.json_ file.

You can run `npm test` which will run `jasmine-node --color --coffee ./spec` for you. If you're into the verbose thing you can run `jasmine-node --color --verbose --coffee ./spec` in the command line.