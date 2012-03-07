(function() {
  "use strict";
  var Backpack, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Backpack = root.Backpack = {
    VERSION: '0.0.1',
    Prefix: 'backpack',
    Emitter: _.clone(Backbone.Events)
  };

}).call(this);
