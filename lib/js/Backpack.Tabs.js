(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
      Tab.__super__.constructor.apply(this, arguments);
    }

    Tab.prototype.tagName = 'li';

    Tab.prototype.template = _.template("<a class='round-top' href='<%= href %>'><%= content %></a>");

    Tab.prototype.events = {
      'click': 'select'
    };

    Tab.prototype.config = {
      'type': 'tab',
      'renderType': 'html',
      'renderEl': Tab._content
    };

    Tab.prototype.initialize = function() {
      Tab.__super__.initialize.call(this);
      return this.tabContent = new Backpack.TabContent({
        content: this.options.tabContent,
        parent: this.$parent
      });
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
      TabContent.__super__.constructor.apply(this, arguments);
    }

    TabContent.prototype.config = {
      'type': 'tab-content',
      'renderType': 'html',
      'renderEl': TabContent._content
    };

    TabContent.prototype.initialize = function() {
      return TabContent.__super__.initialize.call(this);
    };

    return TabContent;

  })(Backpack.Component);

}).call(this);
