class Backpack.Component extends Backbone.View

  tagName: 'div'
  className: 'backpack-component'

  options:
    name:    ''
    content: ''
    parent:  'body'

  initialize: ->
    @hide()
    @

  render: =>
    @parent.append @el
    @

  show: =>
    @delegateEvents @events
    @$el.removeClass 'hide'
    @

  hide: =>
    @$el.addClass 'hide'
    @undelegateEvents()
    @

  close: =>
    @hide()
    @remove()
    @

  before: (content) =>
    return unless content?
    @setContent content
    @$el.before content
    @
  
  after: (content) =>
    return unless content?
    @setContent content
    @$el.after @content
    @

  append: (content) =>
    return unless content?
    @setContent content
    @$el.append @content
    @

  prepend: (content) =>
    return unless content?
    @setContent content
    @$el.prepend @content
    @

  setContent: (content) =>
    return unless content?
    if content.el?
      if content.render?
        @content = content.render().el
      else
        @content = content.el
    else
      @content = content
    @
  
  setParent: (parent) =>
    return unless parent?
    @parent = $(parent)
    @

  addClass: (klass) =>
    return unless klass?
    @$el.addClass klass
    @