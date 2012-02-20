# ## Backpack.Overlay
class Backpack.Dialog extends Backpack.Component

  events:
    'click': 'close'

  initialize: ->
    super()
    @addClass('backpack-dialog')
    {name, parent, content} = @options
    @setContent(content)
    @setParent(parent)
    @addClass(name)
    @



# ## Backpack.Overlay
class Backpack.Overlay extends Backpack.Component

  options:
    lock:   false
    parent: 'body'
    color:  'rgba(0,0,0,0.7)'

  events:
    'click': 'unlock'

  initialize: ->
    super()
    {lock, parent, color} = @options
    @addClass('backpack-overlay')
    @setLock(lock)
    @setParent(parent)
    @setColor(color)
    @

  render: =>
    console.log @parent, @options, @option
    @$el.prependTo(@parent)
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
    @setLock(lock)
    @




# ## Backpack.Modal
class Backpack.Modal extends Backpack.Dialog

  events:
    'click': 'close'

  overlay = new Backpack.Overlay()

  initialize: ->
    super()
    @addClass('backpack-modal')
    @
  
  show: =>
    super()
    console.log(overlay)
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
