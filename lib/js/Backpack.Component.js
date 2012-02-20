(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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

}).call(this);
