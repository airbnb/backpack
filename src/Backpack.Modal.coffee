# ## Backpack.Overlay
class Backpack.Dialog extends Backbone.View

  tagName:   'div'
  className: 'backpack-dialog'

  options:
    name:     ''
    parent:   'body'
    content:  ''

  events:
    'click': 'hide'

  initialize: ->
    {name, parent, content} = @options
    @setContent content
    @setParent parent
    @addClass name
    @

  render: =>
    @$el.appendTo @parent
    @

  setContent: (content) =>
    if content.el?
      @content = content
    else
      @content = content

    @$el.html @content
    @
  
  setParent: (parent) =>
    @parent = parent
    @

  hide: =>
    @$el.addClass 'hide'
    @undelegateEvents()
    @
  
  show: =>
    @delegateEvents @events
    @$el.removeClass 'hide'
    @

  addClass: (name) =>
    @$el.addClass @slug name
    @

  slug: (name = '') =>
    Backpack.Helpers.slug name



# TODO: make this a singleton
# ## Backpack.Overlay
class Backpack.Overlay extends Backbone.View

  id:        'backpack-overlay'
  tagName:   'div'
  className: 'hide'

  options:
    lock:   false
    parent: 'body'
    color:  'rgba(0,0,0,0.7)'

  events:
    'click': 'unlock'
  
  instance = false

  @getInstance = (options) ->
    {lock, parent, color} = options?
    return instance.setLock {lock, parent, color} if instance
    instance = new Backpack.Overlay()

  initialize: ->
    return instance if instance

    {lock, parent, color} = @options
    @setLock lock
    @setParent parent
    @setColor color
    @

  render: =>
    @$el.prependTo @parent
    @

  hide: =>
    @$el.addClass 'hide'
    @undelegateEvents()
    @

  show: =>
    @delegateEvents @events
    @$el.removeClass 'hide'
    @
    
  unlock: =>
    @hide() unless @lock
    @

  setLock: (@lock) =>
    @
  
  setColor: (color) =>
    @el.style.backgroundColor = color
    @
  
  setParent: (parent) =>
    @parent = parent
    @

  setOptions: (options) =>
    @setLock lock




# ## Backpack.Modal
class Backpack.Modal extends Backpack.Dialog

  tagName:    'div'
  className:  'backpack-modal'

  events:
    'click': 'hide'

  overlay = Backpack.Overlay.getInstance()

  initialize: ->
    super()
    @
  
  render: =>
    @$el.appendTo @parent
    @
  
  show: =>
    super()
    overlay.setLock(true).render().show()
    @
  
  hide: =>
    super()
    overlay.render().hide()
    @
