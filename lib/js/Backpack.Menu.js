(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.add = __bind(this.add, this);
      this.render = __bind(this.render, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.className = 'bp-menu';

    Menu.prototype.initialize = function() {
      this.items = {};
      this.observer = new Backpack.Observer;
      return this;
    };

    Menu.prototype.render = function() {
      this.$el.appendTo('body');
      return this;
    };

    Menu.prototype.add = function(name, fn) {
      var menuItem;
      menuItem = new Backpack.MenuItem(this.observer, name, fn);
      this.$el.append(menuItem.render().el);
      this.items[name] = menuItem;
      return this;
    };

    return Menu;

  })(Backbone.View);

  Backpack.MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    function MenuItem() {
      this.slug = __bind(this.slug, this);
      this.handleHover = __bind(this.handleHover, this);
      this.handleClick = __bind(this.handleClick, this);
      this.render = __bind(this.render, this);
      MenuItem.__super__.constructor.apply(this, arguments);
    }

    MenuItem.prototype.tagName = 'li';

    MenuItem.prototype.className = 'bp-menuItem';

    MenuItem.prototype.template = _.template("<a href='javascript:void(0);'> <%= name %> </a> ");

    MenuItem.prototype.events = {
      'click': 'handleClick',
      'hover': 'handleHover'
    };

    MenuItem.prototype.initialize = function(observer, name, fn) {
      this.observer = observer;
      this.name = name;
      this.fn = fn;
      return this.$el.addClass(this.slug(this.name));
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this.template({
        name: this.name
      }));
      return this;
    };

    MenuItem.prototype.handleClick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.observer.publish("menu:" + this.name + ":click");
      return typeof this.fn === "function" ? this.fn() : void 0;
    };

    MenuItem.prototype.handleHover = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.observer.publish("menu:" + this.name + ":hover");
    };

    MenuItem.prototype.slug = function(string) {
      return string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "");
    };

    return MenuItem;

  })(Backbone.View);

}).call(this);
