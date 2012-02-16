# ## Backpack.Menu

class Backpack.Menu extends Backbone.View 

  tagName:    'ul'
  className:  'backpack-menu'

  initialize: (parent = 'body', name = '') ->
    @setParent parent
    @addClass name
    @
  
  render: =>
    @$el.appendTo @parent
    @

  setParent: (parent) =>
    @parent = $(parent)
    @

  addClass: (name = '') =>
    @$el.addClass @slug name
    @
  
  slug: (string = '') =>
    Backpack.Helpers.slug string

  add: (content = '', events = {}, name) =>
    if content.el?
      menuItem = content
    else
      menuItem = new Backpack.MenuItem content, events, name

    @$el.append menuItem.render().el
    @



# ## Backpack.MenuItem

class Backpack.MenuItem extends Backbone.View

  tagName:    'li'
  className:  'backpack-menu-item'
  template:   _.template  "<a href='<%= href %>'><%= content %></a>"

  events: {}

  initialize: (content = '', events = {}, name = '') ->
    @setContent content, events
    @delegateEvents @events
    @addClass name 
    @

  render: =>
    @$el.html @content
    @
  
  addClass: (name = '') =>
    @$el.addClass @slug name
    @
  
  slug: (string = '') =>
    Backpack.Helpers.slug string

  setContent: (content = '', events = {}) =>
    if content.el?
      @content = content.el
      return @
    if _.isString events
      @content = @template { href: events, content: content }
      return @
    if _.isFunction events
      @events  = {'click': events}
      @content = @template { href: 'javascript:void(0);', content: content }
      return @
      
    @events  = events
    @content = @template { href: 'javascript:void(0);', content: content }

    @