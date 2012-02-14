# **Backpack.Menu** 

class Backpack.Menu extends Backbone.View 

  tagName:    'ul'
  className:  'bp-menu'

  initialize: ->
    @items    = {}
    @observer  = new Backpack.Observer
    @

  render: =>
    @$el.appendTo 'body'
    @

  add: (name, fn) =>
    menuItem = new Backpack.MenuItem @observer, name, fn
    @$el.append menuItem.render().el
    @items[name] = menuItem
    @



# **Backpack.MenuItem** 

class Backpack.MenuItem extends Backbone.View

  tagName:    'li'
  className:  'bp-menuItem'
  template:   _.template """
                            <a href='javascript:void(0);'> <%= name %> </a> 
                         """
  events:
    'click':  'handleClick'
    'hover':  'handleHover'

  initialize: (@observer, @name, @fn) ->
    @$el.addClass @slug @name

  render: =>
    @$el.html @template {name: @name}
    @

  handleClick: (e) =>
    e.preventDefault()
    e.stopPropagation()
    @observer.publish "menu:#{@name}:click"
    @fn?()

  handleHover: (e) =>
    e.preventDefault()
    e.stopPropagation()
    @observer.publish "menu:#{@name}:hover"

  slug: (string) =>
    string
      .toLowerCase()
      .replace(/\ +/g, "-")
      .replace(/[^a-z0-9-]/g, "")
