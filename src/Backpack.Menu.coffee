# ## Backpack.Menu

class Backpack.Menu extends Backpack.Component

  tagName: 'ul'

  initialize: ->
    super()
    @addClass('backpack-menu')
    @

  add: (content, events, name) =>
    if content.el?
      menuItem = content
    else
      menuItem = new Backpack.MenuItem(content, events, name)
    @$el.append(menuItem.render().el)
    @



# ## Backpack.MenuItem

class Backpack.MenuItem extends Backpack.Component

  tagName: 'li'
  template: _.template("<a href='<%= href %>'><%= content %></a>")


  initialize: ->
    @addClass 'backpack-menu-item'
    {content, events, name} = @options
    @setContent(content, events)
    @delegateEvents(@events)
    @addClass(@slug(name))
    @

  render: =>
    @$el.html(@content)
    @

  setContent: (content, events) =>
    if content.el?
      @content = content.el
      return @
    if _.isString(events)
      @content = @template({ href: events, content: content })
      return @
    if _.isFunction(events)
      @events  = {'click': events}
      @content = @template({ href: 'javascript:void(0);', content: content })
      return @
      
    @events  = events
    @content = @template({ href: 'javascript:void(0);', content: content })

    @