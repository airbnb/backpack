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
      this.bump = __bind(this.bump, this);
      this.removeClass = __bind(this.removeClass, this);
      this.addClass = __bind(this.addClass, this);
      this["class"] = __bind(this["class"], this);
      this.parent = __bind(this.parent, this);
      this.content = __bind(this.content, this);
      this.setContent = __bind(this.setContent, this);
      this.prepend = __bind(this.prepend, this);
      this.append = __bind(this.append, this);
      this.after = __bind(this.after, this);
      this.before = __bind(this.before, this);
      this.remove = __bind(this.remove, this);
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.render = __bind(this.render, this);
      Component.__super__.constructor.apply(this, arguments);
    }

    Component.prototype.tagName = 'div';

    Component.prototype.className = 'backpack-component';

    Component.prototype.options = {
      'parent': 'body'
    };

    Component.prototype.initialize = function() {
      var args, func, _ref, _ref2, _ref3, _results;
      this.options = _.extend({}, this.defaults, this.options);
      _ref = this.options;
      _results = [];
      for (func in _ref) {
        args = _ref[func];
        if (!_.isArray(args)) {
          if ((_ref2 = this[func]) != null) _ref2.call(this, args);
        } else {
          if ((_ref3 = this[func]) != null) _ref3.apply(this, args);
        }
        _results.push(null);
      }
      return _results;
    };

    Component.prototype.render = function() {
      this.$parent.append(this.el);
      return this;
    };

    Component.prototype.show = function() {
      this.render();
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

    Component.prototype.remove = function() {
      this.undelegateEvents();
      Component.__super__.remove.call(this);
      return this;
    };

    Component.prototype.before = function(content) {
      if (content == null) return this;
      content = this.setContent(content);
      this.$el.before(content);
      return this;
    };

    Component.prototype.after = function(content) {
      if (content == null) return this;
      content = this.setContent(content);
      this.$el.after(content);
      return this;
    };

    Component.prototype.append = function(content) {
      if (content == null) return this;
      content = this.setContent(content);
      this.$el.append(content);
      return this;
    };

    Component.prototype.prepend = function(content) {
      if (content == null) return this;
      content = this.setContent(content);
      this.$el.prepend(content);
      return this;
    };

    Component.prototype.setContent = function(content) {
      if (content == null) return this;
      if (content.el != null) {
        if (content.render != null) {
          return content = content.render().el;
        } else {
          return content = content.el;
        }
      } else {
        return content = content;
      }
    };

    Component.prototype.content = function(content) {
      var wrappedContent;
      if (content == null) return this;
      this._content = this.setContent(content);
      wrappedContent = this.make('div', {
        "class": 'content'
      }, this._content);
      this.$el.append(wrappedContent);
      return this;
    };

    Component.prototype.parent = function(parent) {
      if (parent == null) return this;
      this.$parent = $(parent);
      return this;
    };

    Component.prototype["class"] = function(klass) {
      this.addClass(klass);
      return this;
    };

    Component.prototype.addClass = function(klass) {
      if (klass == null) return this;
      this.$el.addClass(klass);
      return this;
    };

    Component.prototype.removeClass = function(klass) {
      if (klass == null) return this;
      this.$el.removeClass(klass);
      return this;
    };

    Component.prototype.bump = function(direction) {
      if (direction == null) return this;
      this.addClass("bump-" + direction);
      return this;
    };

    Component.prototype.slug = function(string) {
      if (string == null) return this;
      return string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "");
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
      Menu.__super__.initialize.call(this);
      this.addClass('backpack-menu');
      return this;
    };

    Menu.prototype.add = function() {
      var content, el, events, item, menuItem, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        content = item.content, events = item.events, el = item.el;
        if (el) {
          menuItem = item;
        } else {
          menuItem = new Backpack.MenuItem(item);
        }
        this.append(menuItem.show().el);
      }
      return this;
    };

    return Menu;

  })(Backpack.Component);

  Backpack.MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    function MenuItem() {
      this.content = __bind(this.content, this);
      this.render = __bind(this.render, this);
      MenuItem.__super__.constructor.apply(this, arguments);
    }

    MenuItem.prototype.tagName = 'li';

    MenuItem.prototype.template = _.template("<a href='<%= href %>'><%= content %></a>");

    MenuItem.prototype.initialize = function() {
      var content, events, _ref;
      MenuItem.__super__.initialize.call(this);
      this.addClass('backpack-menu-item');
      _ref = this.options, content = _ref.content, events = _ref.events;
      this.content(content, events);
      this.delegateEvents(this.events);
      return this;
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this._content);
      return this;
    };

    MenuItem.prototype.content = function(content, events) {
      if (content.el != null) {
        this._content = content.el;
        return this;
      }
      if (_.isString(events)) {
        this._content = this.template({
          href: events,
          content: content
        });
        return this;
      }
      if (_.isFunction(events)) {
        this.events = {
          'click': events
        };
        this._content = this.template({
          href: 'javascript:void(0);',
          content: content
        });
        return this;
      }
      this.events = events;
      this._content = this.template({
        href: 'javascript:void(0);',
        content: content
      });
      return this;
    };

    return MenuItem;

  })(Backpack.Component);

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
      return Overlay.__super__.initialize.call(this);
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

    Overlay.prototype.lockOverlay = function(_lockOverlay) {
      this._lockOverlay = _lockOverlay;
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
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.closable = __bind(this.closable, this);
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
      this.overlay = new Backpack.Overlay({
        lockOverlay: this.options.lockOverlay,
        content: this.el,
        color: this.options.color,
        show: true
      });
      this.overlay.on('overlay-close', this.close);
      return this;
    };

    Modal.prototype.closable = function() {
      if (!arguments[0]) return this;
      this.$el.prepend("<span class='close'>&times;</span>");
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

    return Modal;

  })(Backpack.Component);

  Backpack.Notification = (function(_super) {

    __extends(Notification, _super);

    function Notification() {
      Notification.__super__.constructor.apply(this, arguments);
    }

    return Notification;

  })(Backpack.Component);

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
