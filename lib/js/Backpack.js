(function() {
  "use strict";
  var Backpack, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Backpack = root.Backpack = {
    VERSION: '0.0.1',
    Prefix: 'backpack'
  };

  _.extend(Backpack, Backbone.Events);

}).call(this);
