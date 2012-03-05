class Backpack.Layout extends Backpack.Component

  tagName: 'div'

  defaults:
    'columns': 1
    'gutter': '30'

  initialize: ->
    @addClass('backpack-layout clearfix')
    super()
    @

  add: =>
    @columnWidth()
    for item in arguments
      {content, span} = item
      span = @_remaining unless span
      @_remaining = @_remaining - span
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
    wrapped = @make('div', { style: "float: left; width: #{@_colWidth * span}px; margin-left: #{@_gutter}px" }, el)