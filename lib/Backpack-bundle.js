(function() {
  var Backpack, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Backpack = {
    VERSION: '0.0.1',
    Helpers: {
      slug: function(string) {
        if (string == null) string = "";
        return string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "");
      }
    }
  };

  root.Backpack = Backpack;

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.add = __bind(this.add, this);
      this.slug = __bind(this.slug, this);
      this.addClass = __bind(this.addClass, this);
      this.setParent = __bind(this.setParent, this);
      this.render = __bind(this.render, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.className = 'backpack-menu';

    Menu.prototype.initialize = function(parent, name) {
      if (parent == null) parent = 'body';
      if (name == null) name = '';
      this.setParent(parent);
      this.addClass(name);
      return this;
    };

    Menu.prototype.render = function() {
      this.$el.appendTo(this.parent);
      return this;
    };

    Menu.prototype.setParent = function(parent) {
      this.parent = $(parent);
      return this;
    };

    Menu.prototype.addClass = function(name) {
      if (name == null) name = '';
      this.$el.addClass(this.slug(name));
      return this;
    };

    Menu.prototype.slug = function(string) {
      if (string == null) string = '';
      return Backpack.Helpers.slug(string);
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

  })(Backbone.View);

  Backpack.MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    function MenuItem() {
      this.setContent = __bind(this.setContent, this);
      this.slug = __bind(this.slug, this);
      this.addClass = __bind(this.addClass, this);
      this.render = __bind(this.render, this);
      MenuItem.__super__.constructor.apply(this, arguments);
    }

    MenuItem.prototype.tagName = 'li';

    MenuItem.prototype.className = 'backpack-menu-item';

    MenuItem.prototype.template = _.template("<a href='<%= href %>'><%= html %></a>");

    MenuItem.prototype.events = {};

    MenuItem.prototype.initialize = function(content, events, name) {
      if (content == null) content = '';
      if (events == null) events = {};
      if (name == null) name = '';
      this.setContent(content, events);
      this.delegateEvents(this.events);
      this.addClass(name);
      return this;
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this.content);
      return this;
    };

    MenuItem.prototype.addClass = function(name) {
      if (name == null) name = '';
      this.$el.addClass(this.slug(name));
      return this;
    };

    MenuItem.prototype.slug = function(string) {
      if (string == null) string = '';
      return Backpack.Helpers.slug(string);
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
          'href': events,
          'html': content
        });
        return this;
      }
      if (_.isFunction(events)) {
        this.events = {
          'click': events
        };
        this.content = this.template({
          href: 'javascript:void(0);',
          html: content
        });
        return this;
      }
      this.events = events;
      this.content = this.template({
        href: 'javascript:void(0);',
        html: content
      });
      return this;
    };

    return MenuItem;

  })(Backbone.View);

}).call(this);
