class Backpack.Layout extends Backpack.Component

  tagName: 'div'

  config:
    'type': 'layout'
    'columns': 1
    'gutter': '30'
    'visible': true

  initialize: ->
    @addClass('clearfix')
    super()
    @

  add: =>
    @columns(arguments.length)
    @columnWidth()

    for item in arguments
      if _.isFunction(item)
        content = item
      else
        {content, span} = item
      span or= 1
      element = @setContent(content)
      element = @wrap(element, span)
      @append(element)

  columns: (count) =>
    @_cols = count 
    @_remaining = count
    @

  columnWidth: =>
    parentWidth = @$parent.width()
    availableWidth = parentWidth - (@_cols * @_gutter)
    @_colWidth = (availableWidth / @_cols)
    @

  gutter: (width) =>
    @css({ 'margin-left': "-#{ width }px" })
    @_gutter = width
    @

  wrap: (el, span) =>
    style = "float: left; width: #{@_colWidth*span}px; margin-left: #{@_gutter}px"
    wrapped = @make('div', {style}, el)