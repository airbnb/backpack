# ## Backpack.Menu

class Backpack.Menu extends Backbone.View 

  tagName:    'ul'
  className:  'backpack-menu'

  initialize: (parent = 'body', className = '') ->
    @setParent parent
    @addClass className
    @
  
  render: =>
    @$el.appendTo @parent
    @
  
  add: (content = '', options = {}) =>
    if content.el?
      menuItem = content
    else 
      menuItem = new Backpack.MenuItem content, options

    @$el.append menuItem.render().el
    @
  
  setParent: (parent) =>
    @parent = $(parent)
    @

  addClass: (className) =>
    @$el.addClass className
    @



# **Backpack.MenuItem**

class Backpack.MenuItem extends Backbone.View

  tagName:    'li'
  className:  'backpack-menu-item'
  events:     {}

  initialize: (content = '', options = {}) ->
    {name, @events} = options
    @setContent content
    @delegateEvents @events
    @$el.addClass @slug name
    @

  render: =>
    @$el.html @content
    @

  setContent: (content = '') =>
    if content.el?
      @content = content.render().el
    else
      @content = $(content)
    @

  addClass: (className) =>
    @$el.addClass className
    @

  slug: (string) =>
    Backpack.Helpers.slug string