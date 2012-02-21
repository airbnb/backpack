class Backpack.Button extends Backpack.Component

  tagName: 'button'

  events:
    'click': -> @trigger('button-close')

  initialize: ->
    super()
    @addClass 'backpack-button'
    @

  