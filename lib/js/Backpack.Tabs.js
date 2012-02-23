(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Tabs = (function(_super) {

    __extends(Tabs, _super);

    function Tabs() {
      Tabs.__super__.constructor.apply(this, arguments);
    }

    Tabs.prototype.tagName = 'ul';

    Tabs.prototype.initialize = function() {
      Tabs.__super__.initialize.call(this);
      return this.addClass('backpack-tabs');
    };

    return Tabs;

  })(Backpack.Component);

}).call(this);
