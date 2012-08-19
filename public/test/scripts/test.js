(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"test/controllers/footer_controller_test": function(exports, require, module) {
  var Footer;

  Footer = require('models/footer');

  describe('Footer', function() {
    return beforeEach(function() {
      return this.model = new Footer();
    });
  });
  
}});

window.require.define({"test/controllers/form_controller_test": function(exports, require, module) {
  var Form;

  Form = require('models/form');

  describe('Form', function() {
    return beforeEach(function() {
      return this.model = new Form();
    });
  });
  
}});

window.require.define({"test/controllers/topCenter_controller_test": function(exports, require, module) {
  var TopCenter;

  TopCenter = require('models/topCenter');

  describe('TopCenter', function() {
    return beforeEach(function() {
      return this.model = new TopCenter();
    });
  });
  
}});

window.require.define({"test/controllers/top_left_controller_test": function(exports, require, module) {
  var TopLeft;

  TopLeft = require('models/top_left');

  describe('TopLeft', function() {
    return beforeEach(function() {
      return this.model = new TopLeft();
    });
  });
  
}});

window.require.define({"test/models/footer": function(exports, require, module) {
  var Footer;

  Footer = require('models/footer');

  describe('Footer', function() {
    return beforeEach(function() {
      return this.model = new Footer();
    });
  });
  
}});

window.require.define({"test/models/form": function(exports, require, module) {
  var Form;

  Form = require('models/form');

  describe('Form', function() {
    return beforeEach(function() {
      return this.model = new Form();
    });
  });
  
}});

window.require.define({"test/models/header_test": function(exports, require, module) {
  var Header;

  Header = require('models/header');

  describe('Header', function() {
    beforeEach(function() {
      return this.model = new Header();
    });
    afterEach(function() {
      return this.model.dispose();
    });
    return it('should contain 4 items', function() {
      return expect(this.model.get('items')).to.have.length(4);
    });
  });
  
}});

window.require.define({"test/models/numbers": function(exports, require, module) {
  var Numbers;

  Numbers = require('models/numbers');

  describe('Numbers', function() {
    return beforeEach(function() {
      return this.model = new Numbers();
    });
  });
  
}});

window.require.define({"test/test-helpers": function(exports, require, module) {
  var chai, sinonChai;

  chai = require('chai');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  module.exports = {
    expect: chai.expect,
    sinon: require('sinon')
  };
  
}});

window.require.define({"test/views/footer_sub_view": function(exports, require, module) {
  var FooterSubView;

  FooterSubView = require('views/footer_sub_view');

  describe('FooterSubView', function() {
    return beforeEach(function() {
      return this.view = new FooterSubView();
    });
  });
  
}});

window.require.define({"test/views/footer_view": function(exports, require, module) {
  var FooterView;

  FooterView = require('views/footer_view');

  describe('FooterView', function() {
    return beforeEach(function() {
      return this.view = new FooterView();
    });
  });
  
}});

window.require.define({"test/views/form_view": function(exports, require, module) {
  var FormView;

  FormView = require('views/form_view');

  describe('FormView', function() {
    return beforeEach(function() {
      return this.view = new FormView();
    });
  });
  
}});

window.require.define({"test/views/header_view_test": function(exports, require, module) {
  var Header, HeaderView, HeaderViewTest, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  HeaderViewTest = (function(_super) {

    __extends(HeaderViewTest, _super);

    function HeaderViewTest() {
      return HeaderViewTest.__super__.constructor.apply(this, arguments);
    }

    HeaderViewTest.prototype.renderTimes = 0;

    HeaderViewTest.prototype.render = function() {
      HeaderViewTest.__super__.render.apply(this, arguments);
      return this.renderTimes += 1;
    };

    return HeaderViewTest;

  })(HeaderView);

  describe('HeaderView', function() {
    beforeEach(function() {
      this.model = new Header();
      return this.view = new HeaderViewTest({
        model: this.model
      });
    });
    afterEach(function() {
      this.view.dispose();
      return this.model.dispose();
    });
    it('should display 4 links', function() {
      return expect(this.view.$el.find('a')).to.have.length(4);
    });
    return it('should re-render on login event', function() {
      expect(this.view.renderTimes).to.equal(1);
      mediator.publish('loginStatus');
      return expect(this.view.renderTimes).to.equal(2);
    });
  });
  
}});

window.require.define({"test/views/home_page_view_test": function(exports, require, module) {
  var HomePageView;

  HomePageView = require('views/home_page_view');

  describe('HomePageView', function() {
    beforeEach(function() {
      return this.view = new HomePageView();
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should auto-render', function() {
      return expect(this.view.$el.find('img')).to.have.length(1);
    });
  });
  
}});

window.require.define({"test/views/topCenter_view": function(exports, require, module) {
  var TopCenterView;

  TopCenterView = require('views/topCenter_view');

  describe('TopCenterView', function() {
    return beforeEach(function() {
      return this.view = new TopCenterView();
    });
  });
  
}});

window.require.define({"test/views/top_left_view": function(exports, require, module) {
  var TopLeftView;

  TopLeftView = require('views/top_left_view');

  describe('TopLeftView', function() {
    return beforeEach(function() {
      return this.view = new TopLeftView();
    });
  });
  
}});

window.require('test/controllers/footer_controller_test');
window.require('test/controllers/form_controller_test');
window.require('test/controllers/topCenter_controller_test');
window.require('test/controllers/top_left_controller_test');
window.require('test/models/header_test');
window.require('test/views/header_view_test');
window.require('test/views/home_page_view_test');
