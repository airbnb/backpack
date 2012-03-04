class Backpack.Layout extends Backpack.Component

  tagName: 'div'

  defaults:
    'columns': 1
    'gutter': '30'

  initialize: ->
    @addClass('backpack-layout')
    super()
    @

  add: =>
    @columnWidth()
    for item in arguments
      {content, span} = item
      element = @setContent(content)
      element = @wrap(element, span)
      @append(element)

  columns: (count) =>
    @_cols = count 
    @_remaining = count
    @

  columnWidth: =>
    parentWidth = @$parent.width()
    console.log parentWidth
    console.log 'cols', @_cols
    console.log 'gutter', @_gutter
    availableWidth = parentWidth - (@_cols * (@_gutter))
    console.log 'availableWidth', availableWidth
    @_colWidth = (availableWidth / @_cols)
    console.log 'colWidth', @_colWidth
    @

  gutter: (width) =>
    @css({ 'margin-left': "-#{ width }px" })
    @_gutter = width
    @

  wrap: (el, span) =>
    wrapped = @make('div', { style: "float: left; width: #{@_colWidth * span}px; margin-left: #{ @_gutter }px" }, el)