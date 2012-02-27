class Backpack.Tabs extends Backpack.Component

  tagName: 'ul'

  initialize: ->
    @addClass('backpack-tabs clearfix')
    # @items is an array of tab items
    @items = []
    # @active is the index of the current
    # active tab in @items. Defaults to 0
    @active = @options.active ? 0
    super()

  # add
  # -------------
  #     @return {Tabs}
  add: =>
    # iterate over each item in the
    # arguments array
    for item in arguments
      # set the item's parent to this 
      # set of Tabs
      item = _.extend(item, {parent: @})
      if item.el
        # the item is already a View
        tab = item
      else
        tab = new Backpack.Tab(item)
      # setup the added tab
      @setTab(tab)
    # after all the tabs are added
    # set the active tab
    @setActive()
    @

  # setTab
  # -------------
  #     @param {Tab} tab
  #     @return {Tabs}
  setTab: (tab) =>
    # subscribe to 'tab-click' event
    # and call @select when it is
    # triggered
    tab.on('tab-click', @select)
    # subscribe to 'tab-exit' event
    # and call @exit when it is
    # triggered
    tab.on('tab-exit', @exit)
    # add the tab
    @append(tab.show().el)
    @items.push(tab)
    @

  # setActive
  # -------------
  #     @return {Tabs}
  setActive: =>
    activeTab = @items[@active]
    activeTab.addClass('backpack-tab-active')
    @select(activeTab)
    @

  # select
  # -------------
  #     @param {Tab} tab
  #     @return {Tabs}
  select: (tab) =>
    # remove active class from the current @active tab
    curActive = @items[@active]
    curActive.trigger('tab-exit', curActive)
    # set new @active tab
    @active = _.indexOf(@items, tab)
    tab.addClass('backpack-tab-active')
    # remove the previous active tab's tab content
    # and put the current active tab's content in
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

  # select
  # -------------
  #     @returns {Tab}
  select: =>
    # Emits a 'tab-click' event.
    # Passes the selected tab object to
    # those listening to that event
    @trigger('tab-click', @)
    @



class Backpack.TabContent extends Backpack.Component

  initialize: ->
    super()
    @addClass('backpack-tab-content round-bottom')

  render: =>
    @$parent.html(@_content)
    @