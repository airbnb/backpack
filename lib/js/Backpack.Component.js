(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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

}).call(this);
