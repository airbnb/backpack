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
      if el
        tab = item
      else
        tab = new Backpack.Tab(item)
      @append(tab.show().el)
      @items.push(tab)
    @setItems()
    @

  setItems: =>
    first = _.first(@items)
    last = _.last(@items)
    active = @items[@active]
    first.addClass('backpack-tab-first')
    last.addClass('backpack-tab-last')
    active.addClass('backpack-tab-active')
    @



class Backpack.Tab extends Backpack.Clickable

  tagName: 'li'

  initialize: ->
    super()
    @addClass('backpack-tab')
    {tabContent} = @options
    @tabContent = new Backpack.TabContent({content: tabContent})



class Backpack.TabContent extends Backpack.Component

  initialize: ->
    super()
    @addClass('backpack-tab-content')