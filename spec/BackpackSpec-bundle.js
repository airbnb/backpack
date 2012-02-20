(function() {

  describe('Backpack', function() {
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
      it('should have a Dialog', function() {
        return expect(Backpack.Dialog).toBeDefined();
      });
      return it('should have an Overlay', function() {
        return expect(Backpack.Overlay).toBeDefined();
      });
    });
  });

  describe("Backpack.Component", function() {
    beforeEach(function() {
      return this.component = new Backpack.Component;
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
      it("should call #setup", function() {
        var spy;
        spy = sinon.spy(this.component, 'setup');
        this.component.initialize();
        expect(spy).toHaveBeenCalled();
        return this.component.setup.restore();
      });
      it("should have a 'hide' class", function() {
        var hasClass;
        hasClass = this.component.$el.hasClass('hide');
        return expect(hasClass).toBeTruthy();
      });
      describe("options", function() {
        beforeEach(function() {
          return this.options = this.component.options;
        });
        it("should have a blank default name", function() {
          return expect(this.options.name).toEqual('');
        });
        it("should have a blank default content", function() {
          return expect(this.options.content).toEqual('');
        });
        it("should have 'body' as a default parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        return it("should set options", function() {
          var options;
          options = (new Backpack.Component({
            name: 'test',
            parent: '#test',
            content: 'test'
          })).options;
          expect(options.name).toEqual('test');
          expect(options.parent).toEqual('#test');
          return expect(options.content).toEqual('test');
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
        this.component.setParent(parent);
        this.component.render();
        return expect(parent.children().length).toEqual(1);
      });
      it("should return the component for chaining", function() {
        var parent;
        parent = $('<div>');
        this.component.setParent(parent);
        return expect(this.component.render()).toEqual(this.component);
      });
      return it("should call the parents #append", function() {
        var spy;
        this.component.setParent('<div>');
        spy = sinon.spy(this.component.parent, 'append');
        this.component.render();
        expect(spy).toHaveBeenCalled();
        return this.component.parent.append.restore();
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
    describe("#setParent", function() {
      it("should set the component's parent", function() {
        var parent1, parent2;
        parent1 = $('<div>');
        this.component.setParent(parent1);
        expect(this.component.parent).toEqual(parent1);
        parent2 = $('<ul>');
        this.component.setParent(parent2);
        return expect(this.component.parent).toEqual(parent2);
      });
      return it("should do nothing if passed nothing", function() {
        var parent;
        parent = this.component.parent;
        this.component.setParent();
        return expect(this.component.parent).toEqual(parent);
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
    describe("#setContent", function() {
      it("should do nothing if passed nothing", function() {
        var testContent;
        testContent = 'test';
        this.component.setContent(testContent);
        this.component.setContent();
        return expect(this.component.content).toEqual(testContent);
      });
      it("should set @content to content if content isn't a View", function() {
        var testContent;
        testContent = 'test';
        this.component.setContent(testContent);
        return expect(this.component.content).toEqual(testContent);
      });
      it("should set @conent to content.render().el if it's a View", function() {
        var spy, testContent;
        testContent = new Backbone.View;
        spy = sinon.spy(testContent, 'render');
        this.component.setContent(testContent);
        expect(spy).toHaveBeenCalled();
        expect(this.component.content).toEqual(testContent.render().el);
        return testContent.render.restore();
      });
      return it("should set @conent to content.el if content.render doesn't exist", function() {
        var testContent;
        testContent = {
          el: document.createElement('div')
        };
        this.component.setContent(testContent);
        return expect(this.component.content).toEqual(testContent.el);
      });
    });
    return describe("#setup", function() {
      return it("should add a class of the slugged version of name", function() {
        this.component.options.name = 'admin only stuff';
        this.component.setup();
        return expect(this.component.$el.hasClass('admin-only-stuff')).toBeTruthy();
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

  describe("Backpack.Dialog", function() {
    beforeEach(function() {
      return this.dialog = new Backpack.Dialog;
    });
    describe("#initialize", function() {
      it("should create a <div>", function() {
        var nodeName;
        nodeName = this.dialog.el.nodeName;
        return expect(nodeName).toEqual('DIV');
      });
      it("should have a 'backpack-component' class", function() {
        var hasClass;
        hasClass = this.dialog.$el.hasClass('backpack-component');
        return expect(hasClass).toBeTruthy();
      });
      it("should have a 'backpack-dialog' class", function() {
        var hasClass;
        hasClass = this.dialog.$el.hasClass('backpack-dialog');
        return expect(hasClass).toBeTruthy();
      });
      it("should call #hide", function() {
        var spy;
        spy = sinon.spy(this.dialog, 'hide');
        this.dialog.initialize();
        expect(spy).toHaveBeenCalled();
        return this.dialog.hide.restore();
      });
      it("should have a 'hide' class", function() {
        var hasClass;
        hasClass = this.dialog.$el.hasClass('hide');
        return expect(hasClass).toBeTruthy();
      });
      describe("options", function() {
        beforeEach(function() {
          return this.options = this.dialog.options;
        });
        it("should have a blank default name", function() {
          return expect(this.options.name).toEqual('');
        });
        it("should have a blank default content", function() {
          return expect(this.options.content).toEqual('');
        });
        it("should have 'body' as a default parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        it("should have false as a default overlay", function() {
          return expect(this.options.showOverlay).toBeFalsy();
        });
        it("should have false as a default lock", function() {
          return expect(this.options.lockOverlay).toBeFalsy();
        });
        return it("should set options", function() {
          var options;
          options = (new Backpack.Dialog({
            name: 'test',
            parent: '#test',
            content: 'test'
          })).options;
          expect(options.name).toEqual('test');
          expect(options.parent).toEqual('#test');
          return expect(options.content).toEqual('test');
        });
      });
      return describe("events", function() {
        beforeEach(function() {
          return this.events = this.dialog.events;
        });
        it("should have events defined", function() {
          return expect(this.events).toBeDefined();
        });
        it("should have a click event", function() {
          return expect(this.events.click).toBeDefined();
        });
        return it("should call #close when click event triggered", function() {
          var spy;
          spy = sinon.spy(this.dialog, 'close');
          this.dialog.render();
          this.dialog.show();
          this.dialog.$el.trigger('click');
          expect(spy).toHaveBeenCalled();
          return this.dialog.close.restore();
        });
      });
    });
    return describe("overlay", function() {
      it("should not exist on default initialization", function() {
        return expect(this.dialog.overlay).toBeUndefined();
      });
      describe("options.showOverlay", function() {
        it("should create an Overlay if showOverlay set to true", function() {
          var dialog;
          dialog = new Backpack.Dialog({
            showOverlay: true
          });
          return expect(dialog.overlay).toBeDefined();
        });
        return it("should set showOverlay based on arguments", function() {
          var dialog1, dialog2;
          dialog1 = new Backpack.Dialog({
            showOverlay: true
          });
          dialog2 = new Backpack.Dialog({
            showOverlay: false
          });
          expect(dialog1.options.showOverlay).toBeTruthy();
          return expect(dialog2.options.showOverlay).toBeFalsy();
        });
      });
      return describe("options.lockOverlay", function() {
        return it("should set lockOverlay based on arguments", function() {
          var dialog1, dialog2;
          dialog1 = new Backpack.Dialog({
            showOverlay: true,
            lockOverlay: true
          });
          dialog2 = new Backpack.Dialog({
            showOverlay: true,
            lockOverlay: false
          });
          expect(dialog1.overlay.lockOverlay).toBeTruthy();
          return expect(dialog2.overlay.lockOverlay).toBeFalsy();
        });
      });
    });
  });

  describe("it has an overlay", function() {
    beforeEach(function() {
      return this.oDialog = new Backpack.Dialog({
        showOverlay: true
      });
    });
    describe("#show", function() {
      return it("should render and show it's overlay", function() {
        var spyRender, spyShow;
        spyShow = sinon.spy(this.oDialog.overlay, 'show');
        spyRender = sinon.spy(this.oDialog.overlay, 'render');
        this.oDialog.show();
        expect(spyShow).toHaveBeenCalled();
        expect(spyRender).toHaveBeenCalled();
        this.oDialog.overlay.show.restore();
        return this.oDialog.overlay.render.restore();
      });
    });
    describe("#hide", function() {
      return it("should hide it's overlay", function() {
        var spy;
        spy = sinon.spy(this.oDialog.overlay, 'hide');
        this.oDialog.hide();
        expect(spy).toHaveBeenCalled();
        return this.oDialog.overlay.hide.restore();
      });
    });
    describe("#close", function() {
      return it("should remove it's overlay", function() {
        var spy;
        spy = sinon.spy(this.oDialog.overlay, 'remove');
        this.oDialog.close();
        expect(spy).toHaveBeenCalled();
        return this.oDialog.overlay.remove.restore();
      });
    });
    return describe("options.lockOverlay is false", function() {
      return it("should trigger 'overlay-close' when the overlay is clicked", function() {
        var dialog, spy;
        dialog = new Backpack.Dialog({
          showOverlay: true,
          lockOverlay: false
        });
        spy = sinon.spy(dialog.overlay, 'trigger');
        dialog.render().show();
        dialog.overlay.$el.trigger('click');
        return expect(spy).toHaveBeenCalledWith('overlay-close');
      });
    });
  });

  describe('Backpack.Menu', function() {
    beforeEach(function() {
      return this.menu = new Backpack.Menu;
    });
    return describe('instantiation', function() {
      return it('should create a <ul>', function() {
        return expect(this.menu.el.nodeName).toEqual("UL");
      });
    });
  });

  describe("Backpack.Modal", function() {
    beforeEach(function() {
      return this.modal = new Backpack.Modal;
    });
    return describe("#initialize", function() {
      it("should create a <div>", function() {
        var nodeName;
        nodeName = this.modal.el.nodeName;
        return expect(nodeName).toEqual('DIV');
      });
      it("should have a 'backpack-component' class", function() {
        var hasClass;
        hasClass = this.modal.$el.hasClass('backpack-component');
        return expect(hasClass).toBeTruthy();
      });
      it("should have a 'backpack-modal' class", function() {
        var hasClass;
        hasClass = this.modal.$el.hasClass('backpack-modal');
        return expect(hasClass).toBeTruthy();
      });
      it("should call #hide", function() {
        var spy;
        spy = sinon.spy(this.modal, 'hide');
        this.modal.initialize();
        expect(spy).toHaveBeenCalled();
        return this.modal.hide.restore();
      });
      it("should have a 'hide' class", function() {
        var hasClass;
        hasClass = this.modal.$el.hasClass('hide');
        return expect(hasClass).toBeTruthy();
      });
      return describe("options", function() {
        beforeEach(function() {
          return this.options = this.modal.options;
        });
        it("should have a blank default name", function() {
          return expect(this.options.name).toEqual('');
        });
        it("should have a blank default content", function() {
          return expect(this.options.content).toEqual('');
        });
        it("should have 'body' as a default parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        it("should have true as a default overlay", function() {
          return expect(this.options.showOverlay).toBeTruthy();
        });
        it("should have true as a default lock", function() {
          return expect(this.options.lockOverlay).toBeTruthy();
        });
        return it("should set options", function() {
          var options;
          options = (new Backpack.Dialog({
            name: 'test',
            parent: '#test',
            content: 'test'
          })).options;
          expect(options.name).toEqual('test');
          expect(options.parent).toEqual('#test');
          return expect(options.content).toEqual('test');
        });
      });
    });
  });

  describe("Backpack.Overlay", function() {
    beforeEach(function() {
      return this.overlay = new Backpack.Overlay;
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
      it("should call #hide", function() {
        var spy;
        spy = sinon.spy(this.overlay, 'hide');
        this.overlay.initialize();
        expect(spy).toHaveBeenCalled();
        return this.overlay.hide.restore();
      });
      it("should have a 'hide' class", function() {
        var hasClass;
        hasClass = this.overlay.$el.hasClass('hide');
        return expect(hasClass).toBeTruthy();
      });
      describe("options", function() {
        beforeEach(function() {
          return this.options = this.overlay.options;
        });
        it("should have a blank default name", function() {
          return expect(this.options.name).toEqual('');
        });
        it("should have a blank default content", function() {
          return expect(this.options.content).toEqual('');
        });
        it("should have 'body' as a default parent", function() {
          return expect(this.options.parent).toEqual('body');
        });
        it("should have false as a default lockOverlay", function() {
          return expect(this.options.lockOverlay).toBeFalsy();
        });
        it("should have rgba(0,0,0,0.7) as a default color", function() {
          return expect(this.options.color).toEqual("rgba(0,0,0,0.7)");
        });
        return it("should set options", function() {
          var options;
          options = (new Backpack.Dialog({
            name: 'test',
            parent: '#test',
            content: 'test',
            color: 'blue',
            lockOverlay: false
          })).options;
          expect(options.name).toEqual('test');
          expect(options.parent).toEqual('#test');
          expect(options.content).toEqual('test');
          expect(options.color).toEqual('blue');
          return expect(options.lockOverlay).toBeFalsy();
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
          overlay = new Backpack.Overlay;
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
        spy = sinon.spy(this.overlay.parent, 'prepend');
        this.overlay.render();
        expect(spy).toHaveBeenCalled();
        return this.overlay.parent.prepend.restore();
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
    return describe("#setlock", function() {
      return it("should set lockOverlay appropriately", function() {
        this.overlay.setLock(false);
        expect(this.overlay.lockOverlay).toBeFalsy();
        this.overlay.setLock();
        expect(this.overlay.lockOverlay).toBeFalsy();
        this.overlay.setLock(true);
        return expect(this.overlay.lockOverlay).toBeTruthy();
      });
    });
  });

}).call(this);
