# ## Backpack.Menu

class Backpack.Menu extends Backpack.Component

  tagName: 'ul'

  initialize: ->
    super()
    @addClass('backpack-menu')
    @

  add: =>
    for item in arguments
      {content, events, el} = item
      if el
        menuItem = item
      else
        menuItem = new Backpack.MenuItem(item)
      @append(menuItem.show().el)
    @


# ## Backpack.MenuItem

class Backpack.MenuItem extends Backpack.Clickable

  tagName: 'li'
  template: _.template("<a href='<%= href %>'><%= content %></a>")


  initialize: ->
    super()
    @addClass 'backpack-menu-item'