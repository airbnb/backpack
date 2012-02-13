(function() {
  var Backbone, Backpack, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.Backbone == null) {
    root.Backbone = typeof require === "function" ? require("backbone") : void 0;
  }

  Backpack = {
    VERSION: '0.0.1'
  };

  root.Backpack = Backpack;

  _ref = typeof require === "function" ? require('./Backpack') : void 0, Backpack = _ref.Backpack, Backbone = _ref.Backbone;

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.render = __bind(this.render, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.initialize = function() {
      console.log('new Menu');
      return this.items = {};
    };

    Menu.prototype.render = function() {
      return this;
    };

    return Menu;

  })(Backbone.View);

}).call(this);
