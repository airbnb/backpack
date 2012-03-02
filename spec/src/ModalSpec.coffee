describe "Backpack.Modal", ->

  beforeEach ->
    @Modal = new Backpack.Modal({ hide: true })

  afterEach ->
    @Modal.remove()


  describe "#initialize", ->

    it "should create a <div>", ->
      nodeName = @Modal.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @Modal.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()
    
    it "should have a 'backpack-Modal' class", ->
      hasClass = @Modal.$el.hasClass('backpack-modal')
      expect(hasClass).toBeTruthy() 

    describe "options", ->

      beforeEach ->
        @options = @Modal.options

      it "should have a blank default content", ->
        expect(@options._content).toBeUndefined()

      it "should have 'body' as a default parent", ->
        expect(@options.parent).toEqual('body')

      it "should have false as a default lock", ->
        expect(@options._lockOverlay).toBeFalsy()

    describe "events", ->

      beforeEach ->
        @events = @Modal.events

      it "should have events defined", ->
        expect(@events).toBeDefined()

      it "should have a click event", ->
        expect(@events['click .close']).toBeDefined()

      it "should call #close when click event triggered", ->
        spy = sinon.spy(@Modal, 'close')
        @Modal.render()
        @Modal.show()
        @Modal.$el.find('.close').trigger('click')
        expect(spy).toHaveBeenCalled()
        @Modal.close.restore()

  describe "overlay", ->

    it "should exist on default initialization", ->
      expect(@Modal.overlay).toBeDefined()

    describe "options._lockOverlay", ->

      it "should set lockOverlay based on arguments", ->
        Modal1 = new Backpack.Modal({ lockOverlay: true, hide: true })
        Modal2 = new Backpack.Modal({ lockOverlay: false, hide: true })
        expect(Modal1.overlay._lockOverlay).toBeTruthy()
        expect(Modal2.overlay._lockOverlay).toBeFalsy()
        Modal1.remove()
        Modal2.remove()

describe "it has an overlay", ->

  beforeEach ->
    @oModal = new Backpack.Modal({ hide: true })

  afterEach ->
   @oModal.remove()

  describe "#show", ->

    it "should render and show it's overlay", ->
      spyShow = sinon.spy(@oModal.overlay, 'show')
      spyRender = sinon.spy(@oModal.overlay, 'render')
      @oModal.show()
      expect(spyShow).toHaveBeenCalled()
      expect(spyRender).toHaveBeenCalled()
      @oModal.overlay.show.restore()
      @oModal.overlay.render.restore()

  describe "#hide", ->

    it "should hide it's overlay", ->
      spy = sinon.spy(@oModal.overlay, 'hide')
      @oModal.hide()
      expect(spy).toHaveBeenCalled()
      @oModal.overlay.hide.restore()

  describe "#close", ->

    it "should remove it's overlay", ->
      spy = sinon.spy(@oModal.overlay, 'remove')
      @oModal.close()
      expect(spy).toHaveBeenCalled()
      @oModal.overlay.remove.restore()

  describe "options._lockOverlay is false", ->

    it "should trigger 'overlay-close' when the overlay is clicked", ->
      Modal = new Backpack.Modal({ lockOverlay: false, hide: true })
      spy = sinon.spy(Modal.overlay, 'trigger')
      Modal.render().show()
      Modal.overlay.$el.trigger('click')
      expect(spy).toHaveBeenCalledWith('overlay-close')
      Modal.remove()