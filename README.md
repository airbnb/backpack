    ______            _                     _      _        |
    | ___ \          | |                   | |    (_)       |  A pack of UI components for Backbone projects.
    | |_/ / __ _  ___| | ___ __   __ _  ___| | __  _ ___    |  Grab your backpack and enjoy the Views. 
    | ___ \/ _` |/ __| |/ / '_ \ / _` |/ __| |/ / | / __|   |
    | |_/ / (_| | (__|   <| |_) | (_| | (__|   < _| \__ \   |
    \____/ \__,_|\___|_|\_\ .__/ \__,_|\___|_|\_(_) |___/   |
                          | |                    _/ |       |
                          |_|                   |__/        |
  


### Visit the [Backpack.js User Guide](http://airbnb.github.com/backpack/)
  
  


## Quick Start

1. `git clone git@github.com:airbnb/backpack.js.git`
1. `cd backpack.js && open example/index.html`
  

----------------------------
  

## Hack on Backpack

### Quick Start

1. `git clone git@github.com:airbnb/backpack.js.git`
1. `cd backpack.js && npm install`
  
  
### Cake Build Tools

The Cakefile defines the following tasks:

    cake compile        # Compile CoffeeScript source files
    cake build          # Creates /lib_path/Backpack-bundle.js & /lib_path/Backpack-bundle.min.js & /lib_path/js/*.js
    cake test           # Opens Jasmine SpecRunner. Watches BackpackSpec-Bundle.js for changes
    cake docs           # Generate annotated source code with Docco
    cake watch          # Recompile CoffeeScript source files when modified to Backpack-bundle.js
    cake watch:js       # Recompile CoffeeScript source files when modified to individual .js files
  
  
### Testing

Backpack.js tests are written using [jasmine](http://pivotal.github.com/jasmine/) with [sinon.js](https://github.com/cjohansen/Sinon.JS) and [jasmine-sinon](https://github.com/froots/jasmine-sinon).

You can run the test suite with `cake test`.
  
  
  
