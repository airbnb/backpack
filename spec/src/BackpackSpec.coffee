describe 'Backpack', ->

  it 'should be defined', ->
    expect(Backpack).toBeDefined()

  it 'should have a version', ->
    expect(Backpack.VERSION).toBeDefined()

  describe "Backpack's components", ->

    it 'should have a Component', ->
      expect(Backpack.Component).toBeDefined()

    it 'should have a Menu', ->
      expect(Backpack.Menu).toBeDefined()

    it 'should have a MenuItem', ->
      expect(Backpack.MenuItem).toBeDefined()

    it 'should have a Modal', ->
      expect(Backpack.Modal).toBeDefined()

    it 'should have a Dialog', ->
      expect(Backpack.Dialog).toBeDefined()

    it 'should have an Overlay', ->
      expect(Backpack.Overlay).toBeDefined()