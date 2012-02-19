# ## Backpack.Overlay
class Backpack.Dialog extends Backpack.Component

  tagName:   'div'

  events:
    'click': 'close'

  initialize: ->
    {name, parent, content} = @options
    @addClass 'backpack-dialog'
    @setContent content
    @setParent parent
    @addClass name
    @



# ## Backpack.Overlay
class Backpack.Overlay extends Backpack.Component

  tagName:   'div'
  className: 'backpack-overlay hide'

  options:
    lock:   false
    parent: 'body'
    color:  'rgba(0,0,0,0.7)'

  events:
    'click': 'unlock'

  initialize: ->
    {lock, parent, color} = @options
    @setLock lock
    @setParent parent
    @setColor color
    @

  render: =>
    console.log @parent, @options, @option
    @$el.prependTo @parent
    @
    
  unlock: =>
    @close() unless @lock
    @

  setLock: (@lock) =>
    @
  
  setColor: (color) =>
    @el.style.backgroundColor = color
    @

  setOptions: (options) =>
    @setLock lock
    @




# ## Backpack.Modal
class Backpack.Modal extends Backpack.Dialog

  tagName:    'div'
  className:  'backpack-modal'

  events:
    'click': 'close'

  overlay = new Backpack.Overlay()

  initialize: ->
    super()
    @
  
  show: =>
    super()
    console.log overlay
    overlay.setLock(true).render().show()
    @
  
  hide: =>
    super()
    overlay.hide()
    @

  close: =>
    super()
    overlay.remove()
    @
