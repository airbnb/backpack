(function() {
  var Backpack, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Backpack = root.Backpack = {
    VERSION: '0.0.1'
  };

  Backpack.Component = (function(_super) {

    __extends(Component, _super);

    function Component() {
      this.addClass = __bind(this.addClass, this);
      this.setParent = __bind(this.setParent, this);
      this.setContent = __bind(this.setContent, this);
      this.prepend = __bind(this.prepend, this);
      this.append = __bind(this.append, this);
      this.after = __bind(this.after, this);
      this.before = __bind(this.before, this);
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.render = __bind(this.render, this);
      Component.__super__.constructor.apply(this, arguments);
    }

    Component.prototype.tagName = 'div';

    Component.prototype.className = 'backpack-component';

    Component.prototype.options = {
      name: '',
      content: '',
      parent: 'body'
    };

    Component.prototype.initialize = function() {
      this.hide();
      return this;
    };

    Component.prototype.render = function() {
      this.parent.append(this.el);
      return this;
    };

    Component.prototype.show = function() {
      this.delegateEvents(this.events);
      this.$el.removeClass('hide');
      return this;
    };

    Component.prototype.hide = function() {
      this.$el.addClass('hide');
      this.undelegateEvents();
      return this;
    };

    Component.prototype.close = function() {
      this.hide();
      this.remove();
      return this;
    };

    Component.prototype.before = function(content) {
      if (content == null) return;
      this.setContent(content);
      this.$el.before(content);
      return this;
    };

    Component.prototype.after = function(content) {
      if (content == null) return;
      this.setContent(content);
      this.$el.after(this.content);
      return this;
    };

    Component.prototype.append = function(content) {
      if (content == null) return;
      this.setContent(content);
      this.$el.append(this.content);
      return this;
    };

    Component.prototype.prepend = function(content) {
      if (content == null) return;
      this.setContent(content);
      this.$el.prepend(this.content);
      return this;
    };

    Component.prototype.setContent = function(content) {
      if (content == null) return;
      if (content.el != null) {
        if (content.render != null) {
          this.content = content.render().el;
        } else {
          this.content = content.el;
        }
      } else {
        this.content = content;
      }
      return this;
    };

    Component.prototype.setParent = function(parent) {
      if (parent == null) return;
      this.parent = $(parent);
      return this;
    };

    Component.prototype.addClass = function(klass) {
      if (klass == null) return;
      this.$el.addClass(klass);
      return this;
    };

    return Component;

  })(Backbone.View);

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.add = __bind(this.add, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.initialize = function() {
      var name, parent, _ref;
      _ref = this.options, name = _ref.name, parent = _ref.parent;
      this.addClass('backpack-menu');
      this.setParent(parent);
      this.addClass(name);
      return this;
    };

    Menu.prototype.add = function(content, events, name) {
      var menuItem;
      if (content == null) content = '';
      if (events == null) events = {};
      if (content.el != null) {
        menuItem = content;
      } else {
        menuItem = new Backpack.MenuItem(content, events, name);
      }
      this.$el.append(menuItem.render().el);
      return this;
    };

    return Menu;

  })(Backpack.Component);

  Backpack.MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    function MenuItem() {
      this.setContent = __bind(this.setContent, this);
      this.render = __bind(this.render, this);
      MenuItem.__super__.constructor.apply(this, arguments);
    }

    MenuItem.prototype.tagName = 'li';

    MenuItem.prototype.template = _.template("<a href='<%= href %>'><%= content %></a>");

    MenuItem.prototype.events = {};

    MenuItem.prototype.initialize = function(content, events, name) {
      if (content == null) content = '';
      if (events == null) events = {};
      if (name == null) name = '';
      this.addClass('backpack-menu-item');
      this.setContent(content, events);
      this.delegateEvents(this.events);
      this.addClass(name);
      return this;
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this.content);
      return this;
    };

    MenuItem.prototype.setContent = function(content, events) {
      if (content == null) content = '';
      if (events == null) events = {};
      if (content.el != null) {
        this.content = content.el;
        return this;
      }
      if (_.isString(events)) {
        this.content = this.template({
          href: events,
          content: content
        });
        return this;
      }
      if (_.isFunction(events)) {
        this.events = {
          'click': events
        };
        this.content = this.template({
          href: 'javascript:void(0);',
          content: content
        });
        return this;
      }
      this.events = events;
      this.content = this.template({
        href: 'javascript:void(0);',
        content: content
      });
      return this;
    };

    return MenuItem;

  })(Backpack.Component);

  Backpack.Dialog = (function(_super) {

    __extends(Dialog, _super);

    function Dialog() {
      Dialog.__super__.constructor.apply(this, arguments);
    }

    Dialog.prototype.events = {
      'click': 'close'
    };

    Dialog.prototype.initialize = function() {
      var content, name, parent, _ref;
      Dialog.__super__.initialize.call(this);
      this.addClass('backpack-dialog');
      _ref = this.options, name = _ref.name, parent = _ref.parent, content = _ref.content;
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
      Overlay.__super__.initialize.call(this);
      _ref = this.options, lock = _ref.lock, parent = _ref.parent, color = _ref.color;
      this.addClass('backpack-overlay');
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

    Modal.prototype.events = {
      'click': 'close'
    };

    overlay = new Backpack.Overlay();

    Modal.prototype.initialize = function() {
      Modal.__super__.initialize.call(this);
      this.addClass('backpack-modal');
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
