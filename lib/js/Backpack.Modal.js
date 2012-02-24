(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Overlay = (function(_super) {

    __extends(Overlay, _super);

    function Overlay() {
      this.color = __bind(this.color, this);
      this.lockOverlay = __bind(this.lockOverlay, this);
      this.close = __bind(this.close, this);
      this.unlock = __bind(this.unlock, this);
      this.content = __bind(this.content, this);
      this.render = __bind(this.render, this);
      Overlay.__super__.constructor.apply(this, arguments);
    }

    Overlay.prototype.template = "<div class='backpack-overlay-outer'>\n  <div class='backpack-overlay-inner'>\n    <div class='backpack-overlay-container'></div>\n  </div>\n</div>";

    Overlay.prototype.events = {
      'click': 'unlock',
      'click .backpack-overlay-container': function(e) {
        return e.stopPropagation();
      }
    };

    Overlay.prototype.defaults = {
      lockOverlay: false,
      color: 'rgba(0,0,0,0.7)'
    };

    Overlay.prototype.initialize = function() {
      this.addClass('backpack-overlay');
      this.append(this.template);
      Overlay.__super__.initialize.call(this);
      return this.$parent.addClass('overlay');
    };

    Overlay.prototype.render = function() {
      this.$('.backpack-overlay-container').html(this._content);
      this.$parent.prepend(this.el);
      return this;
    };

    Overlay.prototype.content = function(content) {
      if (content == null) return this;
      this._content = this.setContent(content);
      return this;
    };

    Overlay.prototype.unlock = function() {
      if (!this._lockOverlay) this.close();
      return this;
    };

    Overlay.prototype.close = function() {
      Overlay.__super__.close.call(this);
      this.trigger('overlay-close');
      return this;
    };

    Overlay.prototype.lockOverlay = function(lockOverlay) {
      this._lockOverlay = !!lockOverlay;
      return this;
    };

    Overlay.prototype.color = function(color) {
      this.el.style.backgroundColor = color;
      return this;
    };

    return Overlay;

  })(Backpack.Component);

  Backpack.Modal = (function(_super) {

    __extends(Modal, _super);

    function Modal() {
      this.newOverlay = __bind(this.newOverlay, this);
      this.closable = __bind(this.closable, this);
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      Modal.__super__.constructor.apply(this, arguments);
    }

    Modal.prototype.events = {
      'click .close': 'close'
    };

    Modal.prototype.defaults = {
      'lockOverlay': true,
      'closable': true
    };

    Modal.prototype.initialize = function() {
      Modal.__super__.initialize.call(this);
      this.addClass('backpack-modal');
      this.newOverlay();
      return this;
    };

    Modal.prototype.show = function() {
      var _ref;
      Modal.__super__.show.call(this);
      if ((_ref = this.overlay) != null) _ref.show();
      return this;
    };

    Modal.prototype.hide = function() {
      var _ref;
      Modal.__super__.hide.call(this);
      if ((_ref = this.overlay) != null) _ref.hide();
      return this;
    };

    Modal.prototype.close = function() {
      var _ref;
      Modal.__super__.close.call(this);
      if ((_ref = this.overlay) != null) _ref.remove();
      return this;
    };

    Modal.prototype.closable = function() {
      if (!arguments[0]) return this;
      this.$el.prepend("<span class='close'>&times;</span>");
      return this;
    };

    Modal.prototype.newOverlay = function() {
      this.overlay = new Backpack.Overlay({
        lockOverlay: this.options.lockOverlay,
        content: this.el,
        color: this.options.color,
        show: true
      });
      this.overlay.on('overlay-close', this.close);
      return this;
    };

    return Modal;

  })(Backpack.Component);

}).call(this);
