describe 'Backpack.Menu', ->

  beforeEach ->
    @menu = new Backpack.Menu


  describe 'instantiation', ->    

    it 'should create a <ul>', ->
      expect(@menu.el.nodeName).toEqual("UL")