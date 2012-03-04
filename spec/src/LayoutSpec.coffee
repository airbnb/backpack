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

      # it 'should set @_colWidth', ->
      #   expect(@Layout._colWidth).toBeDefined()

  describe '#cols', ->

    it 'should set @_cols', ->
      @Layout.cols(4)
      expect(@Layout._cols).toEqual(4)

    it 'should return if count is not a number', ->
      @Layout.cols(4)
      @Layout.cols('3')
      expect(@Layout._cols).toEqual(4)