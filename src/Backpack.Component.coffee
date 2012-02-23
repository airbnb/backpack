class Backpack.Component extends Backbone.View

  tagName: 'div'
  className: 'backpack-component'

  options:
    'parent': 'body'

  initialize: ->
    @options = _.extend({}, @defaults, @options)
    for func, args of @options
      unless _.isArray(args)
        @[func]?.call(@, args)
      else
        @[func]?.apply(@, args)
      null

  render: =>
    @$parent.append(@el)
    @

  show: =>
    @render()
    @delegateEvents(@events)
    @$el.removeClass('hide')
    @

  hide: =>
    @$el.addClass('hide')
    @undelegateEvents()
    @

  close: =>
    @hide()
    @remove()
    @

  remove: =>
    @undelegateEvents()
    super()
    @

  before: (content) =>
    return @ unless content?
    content = @setContent(content)
    @$el.before(content)
    @
  
  after: (content) =>
    return @ unless content?
    content = @setContent(content)
    @$el.after(content)
    @

  append: (content) =>
    return @ unless content?
    content = @setContent(content)
    @$el.append(content)
    @

  prepend: (content) =>
    return @ unless content?
    content = @setContent(content)
    @$el.prepend(content)
    @

  setContent: (content) =>
    return @ unless content?
    if content.el?
      if content.render?
        content = content.render().el
      else
        content = content.el
    else
      content = content

  content: (content) =>
    return @ unless content?
    @_content = @setContent(content)
    wrappedContent = @make('div', {class: 'content'}, @_content)
    @$el.append(wrappedContent)
    @

  parent: (parent) =>
    return @ unless parent?
    @$parent = $(parent)
    @

  class: (klass) =>
    @addClass(klass)
    @

  addClass: (klass) =>
    return @ unless klass?
    @$el.addClass(klass)
    @
  
  removeClass: (klass) =>
    return @ unless klass?
    @$el.removeClass(klass)
    @

  bump: (direction) =>
    return @ unless direction?
    @addClass("bump-#{direction}")
    @

  slug: (string) =>
    return @ unless string?
    string
      .toLowerCase()
      .replace(/\ +/g, "-")
      .replace(/[^a-z0-9-]/g, "")