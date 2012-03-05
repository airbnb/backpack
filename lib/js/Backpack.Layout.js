(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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

    Layout.prototype.defaults = {
      'columns': 1,
      'gutter': '30'
    };

    Layout.prototype.initialize = function() {
      this.addClass('backpack-layout clearfix');
      Layout.__super__.initialize.call(this);
      return this;
    };

    Layout.prototype.add = function() {
      var content, element, item, span, _i, _len, _results;
      this.columnWidth();
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
        content = item.content, span = item.span;
        if (!span) span = this._remaining;
        this._remaining = this._remaining - span;
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
      var wrapped;
      return wrapped = this.make('div', {
        style: "float: left; width: " + (this._colWidth * span) + "px; margin-left: " + this._gutter + "px"
      }, el);
    };

    return Layout;

  })(Backpack.Component);

}).call(this);
