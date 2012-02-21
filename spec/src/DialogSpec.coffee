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

    it "should have a 'hide' class", ->
      hasClass = @dialog.$el.hasClass('hide')
      expect(hasClass).toBeTruthy()

    describe "options", ->

      beforeEach ->
        @options = @dialog.options
    
      it "should have a blank default name", ->
        expect(@options.class).toEqual('')

      it "should have a blank default content", ->
        expect(@options._content).toEqual('')

      it "should have 'body' as a default parent", ->
        expect(@options.$parent).toEqual('body')

      it "should have false as a default overlay", ->
        expect(@options.showOverlay).toBeFalsy()

      it "should have false as a default lock", ->
        expect(@options.lockOverlay).toBeFalsy()

    describe "events", ->

      beforeEach ->
        @events = @dialog.events

      it "should have events defined", ->
        expect(@events).toBeDefined()

      it "should have a click event", ->
        expect(@events['click .close']).toBeDefined()

      it "should call #close when click event triggered", ->
        spy = sinon.spy(@dialog, 'close')
        @dialog.render()
        @dialog.show()
        @dialog.$el.find('.close').trigger('click')
        expect(spy).toHaveBeenCalled()
        @dialog.close.restore()

  describe "overlay", ->

    it "should not exist on default initialization", ->
      expect(@dialog.overlay).toBeUndefined()

    describe "#showOverlay", ->

      it "should create an Overlay if showOverlay set to true", ->
        dialog = new Backpack.Dialog({ showOverlay: true })
        expect(dialog.overlay).toBeDefined()

      it "should set showOverlay based on arguments", ->
        dialog1 = new Backpack.Dialog({ showOverlay: true })
        dialog2 = new Backpack.Dialog({ showOverlay: false })
        expect(dialog1.options.showOverlay).toBeTruthy()
        expect(dialog2.options.showOverlay).toBeFalsy()

    describe "options.lockOverlay", ->

      it "should set lockOverlay based on arguments", ->
        dialog1 = new Backpack.Dialog({ showOverlay: true, lockOverlay: true })
        dialog2 = new Backpack.Dialog({ showOverlay: true, lockOverlay: false })
        expect(dialog1.overlay._lockOverlay).toBeTruthy()
        expect(dialog2.overlay._lockOverlay).toBeFalsy()

describe "it has an overlay", ->

  beforeEach ->
    @oDialog = new Backpack.Dialog({ showOverlay: true })

  describe "#show", ->

    it "should render and show it's overlay", ->
      spyShow = sinon.spy(@oDialog.overlay, 'show')
      spyRender = sinon.spy(@oDialog.overlay, 'render')
      @oDialog.show()
      expect(spyShow).toHaveBeenCalled()
      expect(spyRender).toHaveBeenCalled()
      @oDialog.overlay.show.restore()
      @oDialog.overlay.render.restore()

  describe "#hide", ->

    it "should hide it's overlay", ->
      spy = sinon.spy(@oDialog.overlay, 'hide')
      @oDialog.hide()
      expect(spy).toHaveBeenCalled()
      @oDialog.overlay.hide.restore()

  describe "#close", ->

    it "should remove it's overlay", ->
      spy = sinon.spy(@oDialog.overlay, 'remove')
      @oDialog.close()
      expect(spy).toHaveBeenCalled()
      @oDialog.overlay.remove.restore()

  describe "options._lockOverlay is false", ->

    it "should trigger 'overlay-close' when the overlay is clicked", ->
      dialog = new Backpack.Dialog({ showOverlay: true, lockOverlay: false })
      spy = sinon.spy(dialog.overlay, 'trigger')
      dialog.render().show()
      dialog.overlay.$el.trigger('click')
      expect(spy).toHaveBeenCalledWith('overlay-close')