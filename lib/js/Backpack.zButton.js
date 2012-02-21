(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Button = (function(_super) {

    __extends(Button, _super);

    function Button() {
      Button.__super__.constructor.apply(this, arguments);
    }

    Button.prototype.tagName = 'button';

    Button.prototype.events = {
      'click': function() {
        return this.trigger('button-close');
      }
    };

    Button.prototype.initialize = function() {
      Button.__super__.initialize.call(this);
      this.addClass('backpack-button');
      return this;
    };

    return Button;

  })(Backpack.Component);

}).call(this);
