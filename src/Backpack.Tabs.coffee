class Backpack.Tabs extends Backpack.Component

  tagName: 'ul'

  initialize: ->
    @addClass('backpack-tabs clearfix')
    @items = []
    @active = @options.active ? 0
    super()

  add: =>
    for item in arguments
      item = _.extend(item, {parent: @})
      if item.el
        tab = item
      else
        tab = new Backpack.Tab(item)
      @setTab(tab)
    @setActive()
    @

  setTab: (tab) =>
    tab.on('tab-click', @select)
    tab.on('tab-exit', @exit)
    @append(tab.show().el)
    @items.push(tab)
    @

  setActive: =>
    activeTab = @items[@active]
    activeTab.addClass('backpack-tab-active')
    @select(activeTab)
    @

  select: (tab) =>
    curActive = @items[@active]
    curActive.trigger('tab-exit', curActive)
    @active = _.indexOf(@items, tab)
    tab.addClass('backpack-tab-active')
    @$el.next('.backpack-tab-content').remove()
    @after(tab.tabContent.show().el)
    @

  exit: (tab) =>
    tab.removeClass('backpack-tab-active')
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
      parent:  @$parent

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
    @addClass('backpack-tab-content round-bottom')

  render: =>
    @$parent.html(@_content)
    @