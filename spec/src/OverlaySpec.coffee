describe "Backpack.Overlay", ->

  beforeEach ->
    @overlay = new Backpack.Overlay

  describe "#initialize", ->
    it "should create a <div>", ->
      nodeName = @overlay.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @overlay.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()
    
    it "should have a 'backpack-overlay' class", ->
      hasClass = @overlay.$el.hasClass('backpack-overlay')
      expect(hasClass).toBeTruthy()

    it "should call #hide", ->
      spy = sinon.spy(@overlay, 'hide')
      @overlay.initialize()
      expect(spy).toHaveBeenCalled()
      @overlay.hide.restore()

    it "should have a 'hide' class", ->
      hasClass = @overlay.$el.hasClass('hide')
      expect(hasClass).toBeTruthy()

    describe "options", ->

      beforeEach ->
        @options = @overlay.options
    
      it "should have a blank default name", ->
        expect(@options.name).toEqual('')

      it "should have a blank default content", ->
        expect(@options.content).toEqual('')

      it "should have 'body' as a default parent", ->
        expect(@options.parent).toEqual('body')

      it "should have false as a default lockOverlay", ->
        expect(@options.lockOverlay).toBeFalsy()

      it "should have rgba(0,0,0,0.7) as a default color", ->
        expect(@options.color).toEqual("rgba(0,0,0,0.7)")

      it "should set options", ->
        options = (new Backpack.Dialog { 
                  name: 'test'
                , parent: '#test'
                , content: 'test'
                , color: 'blue'
                , lockOverlay: false }).options
        expect(options.name).toEqual('test')
        expect(options.parent).toEqual('#test')
        expect(options.content).toEqual('test')
        expect(options.color).toEqual('blue')
        expect(options.lockOverlay).toBeFalsy()

    describe "events", ->

      beforeEach ->
        @events = @overlay.events

      it "should have events defined", ->
        expect(@events).toBeDefined()

      it "should have a click event", ->
        expect(@events.click).toBeDefined()

      it "should call unlock on click", ->
        overlay = new Backpack.Overlay
        spy = sinon.spy(overlay, 'unlock')
        overlay.render().show()
        overlay.$el.trigger('click')
        expect(spy).toHaveBeenCalled()
        overlay.unlock.restore()

  describe "#render", ->

    it "should call parent's prepend", ->
      spy = sinon.spy(@overlay.parent, 'prepend')
      @overlay.render()
      expect(spy).toHaveBeenCalled()
      @overlay.parent.prepend.restore()

  describe "#unlock", ->

    it "should call #close if lockOverlay is false", ->
      spy = sinon.spy(@overlay, 'close')
      @overlay.render().unlock()
      expect(spy).toHaveBeenCalled()
      @overlay.close.restore()

  describe "#close", ->

    it "should trigger 'overlay-close'", ->
      spy = sinon.spy(@overlay, 'trigger')
      @overlay.render().close()
      expect(spy).toHaveBeenCalledWith('overlay-close')
      @overlay.trigger.restore()

  describe "#setlock", ->

    it "should set lockOverlay appropriately", ->
      @overlay.setLock(false)
      expect(@overlay.lockOverlay).toBeFalsy()
      @overlay.setLock()
      expect(@overlay.lockOverlay).toBeFalsy()
      @overlay.setLock(true)
      expect(@overlay.lockOverlay).toBeTruthy()