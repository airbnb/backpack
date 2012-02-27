(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Tabs = (function(_super) {

    __extends(Tabs, _super);

    function Tabs() {
      this.select = __bind(this.select, this);
      this.setActive = __bind(this.setActive, this);
      this.setTab = __bind(this.setTab, this);
      this.add = __bind(this.add, this);
      Tabs.__super__.constructor.apply(this, arguments);
    }

    Tabs.prototype.tagName = 'ul';

    Tabs.prototype.initialize = function() {
      this.addClass('backpack-tabs clearfix');
      this.items = [];
      this.active = 0;
      return Tabs.__super__.initialize.call(this);
    };

    Tabs.prototype.add = function() {
      var content, el, events, item, tab, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        content = item.content, events = item.events, el = item.el;
        item = _.extend(item, {
          parent: this
        });
        if (el) {
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
      this.append(tab.show().el);
      this.items.push(tab);
      return this;
    };

    Tabs.prototype.setActive = function() {
      var active;
      active = this.items[this.active];
      active.addClass('backpack-tab-active');
      this.select(active);
      return this;
    };

    Tabs.prototype.select = function(tab) {
      this.items[this.active].removeClass('backpack-tab-active');
      this.active = _.indexOf(this.items, tab);
      tab.addClass('backpack-tab-active');
      this.$el.next('.backpack-tab-content').remove();
      this.after(tab.tabContent.show().el);
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

    Tab.prototype.initialize = function() {
      Tab.__super__.initialize.call(this);
      this.addClass('backpack-tab');
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

    TabContent.prototype.initialize = function() {
      TabContent.__super__.initialize.call(this);
      return this.addClass('backpack-tab-content');
    };

    TabContent.prototype.render = function() {
      this.$parent.html(this._content);
      return this;
    };

    return TabContent;

  })(Backpack.Component);

}).call(this);
