(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Overlay = (function(_super) {

    __extends(Overlay, _super);

    function Overlay() {
      this.setColor = __bind(this.setColor, this);
      this.setLock = __bind(this.setLock, this);
      this.close = __bind(this.close, this);
      this.unlock = __bind(this.unlock, this);
      this.render = __bind(this.render, this);
      Overlay.__super__.constructor.apply(this, arguments);
    }

    Overlay.prototype.events = {
      'click': 'unlock'
    };

    Overlay.prototype.defaults = {
      'lockOverlay': false,
      'color': 'rgba(0,0,0,0.7)'
    };

    Overlay.prototype.initialize = function() {
      var color, lockOverlay, _ref;
      Overlay.__super__.initialize.call(this);
      this.addClass('backpack-overlay');
      _ref = this.options, lockOverlay = _ref.lockOverlay, color = _ref.color;
      this.setLock(lockOverlay);
      this.setColor(color);
      return this;
    };

    Overlay.prototype.render = function() {
      this.parent.prepend(this.el);
      return this;
    };

    Overlay.prototype.unlock = function() {
      if (!this.lockOverlay) this.close();
      return this;
    };

    Overlay.prototype.close = function() {
      Overlay.__super__.close.call(this);
      this.trigger('overlay-close');
      return this;
    };

    Overlay.prototype.setLock = function(lockOverlay) {
      this.lockOverlay = lockOverlay;
      return this;
    };

    Overlay.prototype.setColor = function(color) {
      this.el.style.backgroundColor = color;
      return this;
    };

    return Overlay;

  })(Backpack.Component);

  Backpack.Dialog = (function(_super) {

    __extends(Dialog, _super);

    function Dialog() {
      this.addButton = __bind(this.addButton, this);
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.setOverlay = __bind(this.setOverlay, this);
      this.setClosable = __bind(this.setClosable, this);
      Dialog.__super__.constructor.apply(this, arguments);
    }

    Dialog.prototype.events = {
      'click .close': 'close'
    };

    Dialog.prototype.defaults = {
      'lockOverlay': false,
      'showOverlay': false,
      'closable': true
    };

    Dialog.prototype.initialize = function() {
      Dialog.__super__.initialize.call(this);
      this.addClass('backpack-dialog');
      if (this.options.showOverlay) this.setOverlay();
      if (this.options.closable) this.setClosable();
      return this;
    };

    Dialog.prototype.setClosable = function() {
      this.$el.prepend("<span class='close'>×</span>");
      return this;
    };

    Dialog.prototype.setOverlay = function() {
      this.overlay = new Backpack.Overlay({
        lockOverlay: this.options.lockOverlay
      });
      this.overlay.on('overlay-close', this.close);
      return this;
    };

    Dialog.prototype.show = function() {
      var _ref;
      Dialog.__super__.show.call(this);
      if ((_ref = this.overlay) != null) _ref.render().show();
      return this;
    };

    Dialog.prototype.hide = function() {
      var _ref;
      Dialog.__super__.hide.call(this);
      if ((_ref = this.overlay) != null) _ref.hide();
      return this;
    };

    Dialog.prototype.close = function() {
      var _ref;
      Dialog.__super__.close.call(this);
      if ((_ref = this.overlay) != null) _ref.remove();
      return this;
    };

    Dialog.prototype.addButton = function(button) {
      var container;
      if (button == null) return;
      container = this.make("div", {
        "class": "backpack-dialog-button-container"
      });
      $(container).append(button.setParent(container).render().show());
      button.on('button-close', this.close);
      this.$el.append(container);
      return this;
    };

    return Dialog;

  })(Backpack.Component);

  Backpack.Modal = (function(_super) {

    __extends(Modal, _super);

    function Modal() {
      Modal.__super__.constructor.apply(this, arguments);
    }

    Modal.prototype.defaults = {
      'lockOverlay': true,
      'showOverlay': true,
      'closable': true
    };

    Modal.prototype.initialize = function() {
      Modal.__super__.initialize.call(this, this.defaults);
      this.addClass('backpack-modal');
      return this;
    };

    return Modal;

  })(Backpack.Dialog);

}).call(this);
