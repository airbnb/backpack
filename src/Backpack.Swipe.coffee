class Backpack.Swipe extends Backpack.Component

  id: 'slider'

  config:
    'type': 'swipe'
    'renderType': 'append'
    'startSlide': 0
    'speed': 300
    'auto': 4000
    'continuous': true
    'disableScroll': false
    'callback': ->
    'transitionEnd': ->

  initialize: ->
    super()
    window.s = new window.Swipe(@el, @options)

  content: (slides) =>
    for content in arguments
        @$el.append(content)
    @
