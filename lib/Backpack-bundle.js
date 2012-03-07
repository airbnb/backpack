(function() {
  "use strict";
  var Backpack, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Backpack = root.Backpack = {
    VERSION: '0.0.1',
    Prefix: 'backpack',
    Emitter: _.clone(Backbone.Events)
  };

  Backpack.Component = (function(_super) {

    __extends(Component, _super);

    function Component() {
      this.slug = __bind(this.slug, this);
      this.setContent = __bind(this.setContent, this);
      this.getLayout = __bind(this.getLayout, this);
      this.hasLayout = __bind(this.hasLayout, this);
      this.layout = __bind(this.layout, this);
      this.isRendered = __bind(this.isRendered, this);
      this.getItems = __bind(this.getItems, this);
      this.items = __bind(this.items, this);
      this.name = __bind(this.name, this);
      this.css = __bind(this.css, this);
      this.removeClass = __bind(this.removeClass, this);
      this.addClass = __bind(this.addClass, this);
      this.parent = __bind(this.parent, this);
      this.content = __bind(this.content, this);
      this.prepend = __bind(this.prepend, this);
      this.append = __bind(this.append, this);
      this.after = __bind(this.after, this);
      this.before = __bind(this.before, this);
      this.remove = __bind(this.remove, this);
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.visible = __bind(this.visible, this);
      this.getType = __bind(this.getType, this);
      this.type = __bind(this.type, this);
      this.render = __bind(this.render, this);
      Component.__super__.constructor.apply(this, arguments);
    }

    Component.prototype.tagName = 'div';

    Component.prototype.className = 'backpack-component';

    Component.prototype.defaults = {
      'parent': 'body',
      'type': 'component',
      'content': null,
      'visible': true
    };

    Component.prototype.initialize = function() {
      var args, func, _ref, _ref2, _ref3, _results;
      this._items = [];
      this._rendered = false;
      this.options = _.extend({}, this.defaults, this.config, this.options);
      _ref = this.options;
      _results = [];
      for (func in _ref) {
        args = _ref[func];
        if (!_.isArray(args)) {
          if ((_ref2 = this[func]) != null) {
            if (typeof _ref2.call === "function") _ref2.call(this, args);
          }
        } else {
          if ((_ref3 = this[func]) != null) {
            if (typeof _ref3.apply === "function") _ref3.apply(this, args);
          }
        }
        _results.push(null);
      }
      return _results;
    };

    Component.prototype.render = function() {
      this.$parent.append(this.el);
      this._rendered = true;
      return this;
    };

    Component.prototype.type = function(type) {
      this._type = this.slug("" + Backpack.Prefix + " " + type);
      this.addClass(this._type);
      return this;
    };

    Component.prototype.getType = function() {
      return this._type;
    };

    Component.prototype.visible = function(show) {
      if (show) {
        this.show();
      } else {
        this.hide();
      }
      return this;
    };

    Component.prototype.show = function() {
      if (!this.isRendered()) this.render();
      this.delegateEvents(this.events);
      this.$el.removeClass('hide');
      this._visible = true;
      return this;
    };

    Component.prototype.hide = function() {
      this.$el.addClass('hide');
      this.undelegateEvents();
      this._visible = false;
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
      content = this.setContent(content);
      this.$el.before(content);
      return this;
    };

    Component.prototype.after = function(content) {
      content = this.setContent(content);
      this.$el.after(content);
      return this;
    };

    Component.prototype.append = function(content) {
      content = this.setContent(content);
      this.$el.append(content);
      return this;
    };

    Component.prototype.prepend = function(content) {
      content = this.setContent(content);
      this.$el.prepend(content);
      return this;
    };

    Component.prototype.content = function(content) {
      var wrappedContent;
      if (content == null) return this;
      this._content = this.setContent(content);
      wrappedContent = this.make('div', {
        "class": 'content clearfix'
      }, this._content);
      this.$el.append(wrappedContent);
      return this;
    };

    Component.prototype.parent = function(parent) {
      if (parent == null) return this;
      this.$parent = $(parent);
      return this;
    };

    Component.prototype.addClass = function(klass) {
      this.$el.addClass(klass);
      return this;
    };

    Component.prototype.removeClass = function(klass) {
      this.$el.removeClass(klass);
      return this;
    };

    Component.prototype.css = function(css) {
      this.$el.css(css);
      return this;
    };

    Component.prototype.name = function(name) {
      this.name = this.addClass(this.slug(name));
      return this;
    };

    Component.prototype.items = function() {
      var item, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        this._items.push(item);
      }
      return this;
    };

    Component.prototype.getItems = function() {
      return this._items;
    };

    Component.prototype.isRendered = function() {
      return this._rendered;
    };

    Component.prototype.layout = function(layout) {
      this._layout = layout;
      return this;
    };

    Component.prototype.hasLayout = function() {
      return !!this._layout;
    };

    Component.prototype.getLayout = function() {
      return this._layout;
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

    Component.prototype.slug = function(string) {
      if (string == null) return this;
      return string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "");
    };

    return Component;

  })(Backbone.View);

  Backpack.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      this.wrap = __bind(this.wrap, this);
      this.gutter = __bind(this.gutter, this);
      this.columnWidth = __bind(this.columnWidth, this);
      this.columns = __bind(this.columns, this);
      this.add = __bind(this.add, this);
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.tagName = 'div';

    Layout.prototype.config = {
      'type': 'layout',
      'columns': 1,
      'gutter': '30',
      'visible': true
    };

    Layout.prototype.initialize = function() {
      this.addClass('clearfix');
      Layout.__super__.initialize.call(this);
      return this;
    };

    Layout.prototype.add = function() {
      var content, element, item, span, _i, _len, _results;
      this.columns(arguments.length);
      this.columnWidth();
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        if (_.isFunction(item)) {
          content = item;
        } else {
          content = item.content, span = item.span;
        }
        span || (span = 1);
        element = this.setContent(content);
        element = this.wrap(element, span);
        _results.push(this.append(element));
      }
      return _results;
    };

    Layout.prototype.columns = function(count) {
      this._cols = count;
      this._remaining = count;
      return this;
    };

    Layout.prototype.columnWidth = function() {
      var availableWidth, parentWidth;
      parentWidth = this.$parent.width();
      availableWidth = parentWidth - (this._cols * this._gutter);
      this._colWidth = availableWidth / this._cols;
      return this;
    };

    Layout.prototype.gutter = function(width) {
      this.css({
        'margin-left': "-" + width + "px"
      });
      this._gutter = width;
      return this;
    };

    Layout.prototype.wrap = function(el, span) {
      var style, wrapped;
      style = "float: left; width: " + (this._colWidth * span) + "px; margin-left: " + this._gutter + "px";
      return wrapped = this.make('div', {
        style: style
      }, el);
    };

    return Layout;

  })(Backpack.Component);

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
      var item, menuItem, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        if (item.el) {
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
      this.addClass('backpack-menu-item');
      MenuItem.__super__.initialize.call(this);
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
      if (events == null) events = {};
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
      this.remove = __bind(this.remove, this);
      this.color = __bind(this.color, this);
      this.lockOverlay = __bind(this.lockOverlay, this);
      this.close = __bind(this.close, this);
      this.unlock = __bind(this.unlock, this);
      this.show = __bind(this.show, this);
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

    Overlay.prototype.config = {
      'type': 'overlay',
      'color': 'rgba(0,0,0,0.7)',
      'lockOverlay': false
    };

    Overlay.prototype.initialize = function() {
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

    Overlay.prototype.show = function() {
      Overlay.__super__.show.call(this);
      this.$parent.addClass('overlay');
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

    Overlay.prototype.remove = function() {
      this.$parent.removeClass('overlay');
      Overlay.__super__.remove.call(this);
      return this;
    };

    return Overlay;

  })(Backpack.Component);

  Backpack.Modal = (function(_super) {

    __extends(Modal, _super);

    function Modal() {
      this.newOverlay = __bind(this.newOverlay, this);
      this.closable = __bind(this.closable, this);
      this.title = __bind(this.title, this);
      this.remove = __bind(this.remove, this);
      this.close = __bind(this.close, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      Modal.__super__.constructor.apply(this, arguments);
    }

    Modal.prototype.events = {
      'click .close': 'close'
    };

    Modal.prototype.config = {
      'type': 'modal',
      'closable': true,
      'lockOverlay': true
    };

    Modal.prototype.initialize = function() {
      Modal.__super__.initialize.call(this);
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

    Modal.prototype.remove = function() {
      var _ref;
      Modal.__super__.remove.call(this);
      if ((_ref = this.overlay) != null) _ref.remove();
      return this;
    };

    Modal.prototype.title = function(title) {
      this._title = title;
      this.prepend("<span class='title'>" + title + "</span>");
      return this;
    };

    Modal.prototype.closable = function() {
      if (!arguments[0]) return this;
      this.prepend("<span class='close'>&times;</span>");
      return this;
    };

    Modal.prototype.newOverlay = function() {
      this.overlay = new Backpack.Overlay({
        lockOverlay: this.options.lockOverlay,
        content: this.el,
        color: this.options.color
      });
      this.overlay.on('overlay-close', this.close);
      return this;
    };

    return Modal;

  })(Backpack.Component);

  Backpack.Tabs = (function(_super) {

    __extends(Tabs, _super);

    function Tabs() {
      this.exit = __bind(this.exit, this);
      this.select = __bind(this.select, this);
      this.setActive = __bind(this.setActive, this);
      this.setTab = __bind(this.setTab, this);
      this.add = __bind(this.add, this);
      Tabs.__super__.constructor.apply(this, arguments);
    }

    Tabs.prototype.tagName = 'ul';

    Tabs.prototype.config = {
      'type': 'tabs'
    };

    Tabs.prototype.initialize = function() {
      var _ref;
      this.addClass('clearfix');
      this.active = (_ref = this.options.active) != null ? _ref : 0;
      return Tabs.__super__.initialize.call(this);
    };

    Tabs.prototype.add = function() {
      var item, tab, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        item = _.extend(item, {
          parent: this
        });
        if (item.el) {
          tab = item;
        } else {
          tab = new Backpack.Tab(item);
        }
        this.setTab(tab);
      }
      this.setActive();
      return this;
    };

    Tabs.prototype.setTab = function(tab) {
      tab.on('tab-click', this.select);
      tab.on('tab-exit', this.exit);
      this.append(tab.show().el);
      this._items.push(tab);
      return this;
    };

    Tabs.prototype.setActive = function() {
      var activeTab;
      activeTab = this._items[this.active];
      activeTab.addClass('backpack-tab-active');
      this.select(activeTab);
      return this;
    };

    Tabs.prototype.select = function(tab) {
      var curActive;
      curActive = this._items[this.active];
      curActive.trigger('tab-exit', curActive);
      this.active = _.indexOf(this._items, tab);
      tab.addClass('backpack-tab-active');
      this.$el.next('.backpack-tab-content').remove();
      this.after(tab.tabContent.show().el);
      return this;
    };

    Tabs.prototype.exit = function(tab) {
      tab.removeClass('backpack-tab-active');
      return this;
    };

    return Tabs;

  })(Backpack.Component);

  Backpack.Tab = (function(_super) {

    __extends(Tab, _super);

    function Tab() {
      this.select = __bind(this.select, this);
      this.content = __bind(this.content, this);
      this.render = __bind(this.render, this);
      Tab.__super__.constructor.apply(this, arguments);
    }

    Tab.prototype.tagName = 'li';

    Tab.prototype.template = _.template("<a class='round-top' href='<%= href %>'><%= content %></a>");

    Tab.prototype.events = {
      'click': 'select'
    };

    Tab.prototype.config = {
      'type': 'tab'
    };

    Tab.prototype.initialize = function() {
      Tab.__super__.initialize.call(this);
      return this.tabContent = new Backpack.TabContent({
        content: this.options.tabContent,
        parent: this.$parent
      });
    };

    Tab.prototype.render = function() {
      this.$el.html(this._content);
      return this;
    };

    Tab.prototype.content = function(content) {
      if (content == null) return this;
      content = this.setContent(content);
      this._content = this.template({
        href: 'javascript:void(0);',
        content: content
      });
      return this;
    };

    Tab.prototype.select = function() {
      this.trigger('tab-click', this);
      return this;
    };

    return Tab;

  })(Backpack.Component);

  Backpack.TabContent = (function(_super) {

    __extends(TabContent, _super);

    function TabContent() {
      this.render = __bind(this.render, this);
      TabContent.__super__.constructor.apply(this, arguments);
    }

    TabContent.prototype.config = {
      'type': 'tab-content'
    };

    TabContent.prototype.initialize = function() {
      return TabContent.__super__.initialize.call(this);
    };

    TabContent.prototype.render = function() {
      this.$parent.html(this._content);
      return this;
    };

    return TabContent;

  })(Backpack.Component);

}).call(this);
