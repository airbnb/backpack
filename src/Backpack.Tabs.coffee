class Backpack.Tabs extends Backpack.Component

  tagName: 'ul'

  initialize: ->
    @addClass('backpack-tabs clearfix')
    @items = []
    @active = 0
    super()

  add: =>
    for item in arguments
      {content, events, el} = item
      item = _.extend(item, {parent: @})
      if el
        tab = item
      else
        tab = new Backpack.Tab(item)
      @setTab(tab)
    @setActive()
    @

  setTab: (tab) =>
    tab.on('tab-click', @select)
    @append(tab.show().el)
    @items.push(tab)
    @

  setActive: =>
    active = @items[@active]
    active.addClass('backpack-tab-active')
    @select(active)
    @

  # select
  # -------------
  #     @param {Tab} tab
  #     @return {Tabs}
  # 
  select: (tab) =>
    @items[@active].removeClass('backpack-tab-active')
    @active = _.indexOf(@items, tab)
    tab.addClass('backpack-tab-active')
    @$el.next('.backpack-tab-content').remove()
    @after(tab.tabContent.show().el)
    @




class Backpack.Tab extends Backpack.Component

  tagName: 'li'

  template: _.template("<a class='round-top' href='<%= href %>'><%= content %></a>")

  events:
    'click': 'select'

  initialize: ->
    super()
    @addClass('backpack-tab')
    @tabContent = new Backpack.TabContent
      content: @options.tabContent
      parent: @$parent

  render: =>
    @$el.html(@_content)
    @

  content: (content) =>
    return @ unless content?
    content = @setContent(content)
    @_content = @template({ href: 'javascript:void(0);', content: content })
    @

  # **Select** Emits a 'tab-click' event.
  # Passes the selected tab object to
  # those listening to that event.
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