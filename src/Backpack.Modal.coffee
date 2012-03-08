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

  config:
    'type': 'overlay'
    'color': 'rgba(0,0,0,0.7)'
    'renderType': 'prepend'
    'lockOverlay': false

  initialize: ->
    @append @template
    super()

  render: =>
    @.$('.backpack-overlay-container').html(@_content)
    super()
    @

  content: (content) =>
    return @ unless content?
    @_content = @setContent(content)
    @

  show: =>
    super()
    @$parent.addClass('overlay')
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

  remove: =>
    @$parent.removeClass('overlay')
    super()
    @



# ## Backpack.Modal
class Backpack.Modal extends Backpack.Component

  events:
    'click .close': 'close'

  config:
    'type': 'modal'
    'closable': true
    'lockOverlay': true

  initialize: ->
    super()
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

  remove: =>
    super()
    @overlay?.remove()
    @

  title: (title) =>
    @_title = title
    @prepend("<span class='title'>#{title}</span>")
    @

  closable: =>
    return @ unless !!arguments[0]
    @prepend("<span class='close'>&times;</span>")
    @

  newOverlay: =>
    @overlay = new Backpack.Overlay
      lockOverlay: @options.lockOverlay
      content:     @el
      color:       @options.color
    @overlay.on('overlay-close', @close)
    @
