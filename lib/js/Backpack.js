(function() {
  var Backpack, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.Backbone == null) {
    root.Backbone = typeof require === "function" ? require("backbone") : void 0;
  }

  Backpack = {
    VERSION: '0.0.1'
  };

  root.Backpack = Backpack;

}).call(this);
