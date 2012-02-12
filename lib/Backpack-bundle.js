(function() {
  var Backpack, root,
    _this = this,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack = function() {
    return _this;
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.Backbone == null) {
    root.Backbone = typeof Backbone !== "undefined" && Backbone !== null ? Backbone : Backbone = typeof require === "function" ? require("backbone") : void 0;
  }

  if (root.Backpack == null) {
    root.Backpack = Backpack != null ? Backpack : Backpack = {};
  }

  Backpack.VERSION = '0.0.1';

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.initialize = function() {
      console.log('new Backpack.Menu');
      return this;
    };

    return Menu;

  })(Backbone.View);

}).call(this);
