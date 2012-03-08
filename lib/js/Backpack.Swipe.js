(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Swipe = (function(_super) {

    __extends(Swipe, _super);

    function Swipe() {
      this.content = __bind(this.content, this);
      Swipe.__super__.constructor.apply(this, arguments);
    }

    Swipe.prototype.id = 'slider';

    Swipe.prototype.config = {
      'type': 'swipe',
      'renderType': 'append',
      'startSlide': 0,
      'speed': 300,
      'auto': 4000,
      'continuous': true,
      'disableScroll': false,
      'callback': function() {},
      'transitionEnd': function() {}
    };

    Swipe.prototype.initialize = function() {
      Swipe.__super__.initialize.call(this);
      return window.s = new window.Swipe(this.el, this.options);
    };

    Swipe.prototype.content = function(slides) {
      var content, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        content = arguments[_i];
        this.$el.append(content);
      }
      return this;
    };

    return Swipe;

  })(Backpack.Component);

}).call(this);
