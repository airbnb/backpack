(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backpack.Tabs = (function(_super) {

    __extends(Tabs, _super);

    function Tabs() {
      this.setItems = __bind(this.setItems, this);
      this.add = __bind(this.add, this);
      Tabs.__super__.constructor.apply(this, arguments);
    }

    Tabs.prototype.tagName = 'ul';

    Tabs.prototype.items = [];

    Tabs.prototype.active = 0;

    Tabs.prototype.initialize = function() {
      Tabs.__super__.initialize.call(this);
      this.addClass('backpack-tabs');
      this.contentArea = "<div class='backpack-tab-content-area'/>";
      return this.after(this.contentArea);
    };

    Tabs.prototype.add = function() {
      var content, el, events, item, tab, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        content = item.content, events = item.events, el = item.el;
        if (el) {
          tab = item;
        } else {
          tab = new Backpack.Tab(item);
        }
        this.append(tab.show().el);
        this.items.push(tab);
      }
      this.setItems();
      return this;
    };

    Tabs.prototype.setItems = function() {
      var active, first, last;
      first = _.first(this.items);
      last = _.last(this.items);
      active = this.items[this.active];
      first.addClass('backpack-tab-first');
      last.addClass('backpack-tab-last');
      active.addClass('backpack-tab-active');
      return this;
    };

    return Tabs;

  })(Backpack.Component);

  Backpack.Tab = (function(_super) {

    __extends(Tab, _super);

    function Tab() {
      Tab.__super__.constructor.apply(this, arguments);
    }

    Tab.prototype.tagName = 'li';

    Tab.prototype.initialize = function() {
      var tabContent;
      Tab.__super__.initialize.call(this);
      this.addClass('backpack-tab');
      tabContent = this.options.tabContent;
      return this.tabContent = new Backpack.TabContent({
        content: tabContent
      });
    };

    return Tab;

  })(Backpack.Clickable);

  Backpack.TabContent = (function(_super) {

    __extends(TabContent, _super);

    function TabContent() {
      TabContent.__super__.constructor.apply(this, arguments);
    }

    TabContent.prototype.initialize = function() {
      TabContent.__super__.initialize.call(this);
      return this.addClass('backpack-tab-content');
    };

    return TabContent;

  })(Backpack.Component);

}).call(this);
