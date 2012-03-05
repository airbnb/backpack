describe 'LayoutSpec', ->

  beforeEach ->
    @Layout = new Backpack.Layout

  afterEach ->
    @Layout.remove()

  describe '#initialize', ->

    it 'should create a section', ->
      nodeName = @Layout.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @Layout.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()
    
    it "should have a 'backpack-layout' class", ->
      hasClass = @Layout.$el.hasClass('backpack-layout')
      expect(hasClass).toBeTruthy() 

    describe 'defaults', ->

      it 'should have 1 for default _cols', ->
        expect(@Layout._cols).toEqual(1)

  describe '#cols', ->

    it 'should set @_cols', ->
      @Layout.columns(4)
      expect(@Layout._cols).toEqual(4)