expect        = require "expect.js"
Backpack      = {}
Menu = require "../lib/Backpack-bundle"


describe "Backpack.Menu", =>

  describe "#initialize", =>
    it "should have zero items", =>
      menu = new Menu