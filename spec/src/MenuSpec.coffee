describe 'Backpack.Menu', ->

  beforeEach ->
    @menu = new Backpack.Menu({ hide: true })


  describe 'instantiation', ->    

    it 'should create a <ul>', ->
      expect(@menu.el.nodeName).toEqual("UL")