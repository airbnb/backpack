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
        return string != null ? string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "") : void 0;
      }
    }
  };

  root.Backpack = Backpack;

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.addClass = __bind(this.addClass, this);
      this.setParent = __bind(this.setParent, this);
      this.add = __bind(this.add, this);
      this.render = __bind(this.render, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.className = 'backpack-menu';

    Menu.prototype.initialize = function(parent, className) {
      if (parent == null) parent = 'body';
      if (className == null) className = '';
      this.setParent(parent);
      this.addClass(className);
      return this;
    };

    Menu.prototype.render = function() {
      this.$el.appendTo(this.parent);
      return this;
    };

    Menu.prototype.add = function(content, options) {
      var menuItem;
      if (content == null) content = '';
      if (options == null) options = {};
      if (content.el != null) {
        menuItem = content;
      } else {
        menuItem = new Backpack.MenuItem(content, options);
      }
      this.$el.append(menuItem.render().el);
      return this;
    };

    Menu.prototype.setParent = function(parent) {
      this.parent = $(parent);
      return this;
    };

    Menu.prototype.addClass = function(className) {
      this.$el.addClass(className);
      return this;
    };

    return Menu;

  })(Backbone.View);

  Backpack.MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    function MenuItem() {
      this.slug = __bind(this.slug, this);
      this.addClass = __bind(this.addClass, this);
      this.setContent = __bind(this.setContent, this);
      this.render = __bind(this.render, this);
      MenuItem.__super__.constructor.apply(this, arguments);
    }

    MenuItem.prototype.tagName = 'li';

    MenuItem.prototype.className = 'backpack-menu-item';

    MenuItem.prototype.events = {};

    MenuItem.prototype.initialize = function(content, options) {
      var name;
      if (content == null) content = '';
      if (options == null) options = {};
      name = options.name, this.events = options.events;
      this.setContent(content);
      this.delegateEvents(this.events);
      this.$el.addClass(this.slug(name));
      return this;
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this.content);
      return this;
    };

    MenuItem.prototype.setContent = function(content) {
      if (content == null) content = '';
      if (content.el != null) {
        this.content = content.render().el;
      } else {
        this.content = $(content);
      }
      return this;
    };

    MenuItem.prototype.addClass = function(className) {
      this.$el.addClass(className);
      return this;
    };

    MenuItem.prototype.slug = function(string) {
      return Backpack.Helpers.slug(string);
    };

    return MenuItem;

  })(Backbone.View);

}).call(this);
