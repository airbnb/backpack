(function() {

  describe('BackpackSpec', function() {
    it('should be defined', function() {
      return expect(Backpack).toBeDefined();
    });
    it('should have a version', function() {
      return expect(Backpack.VERSION).toBeDefined();
    });
    return describe("Backpack's components", function() {
      it('should have a Component', function() {
        return expect(Backpack.Component).toBeDefined();
      });
      it('should have a Menu', function() {
        return expect(Backpack.Menu).toBeDefined();
      });
      it('should have a MenuItem', function() {
        return expect(Backpack.MenuItem).toBeDefined();
      });
      it('should have a Modal', function() {
        return expect(Backpack.Modal).toBeDefined();
      });
      it('should have an Overlay', function() {
        return expect(Backpack.Overlay).toBeDefined();
      });
      return it('should have a Layout', function() {
        return expect(Backpack.Layout).toBeDefined();
      });
    });
  });

  describe("Backpack.Component", function() {
    beforeEach(function() {
      return this.component = new Backpack.Component({
        hide: true
      });
    });
    describe("#initialize", function() {
      it("should create a <div>", function() {
        var nodeName;
        nodeName = this.component.el.nodeName;
        return expect(nodeName).toEqual('DIV');
      });
      it("should have a 'backpack-component' class", function() {
        var hasClass;
        hasClass = this.component.$el.hasClass('backpack-component');
        return expect(hasClass).toBeTruthy();
      });
      it("should define @$parent", function() {
        return expect(this.component.$parent).toBeDefined();
      });
      describe("options", function() {
        beforeEach(function() {
          return this.options = this.component.options;
        });
        it("should have a blank default content", function() {
          return expect(this.options._content).toBeUndefined();
        });
        it("should have 'body' as a default $parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        return it("should set options", function() {
          var options;
          options = (new Backpack.Component({
            name: 'test',
            parent: '#test',
            hide: true,
            content: ''
          })).options;
          expect(options.name).toEqual('test');
          expect(options.parent).toEqual('#test');
          return expect(options.content).toEqual('');
        });
      });
      return describe("events", function() {
        beforeEach(function() {
          return this.events = this.component.events;
        });
        return it("should have no events", function() {
          return expect(this.events).toBeUndefined();
        });
      });
    });
    describe("#render", function() {
      it("should append the component to it's parent", function() {
        var parent;
        parent = $('<div>');
        this.component.parent(parent);
        this.component.render();
        return expect(parent.children().length).toEqual(1);
      });
      it("should return the component for chaining", function() {
        var parent;
        parent = $('<div>');
        this.component.parent(parent);
        return expect(this.component.render()).toEqual(this.component);
      });
      return it("should call the parents #append", function() {
        var spy;
        this.component.parent('<div>');
        spy = sinon.spy(this.component.$parent, 'append');
        this.component.render();
        expect(spy).toHaveBeenCalled();
        return this.component.$parent.append.restore();
      });
    });
    describe("#addClass", function() {
      it("should add a class to the component", function() {
        this.component.addClass("test");
        return expect(this.component.$el.hasClass("test")).toBeTruthy();
      });
      return it("should do nothing if passed nothing", function() {
        var className;
        className = this.component.$el.className;
        this.component.addClass();
        return expect(this.component.$el.className).toEqual(className);
      });
    });
    describe("#removeClass", function() {
      it("should remove a class to the component", function() {
        this.component.addClass("test").removeClass('test');
        return expect(this.component.$el.hasClass("test")).toBeFalsy();
      });
      return it("should do nothing if passed nothing", function() {
        var className;
        className = this.component.$el.className;
        this.component.removeClass();
        return expect(this.component.$el.className).toEqual(className);
      });
    });
    describe("#parent", function() {
      it("should set the component's parent", function() {
        var parent1, parent2;
        parent1 = $('<div>');
        this.component.parent(parent1);
        expect(this.component.$parent).toEqual(parent1);
        parent2 = $('<ul>');
        this.component.parent(parent2);
        return expect(this.component.$parent).toEqual(parent2);
      });
      return it("should do nothing if passed nothing", function() {
        var parent;
        parent = this.component.$parent;
        this.component.parent();
        return expect(this.component.$parent).toEqual(parent);
      });
    });
    describe("#hide", function() {
      it("should add the hide class to the component", function() {
        this.component.show();
        expect(this.component.$el.hasClass('hide')).toBeFalsy();
        this.component.hide();
        return expect(this.component.$el.hasClass('hide')).toBeTruthy();
      });
      it("should call #undelegateEvents", function() {
        var spy;
        spy = sinon.spy(this.component, 'undelegateEvents');
        this.component.hide();
        expect(spy).toHaveBeenCalled();
        return this.component.undelegateEvents.restore();
      });
      return it("should call #addClass", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'addClass');
        this.component.hide();
        expect(spy).toHaveBeenCalled();
        return this.component.$el.addClass.restore();
      });
    });
    describe("#show", function() {
      it("should remove the hide class from the component", function() {
        this.component.hide();
        expect(this.component.$el.hasClass('hide')).toBeTruthy();
        this.component.show();
        return expect(this.component.$el.hasClass('hide')).toBeFalsy();
      });
      it("should call #delegateEvents", function() {
        var spy;
        spy = sinon.spy(this.component, 'delegateEvents');
        this.component.show();
        expect(spy).toHaveBeenCalled();
        return this.component.delegateEvents.restore();
      });
      return it("should call #removeClass", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'removeClass');
        this.component.show();
        expect(spy).toHaveBeenCalled();
        return this.component.$el.removeClass.restore();
      });
    });
    describe("#close", function() {
      it("should call #hide", function() {
        var spy;
        spy = sinon.spy(this.component, 'hide');
        this.component.close();
        expect(spy).toHaveBeenCalled();
        return this.component.hide.restore();
      });
      return it("should call #remove", function() {
        var spy;
        spy = sinon.spy(this.component, 'remove');
        this.component.close();
        expect(spy).toHaveBeenCalled();
        return this.component.remove.restore();
      });
    });
    describe("#append", function() {
      it("should call $.append", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'append');
        this.component.append('');
        expect(spy).toHaveBeenCalled();
        return this.component.$el.append.restore();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        expect(spy).toHaveBeenCalled();
        return this.component.setContent.restore();
      });
      return it("should do nothing if passed nothing", function() {
        var testContent;
        testContent = this.component.content;
        this.component.setContent();
        return expect(this.component.content).toEqual(testContent);
      });
    });
    describe("#prepend", function() {
      it("should call $.prepend", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'prepend');
        this.component.prepend('');
        expect(spy).toHaveBeenCalled();
        return this.component.$el.prepend.restore();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        expect(spy).toHaveBeenCalled();
        return this.component.setContent.restore();
      });
      return it("should do nothing if passed nothing", function() {
        var testContent;
        testContent = this.component.content;
        this.component.setContent();
        return expect(this.component.content).toEqual(testContent);
      });
    });
    describe("#before", function() {
      it("should call $.before", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'before');
        this.component.before('');
        expect(spy).toHaveBeenCalled();
        return this.component.$el.before.restore();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        expect(spy).toHaveBeenCalled();
        return this.component.setContent.restore();
      });
      return it("should do nothing if passed nothing", function() {
        this.component.content = 'lkja';
        this.component.setContent();
        return expect(this.component.content).toEqual('lkja');
      });
    });
    describe("#after", function() {
      it("should call $.after", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'after');
        this.component.after('');
        expect(spy).toHaveBeenCalled();
        return this.component.$el.after.restore();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        expect(spy).toHaveBeenCalled();
        return this.component.setContent.restore();
      });
      return it("should do nothing if passed nothing", function() {
        var testContent;
        testContent = this.component.content;
        this.component.setContent();
        return expect(this.component.content).toEqual(testContent);
      });
    });
    return describe("#content", function() {
      it("should do nothing if passed nothing", function() {
        var testContent;
        testContent = '';
        this.component.content(testContent);
        this.component.content();
        return expect(this.component._content).toEqual(testContent);
      });
      it("should return content if content isn't a View", function() {
        var testContent;
        testContent = '';
        this.component.content(testContent);
        return expect(this.component._content).toEqual(testContent);
      });
      it("should return content.render().el if it's a View", function() {
        var spy, testContent;
        testContent = new Backbone.View({
          hide: true
        });
        spy = sinon.spy(testContent, 'render');
        this.component.content(testContent);
        expect(spy).toHaveBeenCalled();
        expect(this.component._content).toEqual(testContent.render().el);
        return testContent.render.restore();
      });
      it("should return content.el if content.render doesn't exist", function() {
        var testContent;
        testContent = {
          el: document.createElement('div')
        };
        this.component.content(testContent);
        return expect(this.component._content).toEqual(testContent.el);
      });
      return it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.content('');
        return expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('dependencies', function() {
    it('should have $', function() {
      return expect($).toBeDefined();
    });
    it('should have Underscore', function() {
      return expect(_).toBeDefined();
    });
    it('should have Backbone', function() {
      return expect(Backbone).toBeDefined();
    });
    return it('should have Backbone', function() {
      return expect(Backpack).toBeDefined();
    });
  });

  describe('LayoutSpec', function() {
    beforeEach(function() {
      return this.Layout = new Backpack.Layout;
    });
    afterEach(function() {
      return this.Layout.remove();
    });
    describe('#initialize', function() {
      it('should create a section', function() {
        var nodeName;
        nodeName = this.Layout.el.nodeName;
        return expect(nodeName).toEqual('DIV');
      });
      it("should have a 'backpack-component' class", function() {
        var hasClass;
        hasClass = this.Layout.$el.hasClass('backpack-component');
        return expect(hasClass).toBeTruthy();
      });
      it("should have a 'backpack-layout' class", function() {
        var hasClass;
        hasClass = this.Layout.$el.hasClass('backpack-layout');
        return expect(hasClass).toBeTruthy();
      });
      return describe('defaults', function() {
        return it('should have 1 for default _cols', function() {
          return expect(this.Layout._cols).toEqual(1);
        });
      });
    });
    return describe('#cols', function() {
      it('should set @_cols', function() {
        this.Layout.cols(4);
        return expect(this.Layout._cols).toEqual(4);
      });
      return it('should return if count is not a number', function() {
        this.Layout.cols(4);
        this.Layout.cols('3');
        return expect(this.Layout._cols).toEqual(4);
      });
    });
  });

  describe('Backpack.Menu', function() {
    beforeEach(function() {
      return this.menu = new Backpack.Menu({
        hide: true
      });
    });
    return describe('instantiation', function() {
      return it('should create a <ul>', function() {
        return expect(this.menu.el.nodeName).toEqual("UL");
      });
    });
  });

  describe("Backpack.Modal", function() {
    beforeEach(function() {
      return this.Modal = new Backpack.Modal({
        hide: true
      });
    });
    afterEach(function() {
      return this.Modal.remove();
    });
    describe("#initialize", function() {
      it("should create a <div>", function() {
        var nodeName;
        nodeName = this.Modal.el.nodeName;
        return expect(nodeName).toEqual('DIV');
      });
      it("should have a 'backpack-component' class", function() {
        var hasClass;
        hasClass = this.Modal.$el.hasClass('backpack-component');
        return expect(hasClass).toBeTruthy();
      });
      it("should have a 'backpack-Modal' class", function() {
        var hasClass;
        hasClass = this.Modal.$el.hasClass('backpack-modal');
        return expect(hasClass).toBeTruthy();
      });
      describe("options", function() {
        beforeEach(function() {
          return this.options = this.Modal.options;
        });
        it("should have a blank default content", function() {
          return expect(this.options._content).toBeUndefined();
        });
        it("should have 'body' as a default parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        return it("should have false as a default lock", function() {
          return expect(this.options._lockOverlay).toBeFalsy();
        });
      });
      return describe("events", function() {
        beforeEach(function() {
          return this.events = this.Modal.events;
        });
        it("should have events defined", function() {
          return expect(this.events).toBeDefined();
        });
        it("should have a click event", function() {
          return expect(this.events['click .close']).toBeDefined();
        });
        return it("should call #close when click event triggered", function() {
          var spy;
          spy = sinon.spy(this.Modal, 'close');
          this.Modal.render();
          this.Modal.show();
          this.Modal.$el.find('.close').trigger('click');
          expect(spy).toHaveBeenCalled();
          return this.Modal.close.restore();
        });
      });
    });
    return describe("overlay", function() {
      it("should exist on default initialization", function() {
        return expect(this.Modal.overlay).toBeDefined();
      });
      return describe("options._lockOverlay", function() {
        return it("should set lockOverlay based on arguments", function() {
          var Modal1, Modal2;
          Modal1 = new Backpack.Modal({
            lockOverlay: true,
            hide: true
          });
          Modal2 = new Backpack.Modal({
            lockOverlay: false,
            hide: true
          });
          expect(Modal1.overlay._lockOverlay).toBeTruthy();
          expect(Modal2.overlay._lockOverlay).toBeFalsy();
          Modal1.remove();
          return Modal2.remove();
        });
      });
    });
  });

  describe("it has an overlay", function() {
    beforeEach(function() {
      return this.oModal = new Backpack.Modal({
        hide: true
      });
    });
    afterEach(function() {
      return this.oModal.remove();
    });
    describe("#show", function() {
      return it("should render and show it's overlay", function() {
        var spyRender, spyShow;
        spyShow = sinon.spy(this.oModal.overlay, 'show');
        spyRender = sinon.spy(this.oModal.overlay, 'render');
        this.oModal.show();
        expect(spyShow).toHaveBeenCalled();
        expect(spyRender).toHaveBeenCalled();
        this.oModal.overlay.show.restore();
        return this.oModal.overlay.render.restore();
      });
    });
    describe("#hide", function() {
      return it("should hide it's overlay", function() {
        var spy;
        spy = sinon.spy(this.oModal.overlay, 'hide');
        this.oModal.hide();
        expect(spy).toHaveBeenCalled();
        return this.oModal.overlay.hide.restore();
      });
    });
    describe("#close", function() {
      return it("should remove it's overlay", function() {
        var spy;
        spy = sinon.spy(this.oModal.overlay, 'remove');
        this.oModal.close();
        expect(spy).toHaveBeenCalled();
        return this.oModal.overlay.remove.restore();
      });
    });
    return describe("options._lockOverlay is false", function() {
      return it("should trigger 'overlay-close' when the overlay is clicked", function() {
        var Modal, spy;
        Modal = new Backpack.Modal({
          lockOverlay: false,
          hide: true
        });
        spy = sinon.spy(Modal.overlay, 'trigger');
        Modal.render().show();
        Modal.overlay.$el.trigger('click');
        expect(spy).toHaveBeenCalledWith('overlay-close');
        return Modal.remove();
      });
    });
  });

  describe("Backpack.Overlay", function() {
    beforeEach(function() {
      return this.overlay = new Backpack.Overlay({
        hide: true
      });
    });
    afterEach(function() {
      return this.overlay.remove();
    });
    describe("#initialize", function() {
      it("should create a <div>", function() {
        var nodeName;
        nodeName = this.overlay.el.nodeName;
        return expect(nodeName).toEqual('DIV');
      });
      it("should have a 'backpack-component' class", function() {
        var hasClass;
        hasClass = this.overlay.$el.hasClass('backpack-component');
        return expect(hasClass).toBeTruthy();
      });
      it("should have a 'backpack-overlay' class", function() {
        var hasClass;
        hasClass = this.overlay.$el.hasClass('backpack-overlay');
        return expect(hasClass).toBeTruthy();
      });
      describe("options", function() {
        beforeEach(function() {
          return this.options = this.overlay.options;
        });
        it("should have a blank default content", function() {
          return expect(this.options._content).toBeUndefined();
        });
        it("should have 'body' as a default parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        it("should have false as a default lockOverlay", function() {
          return expect(this.options.lockOverlay).toBeFalsy();
        });
        return it("should have rgba(0,0,0,0.7) as a default color", function() {
          expect(this.options.color).toEqual("rgba(0,0,0,0.7)");
          return expect(this.options.lockOverlay).toBeFalsy();
        });
      });
      return describe("events", function() {
        beforeEach(function() {
          return this.events = this.overlay.events;
        });
        it("should have events defined", function() {
          return expect(this.events).toBeDefined();
        });
        it("should have a click event", function() {
          return expect(this.events.click).toBeDefined();
        });
        return it("should call unlock on click", function() {
          var overlay, spy;
          overlay = new Backpack.Overlay({
            hide: true
          });
          spy = sinon.spy(overlay, 'unlock');
          overlay.render().show();
          overlay.$el.trigger('click');
          expect(spy).toHaveBeenCalled();
          return overlay.unlock.restore();
        });
      });
    });
    describe("#render", function() {
      return it("should call parent's prepend", function() {
        var spy;
        spy = sinon.spy(this.overlay.$parent, 'prepend');
        this.overlay.render();
        expect(spy).toHaveBeenCalled();
        return this.overlay.$parent.prepend.restore();
      });
    });
    describe("#unlock", function() {
      return it("should call #close if lockOverlay is false", function() {
        var spy;
        spy = sinon.spy(this.overlay, 'close');
        this.overlay.render().unlock();
        expect(spy).toHaveBeenCalled();
        return this.overlay.close.restore();
      });
    });
    describe("#close", function() {
      return it("should trigger 'overlay-close'", function() {
        var spy;
        spy = sinon.spy(this.overlay, 'trigger');
        this.overlay.render().close();
        expect(spy).toHaveBeenCalledWith('overlay-close');
        return this.overlay.trigger.restore();
      });
    });
    return describe("#lockOverlay", function() {
      return it("should set lockOverlay appropriately", function() {
        this.overlay.lockOverlay(false);
        expect(this.overlay._lockOverlay).toBeFalsy();
        this.overlay.lockOverlay();
        expect(this.overlay._lockOverlay).toBeFalsy();
        this.overlay.lockOverlay(true);
        return expect(this.overlay._lockOverlay).toBeTruthy();
      });
    });
  });

}).call(this);
