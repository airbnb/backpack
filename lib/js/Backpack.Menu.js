(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.show = __bind(this.show, this);
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

    Menu.prototype.show = function() {
      Menu.__super__.show.call(this);
      console.log('menu show');
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

}).call(this);
