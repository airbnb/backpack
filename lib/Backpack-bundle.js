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
      this.slug = __bind(this.slug, this);
      this.removeClass = __bind(this.removeClass, this);
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
      this.setup = __bind(this.setup, this);
      Component.__super__.constructor.apply(this, arguments);
    }

    Component.prototype.tagName = 'div';

    Component.prototype.className = 'backpack-component';

    Component.prototype.options = {
      name: '',
      content: '',
      parent: 'body',
      hide: true
    };

    Component.prototype.initialize = function() {
      this.options = _.extend({}, this.defaults, this.options);
      this.setup();
      return this;
    };

    Component.prototype.setup = function() {
      var content, hide, name, parent, _ref;
      _ref = this.options, hide = _ref.hide, name = _ref.name, content = _ref.content, parent = _ref.parent;
      if (hide) this.hide();
      this.setParent(parent);
      this.setContent(content);
      this.addClass(this.slug(name));
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
      this.$el.html(this.content);
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

    Component.prototype.removeClass = function(klass) {
      if (klass == null) return;
      this.$el.removeClass(klass);
      return this;
    };

    Component.prototype.slug = function(string) {
      if (string == null) return;
      return string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "");
    };

    return Component;

  })(Backbone.View);

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

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.add = __bind(this.add, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.initialize = function() {
      Menu.__super__.initialize.call(this);
      this.addClass('backpack-menu');
      return this;
    };

    Menu.prototype.add = function(content, events, name) {
      var menuItem;
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

    MenuItem.prototype.initialize = function() {
      var content, events, name, _ref;
      this.addClass('backpack-menu-item');
      _ref = this.options, content = _ref.content, events = _ref.events, name = _ref.name;
      this.setContent(content, events);
      this.delegateEvents(this.events);
      this.addClass(this.slug(name));
      return this;
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this.content);
      return this;
    };

    MenuItem.prototype.setContent = function(content, events) {
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

}).call(this);
