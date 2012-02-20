describe "Backpack.Dialog", ->

  beforeEach ->
    @dialog = new Backpack.Dialog


  describe "#initialize", ->

    it "should create a <div>", ->
      nodeName = @dialog.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @dialog.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()
    
    it "should have a 'backpack-dialog' class", ->
      hasClass = @dialog.$el.hasClass('backpack-dialog')
      expect(hasClass).toBeTruthy()

    it "should call #hide", ->
      spy = sinon.spy(@dialog, 'hide')
      @dialog.initialize()
      expect(spy).toHaveBeenCalled()

    it "should have a 'hide' class", ->
      # console.log @modal.render().el
      hasClass = @dialog.$el.hasClass('hide')
      expect(hasClass).toBeTruthy()

    # describe "options", ->

    #   beforeEach ->
    #     @options = @component.options
    
    #   it "should have a blank default name", ->
    #     expect(@options.name).toEqual('')

    #   it "should have a blank default content", ->
    #     expect(@options.content).toEqual('')

    #   it "should have 'body' as a default parent", ->
    #     expect(@options.parent).toEqual('body')

    #   it "should set options", ->
    #     options = (new Backpack.Component { 
    #               name: 'test'
    #             , parent: '#test'
    #             , content: 'test' }).options
    #     expect(options.name).toEqual('test')
    #     expect(options.parent).toEqual('#test')
    #     expect(options.content).toEqual('test')