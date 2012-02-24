# ## Backpack.Lift
class Backpack.Overlay extends Backpack.Component

  template: """
              <div class='backpack-overlay-outer'>
                <div class='backpack-overlay-inner'>
                  <div class='backpack-overlay-container'></div>
                </div>
              </div>
            """
  events:
    'click': 'unlock'
    'click .backpack-overlay-container': (e) -> e.stopPropagation()

  defaults:
    lockOverlay: false
    color: 'rgba(0,0,0,0.7)'

  initialize: ->
    @addClass('backpack-overlay')
    @append @template
    super()
    @$parent.addClass('overlay')

  render: =>
    @$('.backpack-overlay-container').html(@_content)
    @$parent.prepend(@el)
    @

  content: (content) =>
    return @ unless content?
    @_content = @setContent(content)
    @

  unlock: =>
    @close() unless @_lockOverlay
    @

  close: =>
    super()
    @trigger('overlay-close')
    @
    
  lockOverlay: (lockOverlay) =>
    @_lockOverlay = !!lockOverlay
    @

  color: (color) =>
    @el.style.backgroundColor = color
    @



# ## Backpack.Modal
class Backpack.Modal extends Backpack.Component

  events:
    'click .close': 'close'

  defaults:
    'lockOverlay': true
    'closable': true

  initialize: ->
    super()
    @addClass('backpack-modal')
    @newOverlay()
    @

  show: =>
    super()
    @overlay?.show()
    @

  hide: =>
    super()
    @overlay?.hide()
    @

  close: =>
    super()
    @overlay?.remove()
    @

  closable: =>
    return @ unless !!arguments[0]
    @$el.prepend("<span class='close'>&times;</span>")
    @

  newOverlay: =>
    @overlay = new Backpack.Overlay
      lockOverlay: @options.lockOverlay
      content:     @el
      color:       @options.color
      show:        true
    @overlay.on('overlay-close', @close)
    @

  # addButton: (button) =>
  #   return unless button?
  #   container = @make("div", {"class": "backpack-dialog-button-container"})
  #   $(container).append(button.setParent(container).render().show())
  #   button.on('button-close', @close)
  #   @$el.append(container)
  #   @

