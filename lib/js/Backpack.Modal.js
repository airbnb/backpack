(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Backpack.Dialog = (function(_super) {

    __extends(Dialog, _super);

    function Dialog() {
      Dialog.__super__.constructor.apply(this, arguments);
    }

    Dialog.prototype.tagName = 'div';

    Dialog.prototype.events = {
      'click': 'close'
    };

    Dialog.prototype.initialize = function() {
      var content, name, parent, _ref;
      _ref = this.options, name = _ref.name, parent = _ref.parent, content = _ref.content;
      this.addClass('backpack-dialog');
      this.setContent(content);
      this.setParent(parent);
      this.addClass(name);
      return this;
    };

    return Dialog;

  })(Backpack.Component);

  Backpack.Overlay = (function(_super) {

    __extends(Overlay, _super);

    function Overlay() {
      this.setOptions = __bind(this.setOptions, this);
      this.setColor = __bind(this.setColor, this);
      this.setLock = __bind(this.setLock, this);
      this.unlock = __bind(this.unlock, this);
      this.render = __bind(this.render, this);
      Overlay.__super__.constructor.apply(this, arguments);
    }

    Overlay.prototype.tagName = 'div';

    Overlay.prototype.className = 'backpack-overlay hide';

    Overlay.prototype.options = {
      lock: false,
      parent: 'body',
      color: 'rgba(0,0,0,0.7)'
    };

    Overlay.prototype.events = {
      'click': 'unlock'
    };

    Overlay.prototype.initialize = function() {
      var color, lock, parent, _ref;
      _ref = this.options, lock = _ref.lock, parent = _ref.parent, color = _ref.color;
      this.setLock(lock);
      this.setParent(parent);
      this.setColor(color);
      return this;
    };

    Overlay.prototype.render = function() {
      console.log(this.parent, this.options, this.option);
      this.$el.prependTo(this.parent);
      return this;
    };

    Overlay.prototype.unlock = function() {
      if (!this.lock) this.close();
      return this;
    };

    Overlay.prototype.setLock = function(lock) {
      this.lock = lock;
      return this;
    };

    Overlay.prototype.setColor = function(color) {
      this.el.style.backgroundColor = color;
      return this;
    };

    Overlay.prototype.setOptions = function(options) {
      this.setLock(lock);
      return this;
    };

    return Overlay;

  })(Backpack.Component);

  Backpack.Modal = (function(_super) {
    var overlay;

    __extends(Modal, _super);

    function Modal() {
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      Modal.__super__.constructor.apply(this, arguments);
    }

    Modal.prototype.tagName = 'div';

    Modal.prototype.className = 'backpack-modal';

    Modal.prototype.events = {
      'click': 'close'
    };

    overlay = new Backpack.Overlay();

    Modal.prototype.initialize = function() {
      Modal.__super__.initialize.call(this);
      return this;
    };

    Modal.prototype.show = function() {
      Modal.__super__.show.call(this);
      console.log(overlay);
      overlay.setLock(true).render().show();
      return this;
    };

    Modal.prototype.hide = function() {
      Modal.__super__.hide.call(this);
      overlay.hide();
      return this;
    };

    Modal.prototype.close = function() {
      Modal.__super__.close.call(this);
      overlay.remove();
      return this;
    };

    return Modal;

  })(Backpack.Dialog);

}).call(this);
