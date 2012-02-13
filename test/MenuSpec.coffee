expect = require "expect.js"

Backpack = {}
Backpack.Menu = require "../src/Backpack.Menu"


describe "Backpack.Menu", ->

  describe "#initialize", ->
    it "should have zero items", ->
      menu = new Backpack.Menu
      console.log menu
      expect(menu).to.eql({})