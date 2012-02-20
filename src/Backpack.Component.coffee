class Backpack.Component extends Backbone.View

  tagName: 'div'
  className: 'backpack-component'

  options:
    name:    ''
    content: ''
    parent:  'body'
    hide:    true

  initialize: ->
    @options = _.extend({}, @defaults, @options)
    @setup()
    @

  setup: =>
    {hide, name, content, parent} = @options
    console.log content
    @hide() if hide
    @setParent(parent)
    @setContent(content)
    @addClass(@slug(name))
    @

  render: =>
    @parent.append(@el)
    @

  show: =>
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

  before: (content) =>
    return unless content?
    @setContent(content)
    @$el.before(content)
    @
  
  after: (content) =>
    return unless content?
    @setContent(content)
    @$el.after(@content)
    @

  append: (content) =>
    return unless content?
    @setContent(content)
    @$el.append(@content)
    @

  prepend: (content) =>
    return unless content?
    @setContent(content)
    @$el.prepend(@content)
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

    @$el.html(@content)
    @
  
  setParent: (parent) =>
    return unless parent?
    @parent = $(parent)
    @

  addClass: (klass) =>
    return unless klass?
    @$el.addClass(klass)
    @
  
  removeClass: (klass) =>
    return unless klass?
    @$el.removeClass(klass)
    @

  slug: (string) =>
    return unless string?
    string
      .toLowerCase()
      .replace(/\ +/g, "-")
      .replace(/[^a-z0-9-]/g, "")