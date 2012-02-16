(function() {
  var Backpack, root;

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

}).call(this);
