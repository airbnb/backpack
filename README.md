    ______            _                     _      _        |
    | ___ \          | |                   | |    (_)       |  A backpack full of UI components for your Backbone.js
    | |_/ / __ _  ___| | ___ __   __ _  ___| | __  _ ___    |  projects. Grab your backpack and enjoy the Views. 
    | ___ \/ _` |/ __| |/ / '_ \ / _` |/ __| |/ / | / __|   |
    | |_/ / (_| | (__|   <| |_) | (_| | (__|   < _| \__ \   |
    \____/ \__,_|\___|_|\_\ .__/ \__,_|\___|_|\_(_) |___/   |
                          | |                    _/ |       |
                          |_|                   |__/        |

## Intro by Example

### Make a Menu

    var menu = new Backpack.Menu({ 
                                  parent:   '#docs',
                                  show:     true,
                                  addClass: 'press',
                                  before:   "<h2>Backpack.Menu</h2>",
                                  after:    "<br/><br/><br/>",
                                  add: 
                                    [
                                      {
                                        content: "Menu Item 1", 
                                        events: { 
                                          'mouseenter': function() {
                                            this.addClass('hover');},
                                          'mouseleave': function() {
                                            this.removeClass('hover');
                                          } 
                                      }
                                      }, 
                                      {
                                        content: "Menu Item 2",
                                        events: {
                                          'mouseleave': function() {
                                            console.log('mouseleave');}
                                      }                        
                                      },
                                      {
                                        content: "Menu Item 3"            
                                      }
                                    ]
                                });

### Make Tabs

    var tabs = new Backpack.Tabs({
                                  parent: '#docs',
                                  show: true,
                                  before: '<h2>Backpack.Tabs</h2>',
                                  add: 
                                    [
                                      {
                                        content: 'Tab 1',
                                        tabContent: 
                                          '<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
                                          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
                                          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                                          'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
                                          'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
                                          'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>'
                                      },
                                      {
                                        content: 'Tab 2',
                                        tabContent: 
                                          '<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
                                          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
                                          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                                          'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
                                          'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
                                          'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>'
                                      },
                                      {
                                        content: 'Tab 3',
                                        tabContent: 
                                          '<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
                                          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
                                          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                                          'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
                                          'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
                                          'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>'
                                      }
                                    ]
                                });


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