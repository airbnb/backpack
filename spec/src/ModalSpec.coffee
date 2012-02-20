describe "Backpack.Modal", ->

  beforeEach ->
    @modal = new Backpack.Modal

  describe "#initialize", ->

    it "should create a <div>", ->
      nodeName = @modal.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @modal.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()
    
    it "should have a 'backpack-modal' class", ->
      hasClass = @modal.$el.hasClass('backpack-modal')
      expect(hasClass).toBeTruthy()

    it "should call #hide", ->
      spy = sinon.spy(@modal, 'hide')
      @modal.initialize()
      expect(spy).toHaveBeenCalled()
      @modal.hide.restore()

    it "should have a 'hide' class", ->
      hasClass = @modal.$el.hasClass('hide')
      expect(hasClass).toBeTruthy()

    describe "options", ->

      beforeEach ->
        @options = @modal.options
    
      it "should have a blank default name", ->
        expect(@options.name).toEqual('')

      it "should have a blank default content", ->
        expect(@options.content).toEqual('')

      it "should have 'body' as a default parent", ->
        expect(@options.parent).toEqual('body')

      it "should have true as a default overlay", ->
        expect(@options.showOverlay).toBeTruthy()

      it "should have true as a default lock", ->
        expect(@options.lockOverlay).toBeTruthy()

      it "should set options", ->
        options = (new Backpack.Dialog { 
                  name: 'test'
                , parent: '#test'
                , content: 'test' }).options
        expect(options.name).toEqual('test')
        expect(options.parent).toEqual('#test')
        expect(options.content).toEqual('test')