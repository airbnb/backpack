(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.Backbone == null) {
    root.Backbone = typeof Backbone !== "undefined" && Backbone !== null ? Backbone : Backbone = typeof require === "function" ? require("backbone") : void 0;
  }

  if (root.Backpack == null) {
    root.Backpack = typeof Backpack !== "undefined" && Backpack !== null ? Backpack : Backpack = {};
  }

  Backpack.VERSION = '0.0.1';

}).call(this);
