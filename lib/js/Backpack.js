(function() {
  var Backpack, root,
    _this = this;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.Backbone == null) {
    root.Backbone = typeof Backbone !== "undefined" && Backbone !== null ? Backbone : Backbone = typeof require === "function" ? require("backbone") : void 0;
  }

  Backpack = function() {
    var version;
    version = '0.0.1';
    return {
      VERSION: version
    };
  };

  if (root.Backpack == null) root.Backpack = Backpack;

}).call(this);
