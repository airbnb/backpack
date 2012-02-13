# **Backpack.Menu** This is documentation 

{Backpack, Backbone} = require?('./Backpack')

class Backpack.Menu extends Backbone.View

  tagName: 'ul'

  initialize: ->
    console.log 'new Menu'
    @items = {}

  render: =>
    # console.log @items, @$el
    @