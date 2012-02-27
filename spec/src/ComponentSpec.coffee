describe "Backpack.Component", ->

  beforeEach ->
    @component = new Backpack.Component


  describe "#initialize", ->

    it "should create a <div>", ->
      nodeName = @component.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @component.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()

    it "should define @$parent", ->
      expect(@component.$parent).toBeDefined()

    describe "options", ->

      beforeEach ->
        @options = @component.options

      it "should have a blank default content", ->
        expect(@options._content).toBeUndefined()

      it "should have 'body' as a default $parent", ->
        expect(@options.parent).toEqual('body')

      it "should set options", ->
        options = (new Backpack.Component { 
                  name: 'test'
                , parent: '#test'
                , content: 'test' }).options
        expect(options.name).toEqual('test')
        expect(options.parent).toEqual('#test')
        expect(options.content).toEqual('test')

    describe "events", ->

      beforeEach ->
        @events = @component.events

      it "should have no events", ->
        expect(@events).toBeUndefined()


  describe "#render", ->

    it "should append the component to it's parent", ->
      parent = $('<div>')
      @component.parent(parent)
      @component.render()
      expect(parent.children().length).toEqual(1)

    it "should return the component for chaining", ->
      parent = $('<div>')
      @component.parent(parent)
      expect(@component.render()).toEqual(@component)

    it "should call the parents #append", ->
      @component.parent('<div>')
      spy = sinon.spy(@component.$parent, 'append')
      @component.render()
      expect(spy).toHaveBeenCalled()
      @component.$parent.append.restore()

  
  describe "#addClass", ->

    it "should add a class to the component", ->
      @component.addClass("test")
      expect(@component.$el.hasClass("test")).toBeTruthy()

    it "should do nothing if passed nothing", ->
      className = @component.$el.className
      @component.addClass()
      expect(@component.$el.className).toEqual(className)

  describe "#removeClass", ->

    it "should remove a class to the component", ->
      @component.addClass("test").removeClass('test')
      expect(@component.$el.hasClass("test")).toBeFalsy()

    it "should do nothing if passed nothing", ->
      className = @component.$el.className
      @component.removeClass()
      expect(@component.$el.className).toEqual(className)


  describe "#parent", ->

    it "should set the component's parent", ->
      parent1 = $('<div>')
      @component.parent(parent1)
      expect(@component.$parent).toEqual(parent1)
      parent2 = $('<ul>')
      @component.parent(parent2)
      expect(@component.$parent).toEqual(parent2)

    it "should do nothing if passed nothing", ->
      parent = @component.$parent
      @component.parent()
      expect(@component.$parent).toEqual(parent)


  describe "#hide", ->

    it "should add the hide class to the component", ->
      @component.show()
      expect(@component.$el.hasClass('hide')).toBeFalsy()
      @component.hide()
      expect(@component.$el.hasClass('hide')).toBeTruthy()

    it "should call #undelegateEvents", ->
      spy = sinon.spy(@component, 'undelegateEvents')
      @component.hide()
      expect(spy).toHaveBeenCalled()
      @component.undelegateEvents.restore()

    it "should call #addClass", ->
      spy = sinon.spy(@component.$el, 'addClass')
      @component.hide()
      expect(spy).toHaveBeenCalled()
      @component.$el.addClass.restore()


  describe "#show", ->

    it "should remove the hide class from the component", ->
      @component.hide()
      expect(@component.$el.hasClass('hide')).toBeTruthy()
      @component.show()
      expect(@component.$el.hasClass('hide')).toBeFalsy()

    it "should call #delegateEvents", ->
      spy = sinon.spy(@component, 'delegateEvents')
      @component.show()
      expect(spy).toHaveBeenCalled()
      @component.delegateEvents.restore()

    it "should call #removeClass", ->
      spy = sinon.spy(@component.$el, 'removeClass')
      @component.show()
      expect(spy).toHaveBeenCalled()
      @component.$el.removeClass.restore()


  describe "#close", ->

    it "should call #hide", ->
      spy = sinon.spy(@component, 'hide')
      @component.close()
      expect(spy).toHaveBeenCalled()
      @component.hide.restore()

    it "should call #remove", ->
      spy = sinon.spy(@component, 'remove')
      @component.close()
      expect(spy).toHaveBeenCalled()
      @component.remove.restore()


  describe "#append", ->

    it "should call $.append", ->
      spy = sinon.spy(@component.$el, 'append')
      @component.append('')
      expect(spy).toHaveBeenCalled()
      @component.$el.append.restore()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()
      @component.setContent.restore()

    it "should do nothing if passed nothing", ->
      testContent = @component.content
      @component.setContent()
      expect(@component.content).toEqual(testContent)


  describe "#prepend", ->

    it "should call $.prepend", ->
      spy = sinon.spy(@component.$el, 'prepend')
      @component.prepend('')
      expect(spy).toHaveBeenCalled()
      @component.$el.prepend.restore()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()
      @component.setContent.restore()

    it "should do nothing if passed nothing", ->
      testContent = @component.content
      @component.setContent()
      expect(@component.content).toEqual(testContent)


  describe "#before", ->

    it "should call $.before", ->
      spy = sinon.spy(@component.$el, 'before')
      @component.before('')
      expect(spy).toHaveBeenCalled()
      @component.$el.before.restore()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()
      @component.setContent.restore()

    it "should do nothing if passed nothing", ->
      @component.content = 'lkja'
      @component.setContent()
      expect(@component.content).toEqual('lkja')


  describe "#after", ->

    it "should call $.after", ->
      spy = sinon.spy(@component.$el, 'after')
      @component.after('')
      expect(spy).toHaveBeenCalled()
      @component.$el.after.restore()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()
      @component.setContent.restore()

    it "should do nothing if passed nothing", ->
      testContent = @component.content
      @component.setContent()
      expect(@component.content).toEqual(testContent)

  
  describe "#content", ->
    
    it "should do nothing if passed nothing", ->
      testContent = 'test'
      @component.content(testContent)
      @component.content()
      expect(@component._content).toEqual(testContent)

    it "should return content if content isn't a View", ->
      testContent = 'test'
      @component.content(testContent)
      expect(@component._content).toEqual(testContent)

    it "should return content.render().el if it's a View", ->
      testContent = new Backbone.View
      spy = sinon.spy(testContent, 'render')
      @component.content(testContent)
      expect(spy).toHaveBeenCalled()
      expect(@component._content).toEqual(testContent.render().el)
      testContent.render.restore()

    it "should return content.el if content.render doesn't exist", ->
      testContent = { el: document.createElement('div') }
      @component.content(testContent)
      expect(@component._content).toEqual(testContent.el)

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.content('test')
      expect(spy).toHaveBeenCalled()