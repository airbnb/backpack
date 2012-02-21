# ## Backpack.Overlay
class Backpack.Overlay extends Backpack.Component

  events:
    'click': 'unlock'

  defaults:
    'lockOverlay': false
    'color': 'rgba(0,0,0,0.7)'

  initialize: ->
    super()
    @addClass('backpack-overlay')
    @

  render: =>
    @$parent.prepend(@el)
    @
    
  unlock: =>
    @close() unless @_lockOverlay
    @

  close: =>
    super()
    @trigger('overlay-close')
    @
    
  lockOverlay: (@_lockOverlay) =>
    @
  
  color: (color) =>
    @el.style.backgroundColor = color
    @



# ## Backpack.Dialog
class Backpack.Dialog extends Backpack.Component

  events:
    'click .close': 'close'

  defaults:
    'lockOverlay': false
    'showOverlay': false
    'closable': true

  initialize: ->
    super()
    @addClass('backpack-dialog')
    @

  closable: =>
    @$el.prepend("<span class='close'>×</span>")
    @

  showOverlay: (show) =>
    return @ unless show
    @overlay = new Backpack.Overlay
      lockOverlay: @options.lockOverlay
    @overlay.on('overlay-close', @close)
    @

  show: =>
    super()
    @overlay?.render().show()
    @

  hide: =>
    super()
    @overlay?.hide()
    @

  close: =>
    super()
    @overlay?.remove()
    @

  # addButton: (button) =>
  #   return unless button?
  #   container = @make("div", {"class": "backpack-dialog-button-container"})
  #   $(container).append(button.setParent(container).render().show())
  #   button.on('button-close', @close)
  #   @$el.append(container)
  #   @



# ## Backpack.Modal
class Backpack.Modal extends Backpack.Dialog

  defaults:
    'lockOverlay': true
    'showOverlay': true
    'closable': true

  initialize: ->
    super(@defaults)
    @addClass('backpack-modal')
    @
