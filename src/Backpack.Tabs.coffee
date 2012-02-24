class Backpack.Tabs extends Backpack.Component

  tagName: 'ul'

  items: []
  active: 0

  initialize: ->
    super()
    @addClass('backpack-tabs')
    @contentArea = "<div class='backpack-tab-content-area'/>"
    @after(@contentArea)

  add: =>
    for item in arguments
      {content, events, el} = item
      item = _.extend(item, {parent: @})
      if el
        tab = item
      else
        tab = new Backpack.Tab(item)
      @setTab(tab)
    @setItems()
    @

  setTab: (tab) =>
    tab.on('tab-click', @select)
    @append(tab.show().el)
    @items.push(tab)
    @

  setItems: =>
    first  = _.first(@items)
    last   = _.last(@items)
    active = @items[@active]
    first.addClass('backpack-tab-first')
    last.addClass('backpack-tab-last')
    active.addClass('backpack-tab-active')
    @

  select: (tab) =>
    @active = _.indexOf(@items, tab)
    @.$('.backpack-tab').removeClass('backpack-tab-active')
    tab.addClass('backpack-tab-active')
    console.log tab.tabContent
    $('backpack-tab-content-area').html(tab.tabContent.render().el)
    console.log @active
    @




class Backpack.Tab extends Backpack.Component

  tagName: 'li'

  template: _.template("<a href='<%= href %>'><%= content %></a>")

  events:
    'click': 'select'

  initialize: ->
    super()
    @addClass('backpack-tab')
    {tabContent} = @options
    @tabContent = new Backpack.TabContent({ content: tabContent, parent: '.backpack-tab-content-area' })

  render: =>
    @$el.html(@_content)
    @

  content: (content) =>
    return @ unless content?
    content = @setContent(content)
    @_content = @template({ href: 'javascript:void(0);', content: content })
    @

  select: =>
    @trigger('tab-click', @)
    @



class Backpack.TabContent extends Backpack.Component

  initialize: ->
    super()
    @addClass('backpack-tab-content')

  render: =>
    @$parent.html(@_content)
    @