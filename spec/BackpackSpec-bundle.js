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
      it("should call #hide", function() {
        var spy;
        spy = sinon.spy(this.component, 'hide');
        this.component.initialize();
        return expect(spy).toHaveBeenCalled();
      });
      it("should have a 'hide' class", function() {
        var hasClass;
        hasClass = this.component.$el.hasClass('hide');
        return expect(hasClass).toBeTruthy();
      });
      return describe("options", function() {
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
        var parent, spy;
        parent = $('<div>');
        spy = sinon.spy(parent, 'append');
        this.component.setParent(parent);
        this.component.render();
        return expect(spy).toHaveBeenCalled();
      });
    });
    describe("#addClass", function() {
      it("should add a class to the component", function() {
        this.component.addClass("test");
        return expect(this.component.$el.hasClass("test")).toBeTruthy();
      });
      return it("should do nothing if passed nothing", function() {
        var className;
        className = this.component.className;
        this.component.addClass();
        return expect(this.component.className).toEqual(className);
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
        return expect(spy).toHaveBeenCalled();
      });
      return it("should call #addClass", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'addClass');
        this.component.hide();
        return expect(spy).toHaveBeenCalled();
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
        return expect(spy).toHaveBeenCalled();
      });
      return it("should call #removeClass", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'removeClass');
        this.component.show();
        return expect(spy).toHaveBeenCalled();
      });
    });
    describe("#close", function() {
      it("should call #hide", function() {
        var spy;
        spy = sinon.spy(this.component, 'hide');
        this.component.close();
        return expect(spy).toHaveBeenCalled();
      });
      return it("should call #remove", function() {
        var spy;
        spy = sinon.spy(this.component, 'remove');
        this.component.close();
        return expect(spy).toHaveBeenCalled();
      });
    });
    describe("#append", function() {
      it("should call $.append", function() {
        var spy;
        spy = sinon.spy(this.component.$el, 'append');
        this.component.append('');
        return expect(spy).toHaveBeenCalled();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        return expect(spy).toHaveBeenCalled();
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
        return expect(spy).toHaveBeenCalled();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        return expect(spy).toHaveBeenCalled();
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
        return expect(spy).toHaveBeenCalled();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        return expect(spy).toHaveBeenCalled();
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
        return expect(spy).toHaveBeenCalled();
      });
      it("should call #setContent", function() {
        var spy;
        spy = sinon.spy(this.component, 'setContent');
        this.component.append('');
        return expect(spy).toHaveBeenCalled();
      });
      return it("should do nothing if passed nothing", function() {
        var testContent;
        testContent = this.component.content;
        this.component.setContent();
        return expect(this.component.content).toEqual(testContent);
      });
    });
    return describe("#setContent", function() {
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
        return expect(this.component.content).toEqual(testContent.render().el);
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
    return describe("#initialize", function() {
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
        return expect(spy).toHaveBeenCalled();
      });
      return it("should have a 'hide' class", function() {
        var hasClass;
        hasClass = this.dialog.$el.hasClass('hide');
        return expect(hasClass).toBeTruthy();
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

}).call(this);
