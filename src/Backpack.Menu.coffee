# ## Backpack.Menu

class Backpack.Menu extends Backpack.Component

  tagName: 'ul'


  initialize: ->
    super()
    @addClass('backpack-menu')
    @

  add: =>
    for item in arguments
      if item.el
        menuItem = item
      else
        menuItem = new Backpack.MenuItem(item)
      @append(menuItem.show().el)
    @


# ## Backpack.MenuItem

class Backpack.MenuItem extends Backpack.Component

  tagName: 'li'
  template: _.template("<a href='<%= href %>'><%= content %></a>")


  initialize: ->
    @addClass 'backpack-menu-item'
    super()
    {content, events} = @options
    @content(content, events)
    @delegateEvents(@events)
    @

  render: =>
    @$el.html(@_content)
    @

  content: (content, events = {}) =>
    if content.el?
      @_content = content.el
      return @
    if _.isString(events)
      @_content = @template({ href: events, content: content })
      return @
    if _.isFunction(events)
      @events  = {'click': events}
      @_content = @template({ href: 'javascript:void(0);', content: content })
      return @
      
    @events  = events
    @_content = @template({ href: 'javascript:void(0);', content: content })
    @