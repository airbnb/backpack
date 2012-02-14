(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = Array.prototype.slice;

  Backpack.Observer = (function() {

    function Observer() {
      this.off = __bind(this.off, this);
      this.on = __bind(this.on, this);
      this.publish = __bind(this.publish, this);      this.callbacks = {};
    }

    Observer.prototype.publish = function() {
      var args, callback, callbacks, event, _i, _len;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      console.log("published " + event);
      callbacks = this.callbacks[event];
      if (!callbacks) return;
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        callback = callbacks[_i];
        callback.apply(this, args);
      }
      return this;
    };

    Observer.prototype.on = function(event, fn) {
      (this.callbacks[event] = this.callbacks[event] || []).push(fn);
      return this;
    };

    Observer.prototype.off = function(event) {};

    return Observer;

  })();

}).call(this);
