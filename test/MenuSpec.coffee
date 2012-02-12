expect = require "expect.js"
Backpack = require "../lib/Backpack-bundle.js"



describe "Backpack.Menu", ->

  beforeEach =>
    console.log Backpack.Menu?
    menu = new Backpack.Menu

  describe "Mocha Test", ->
    it "should identify numbers", ->
      expect([]).to.be.a('array')