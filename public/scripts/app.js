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

window.require.define({"application": function(exports, require, module) {
  var Application, Chaplin, FooterController, HeaderController, Layout, SessionController, TopCenterController, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  routes = require('routes');

  SessionController = require('controllers/session_controller');

  HeaderController = require('controllers/header_controller');

  FooterController = require('controllers/footer_controller');

  TopCenterController = require('controllers/topCenter_controller');

  Layout = require('views/layout');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Brunch example application';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher();
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      new SessionController();
      new HeaderController();
      new FooterController();
      return new TopCenterController();
    };

    Application.prototype.initMediator = function() {
      Chaplin.mediator.user = null;
      return Chaplin.mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
}});

window.require.define({"controllers/base/controller": function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
}});

window.require.define({"controllers/footer_controller": function(exports, require, module) {
  var Controller, Footer, FooterController, FooterView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Footer = require('models/footer');

  FooterView = require('views/footer_view');

  module.exports = FooterController = (function(_super) {

    __extends(FooterController, _super);

    function FooterController() {
      return FooterController.__super__.constructor.apply(this, arguments);
    }

    FooterController.prototype.initialize = function() {
      FooterController.__super__.initialize.apply(this, arguments);
      this.model = new Footer();
      return this.view = new FooterView({
        model: this.model
      });
    };

    return FooterController;

  })(Controller);
  
}});

window.require.define({"controllers/header_controller": function(exports, require, module) {
  var Controller, Header, HeaderController, HeaderView, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      this.model = new Header();
      return this.view = new HeaderView({
        model: this.model
      });
    };

    return HeaderController;

  })(Controller);
  
}});

window.require.define({"controllers/home_controller": function(exports, require, module) {
  var Controller, HomeController, HomePageView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/home_page_view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.historyURL = 'home';

    HomeController.prototype.index = function() {
      return this.view = new HomePageView();
    };

    HomeController.prototype.matt = function() {
      return console.log("matt ma rocks");
    };

    return HomeController;

  })(Controller);
  
}});

window.require.define({"controllers/session_controller": function(exports, require, module) {
  var Controller, LoginView, SessionController, User, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Controller = require('controllers/base/controller');

  User = require('models/user');

  LoginView = require('views/login_view');

  module.exports = SessionController = (function(_super) {

    __extends(SessionController, _super);

    function SessionController() {
      this.logout = __bind(this.logout, this);

      this.serviceProviderSession = __bind(this.serviceProviderSession, this);

      this.triggerLogin = __bind(this.triggerLogin, this);
      return SessionController.__super__.constructor.apply(this, arguments);
    }

    SessionController.serviceProviders = {};

    SessionController.prototype.loginStatusDetermined = false;

    SessionController.prototype.loginView = null;

    SessionController.prototype.serviceProviderName = null;

    SessionController.prototype.initialize = function() {
      this.subscribeEvent('serviceProviderSession', this.serviceProviderSession);
      this.subscribeEvent('logout', this.logout);
      this.subscribeEvent('userData', this.userData);
      this.subscribeEvent('!showLogin', this.showLoginView);
      this.subscribeEvent('!login', this.triggerLogin);
      this.subscribeEvent('!logout', this.triggerLogout);
      return this.getSession();
    };

    SessionController.prototype.loadServiceProviders = function() {
      var name, serviceProvider, _ref, _results;
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.load());
      }
      return _results;
    };

    SessionController.prototype.createUser = function(userData) {
      return mediator.user = new User(userData);
    };

    SessionController.prototype.getSession = function() {
      var name, serviceProvider, _ref, _results;
      this.loadServiceProviders();
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.done(serviceProvider.getLoginStatus));
      }
      return _results;
    };

    SessionController.prototype.showLoginView = function() {
      if (this.loginView) {
        return;
      }
      this.loadServiceProviders();
      return this.loginView = new LoginView({
        serviceProviders: SessionController.serviceProviders
      });
    };

    SessionController.prototype.triggerLogin = function(serviceProviderName) {
      var serviceProvider;
      serviceProvider = SessionController.serviceProviders[serviceProviderName];
      if (!serviceProvider.isLoaded()) {
        mediator.publish('serviceProviderMissing', serviceProviderName);
        return;
      }
      mediator.publish('loginAttempt', serviceProviderName);
      return serviceProvider.triggerLogin();
    };

    SessionController.prototype.serviceProviderSession = function(session) {
      this.serviceProviderName = session.provider.name;
      this.disposeLoginView();
      session.id = session.userId;
      delete session.userId;
      this.createUser(session);
      return this.publishLogin();
    };

    SessionController.prototype.publishLogin = function() {
      this.loginStatusDetermined = true;
      mediator.publish('login', mediator.user);
      return mediator.publish('loginStatus', true);
    };

    SessionController.prototype.triggerLogout = function() {
      return mediator.publish('logout');
    };

    SessionController.prototype.logout = function() {
      this.loginStatusDetermined = true;
      this.disposeUser();
      this.serviceProviderName = null;
      this.showLoginView();
      return mediator.publish('loginStatus', false);
    };

    SessionController.prototype.userData = function(data) {
      return mediator.user.set(data);
    };

    SessionController.prototype.disposeLoginView = function() {
      if (!this.loginView) {
        return;
      }
      this.loginView.dispose();
      return this.loginView = null;
    };

    SessionController.prototype.disposeUser = function() {
      if (!mediator.user) {
        return;
      }
      mediator.user.dispose();
      return mediator.user = null;
    };

    return SessionController;

  })(Controller);
  
}});

window.require.define({"controllers/topCenter_controller": function(exports, require, module) {
  var BottomLeftView, BottomRightView, Controller, Numbers, TopCenterController, TopCenterView, TopLeftView, TopRightView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Numbers = require('models/numbers');

  TopCenterView = require('views/topCenter_view');

  TopLeftView = require('views/top_left_view');

  TopRightView = require('views/top_right_view');

  BottomLeftView = require('views/bottom_left_view');

  BottomRightView = require('views/bottom_right_view');

  module.exports = TopCenterController = (function(_super) {

    __extends(TopCenterController, _super);

    function TopCenterController() {
      return TopCenterController.__super__.constructor.apply(this, arguments);
    }

    TopCenterController.prototype.initialize = function() {
      TopCenterController.__super__.initialize.apply(this, arguments);
      this.model = new Numbers();
      this.centerView = new TopCenterView({
        model: this.model
      });
      this.leftView = new TopLeftView({
        model: this.model
      });
      this.rightView = new TopRightView({
        model: this.model
      });
      this.bottomLeftView = new BottomLeftView({
        model: this.model
      });
      return this.bottomRightView = new BottomRightView({
        model: this.model
      });
    };

    return TopCenterController;

  })(Controller);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
}});

window.require.define({"lib/services/service_provider": function(exports, require, module) {
  var Chaplin, ServiceProvider, utils;

  utils = require('lib/utils');

  Chaplin = require('chaplin');

  module.exports = ServiceProvider = (function() {

    _(ServiceProvider.prototype).extend(Chaplin.Subscriber);

    ServiceProvider.prototype.loading = false;

    function ServiceProvider() {
      _(this).extend($.Deferred());
      utils.deferMethods({
        deferred: this,
        methods: ['triggerLogin', 'getLoginStatus'],
        onDeferral: this.load
      });
    }

    ServiceProvider.prototype.disposed = false;

    ServiceProvider.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.unsubscribeAllEvents();
      this.disposed = true;
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    return ServiceProvider;

  })();

  /*

    Standard methods and their signatures:

    load: ->
      # Load a script like this:
      utils.loadLib 'http://example.org/foo.js', @loadHandler, @reject

    loadHandler: =>
      # Init the library, then resolve
      ServiceProviderLibrary.init(foo: 'bar')
      @resolve()

    isLoaded: ->
      # Return a Boolean
      Boolean window.ServiceProviderLibrary and ServiceProviderLibrary.login

    # Trigger login popup
    triggerLogin: (loginContext) ->
      callback = _(@loginHandler).bind(this, loginContext)
      ServiceProviderLibrary.login callback

    # Callback for the login popup
    loginHandler: (loginContext, response) =>

      eventPayload = {provider: this, loginContext}
      if response
        # Publish successful login
        mediator.publish 'loginSuccessful', eventPayload

        # Publish the session
        mediator.publish 'serviceProviderSession',
          provider: this
          userId: response.userId
          accessToken: response.accessToken
          # etc.

      else
        mediator.publish 'loginFail', eventPayload

    getLoginStatus: (callback = @loginStatusHandler, force = false) ->
      ServiceProviderLibrary.getLoginStatus callback, force

    loginStatusHandler: (response) =>
      return unless response
      mediator.publish 'serviceProviderSession',
        provider: this
        userId: response.userId
        accessToken: response.accessToken
        # etc.
  */

  
}});

window.require.define({"lib/support": function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
}});

window.require.define({"lib/utils": function(exports, require, module) {
  var Chaplin, mediator, utils,
    __hasProp = {}.hasOwnProperty;

  Chaplin = require('chaplin');

  mediator = require('mediator');

  utils = Chaplin.utils.beget(Chaplin.utils);

  _(utils).extend({
    /*
    	Wrap methods so they can be called before a deferred is resolved.
    	The actual methods are called once the deferred is resolved.
    
    	Parameters:
    
    	Expects an options hash with the following properties:
    
    	deferred
    		The Deferred object to wait for.
    
    	methods
    		Either:
    		- A string with a method name e.g. 'method'
    		- An array of strings e.g. ['method1', 'method2']
    		- An object with methods e.g. {method: -> alert('resolved!')}
    
    	host (optional)
    		If you pass an array of strings in the `methods` parameter the methods
    		are fetched from this object. Defaults to `deferred`.
    
    	target (optional)
    		The target object the new wrapper methods are created at.
    		Defaults to host if host is given, otherwise it defaults to deferred.
    
    	onDeferral (optional)
    		An additional callback function which is invoked when the method is called
    		and the Deferred isn't resolved yet.
    		After the method is registered as a done handler on the Deferred,
    		this callback is invoked. This can be used to trigger the resolving
    		of the Deferred.
    
    	Examples:
    
    	deferMethods(deferred: def, methods: 'foo')
    		Wrap the method named foo of the given deferred def and
    		postpone all calls until the deferred is resolved.
    
    	deferMethods(deferred: def, methods: def.specialMethods)
    		Read all methods from the hash def.specialMethods and
    		create wrapped methods with the same names at def.
    
    	deferMethods(
    		deferred: def, methods: def.specialMethods, target: def.specialMethods
    	)
    		Read all methods from the object def.specialMethods and
    		create wrapped methods at def.specialMethods,
    		overwriting the existing ones.
    
    	deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
    		Wrap the methods obj.foo and obj.bar so all calls to them are postponed
    		until def is resolved. obj.foo and obj.bar are overwritten
    		with their wrappers.
    */

    deferMethods: function(options) {
      var deferred, func, host, methods, methodsHash, name, onDeferral, target, _i, _len, _results;
      deferred = options.deferred;
      methods = options.methods;
      host = options.host || deferred;
      target = options.target || host;
      onDeferral = options.onDeferral;
      methodsHash = {};
      if (typeof methods === 'string') {
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        for (_i = 0, _len = methods.length; _i < _len; _i++) {
          name = methods[_i];
          func = host[name];
          if (typeof func !== 'function') {
            throw new TypeError("utils.deferMethods: method " + name + " notfound on host " + host);
          }
          methodsHash[name] = func;
        }
      } else {
        methodsHash = methods;
      }
      _results = [];
      for (name in methodsHash) {
        if (!__hasProp.call(methodsHash, name)) continue;
        func = methodsHash[name];
        if (typeof func !== 'function') {
          continue;
        }
        _results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
      }
      return _results;
    },
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (context == null) {
        context = deferred;
      }
      return function() {
        var args;
        args = arguments;
        if (deferred.state() === 'resolved') {
          return func.apply(context, args);
        } else {
          deferred.done(function() {
            return func.apply(context, args);
          });
          if (typeof onDeferral === 'function') {
            return onDeferral.apply(context);
          }
        }
      };
    }
  });

  module.exports = utils;
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  var mediator, utils;

  mediator = require('mediator');

  utils = require('chaplin/lib/utils');

  Handlebars.registerHelper('if_logged_in', function(options) {
    if (mediator.user) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('with_user', function(options) {
    var context;
    context = mediator.user || {};
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('plus', function(first, second, fn, inverse) {
    return parseFloat(first) + parseFloat(second);
  });

  Handlebars.registerHelper('minus', function(first, second, fn, inverse) {
    return parseFloat(first) - parseFloat(second);
  });

  Handlebars.registerHelper('multiple', function(first, second, fn, inverse) {
    return parseFloat(first) * parseFloat(second);
  });

  Handlebars.registerHelper('divide', function(first, second, fn, inverse) {
    return parseFloat(first) / parseFloat(second);
  });
  
}});

window.require.define({"mediator": function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
}});

window.require.define({"models/base/collection": function(exports, require, module) {
  var Chaplin, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/model": function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
}});

window.require.define({"models/footer": function(exports, require, module) {
  var Footer, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Footer = (function(_super) {

    __extends(Footer, _super);

    function Footer() {
      return Footer.__super__.constructor.apply(this, arguments);
    }

    Footer.prototype.defaults = {
      links: [
        {
          href: "http://mattmadesign.com",
          name: "mattma"
        }, {
          href: "http://yahoo.com",
          name: "kelly"
        }, {
          href: "http://google.com",
          name: "aaron"
        }
      ]
    };

    return Footer;

  })(Model);
  
}});

window.require.define({"models/header": function(exports, require, module) {
  var Header, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Header = (function(_super) {

    __extends(Header, _super);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    Header.prototype.defaults = {
      items: [
        {
          href: './test/',
          title: 'App Tests'
        }, {
          href: 'http://brunch.readthedocs.org/',
          title: 'Docs'
        }, {
          href: 'https://github.com/brunch/brunch/issues',
          title: 'Github Issues'
        }, {
          href: 'https://github.com/paulmillr/ostio',
          title: 'Ost.io Example App'
        }
      ]
    };

    return Header;

  })(Model);
  
}});

window.require.define({"models/numbers": function(exports, require, module) {
  var Model, Numbers,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Numbers = (function(_super) {

    __extends(Numbers, _super);

    function Numbers() {
      return Numbers.__super__.constructor.apply(this, arguments);
    }

    Numbers.prototype.defaults = {
      first_number: 0,
      second_number: 0
    };

    Numbers.prototype.validation = {
      first_number: {
        required: true,
        pattern: "number",
        range: [1, 15],
        msg: 'Enter a valid number'
      },
      second_number: {
        required: true,
        pattern: "number",
        range: [1, 10],
        msg: 'Enter a valid number'
      }
    };

    return Numbers;

  })(Model);
  
}});

window.require.define({"models/user": function(exports, require, module) {
  var Model, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    return User;

  })(Model);
  
}});

window.require.define({"routes": function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'home#index');
    return match('#matt', 'home#matt');
  };
  
}});

window.require.define({"routes": function(exports, require, module) {
  // Generated by CoffeeScript 1.3.1
  (function() {
  
    module.exports = function(match) {
      match('#matt', 'home#matt');
      return match('', 'home#index');
    };
  
  }).call(this);
  
}});

window.require.define({"views/base/collection_view": function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/base/page_view": function(exports, require, module) {
  var PageView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/base/view');

  module.exports = PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.container = '#page-container';

    PageView.prototype.autoRender = true;

    PageView.prototype.renderedSubviews = false;

    PageView.prototype.initialize = function() {
      var rendered,
        _this = this;
      PageView.__super__.initialize.apply(this, arguments);
      if (this.model || this.collection) {
        rendered = false;
        return this.modelBind('change', function() {
          if (!rendered) {
            _this.render();
          }
          return rendered = true;
        });
      }
    };

    PageView.prototype.renderSubviews = function() {};

    PageView.prototype.render = function() {
      PageView.__super__.render.apply(this, arguments);
      if (!this.renderedSubviews) {
        this.renderSubviews();
        return this.renderedSubviews = true;
      }
    };

    return PageView;

  })(View);
  
}});

window.require.define({"views/base/view": function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
}});

window.require.define({"views/bottom_left_view": function(exports, require, module) {
  var BottomLeftView, Handlebar, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/bottom_left');

  Handlebar = require('lib/view_helper');

  module.exports = BottomLeftView = (function(_super) {

    __extends(BottomLeftView, _super);

    function BottomLeftView() {
      return BottomLeftView.__super__.constructor.apply(this, arguments);
    }

    BottomLeftView.prototype.template = template;

    BottomLeftView.prototype.container = '.bottom-left-panel';

    BottomLeftView.prototype.initialize = function() {
      this.render();
      return this.subscribeEvent("updateValue", this.updateValue);
    };

    BottomLeftView.prototype.updateValue = function() {
      console.log("get updateValue event");
      return this.render();
    };

    BottomLeftView.prototype.render = function() {
      return BottomLeftView.__super__.render.apply(this, arguments);
    };

    return BottomLeftView;

  })(View);
  
}});

window.require.define({"views/bottom_right_view": function(exports, require, module) {
  var BottomRightView, Handlebar, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/bottom_right');

  Handlebar = require('lib/view_helper');

  module.exports = BottomRightView = (function(_super) {

    __extends(BottomRightView, _super);

    function BottomRightView() {
      return BottomRightView.__super__.constructor.apply(this, arguments);
    }

    BottomRightView.prototype.template = template;

    BottomRightView.prototype.container = '.bottom-right-panel';

    BottomRightView.prototype.initialize = function() {
      this.render();
      return this.subscribeEvent("updateValue", this.updateValue);
    };

    BottomRightView.prototype.updateValue = function() {
      console.log("get updateValue event");
      return this.render();
    };

    BottomRightView.prototype.render = function() {
      return BottomRightView.__super__.render.apply(this, arguments);
    };

    return BottomRightView;

  })(View);
  
}});

window.require.define({"views/footer_view": function(exports, require, module) {
  var FooterView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/footer');

  module.exports = FooterView = (function(_super) {

    __extends(FooterView, _super);

    function FooterView() {
      return FooterView.__super__.constructor.apply(this, arguments);
    }

    FooterView.prototype.template = template;

    FooterView.prototype.autoRender = true;

    FooterView.prototype.container = "#footer";

    return FooterView;

  })(View);
  
}});

window.require.define({"views/header_view": function(exports, require, module) {
  var HeaderView, View, mediator, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.template = template;

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.initialize = function() {
      HeaderView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('loginStatus', this.render);
      return this.subscribeEvent('startupController', this.render);
    };

    return HeaderView;

  })(View);
  
}});

window.require.define({"views/home_page_view": function(exports, require, module) {
  var HomePageView, PageView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  PageView = require('views/base/page_view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.template = template;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.tagName = 'section';

    return HomePageView;

  })(PageView);
  
}});

window.require.define({"views/layout": function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.initialize = function() {
      return Layout.__super__.initialize.apply(this, arguments);
    };

    return Layout;

  })(Chaplin.Layout);
  
}});

window.require.define({"views/login_view": function(exports, require, module) {
  var LoginView, View, mediator, template, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  utils = require('lib/utils');

  View = require('views/base/view');

  template = require('views/templates/login');

  module.exports = LoginView = (function(_super) {

    __extends(LoginView, _super);

    function LoginView() {
      return LoginView.__super__.constructor.apply(this, arguments);
    }

    LoginView.prototype.template = template;

    LoginView.prototype.id = 'login';

    LoginView.prototype.container = '#content-container';

    LoginView.prototype.autoRender = true;

    LoginView.prototype.initialize = function(options) {
      LoginView.__super__.initialize.apply(this, arguments);
      return this.initButtons(options.serviceProviders);
    };

    LoginView.prototype.initButtons = function(serviceProviders) {
      var buttonSelector, failed, loaded, loginHandler, serviceProvider, serviceProviderName, _results;
      _results = [];
      for (serviceProviderName in serviceProviders) {
        serviceProvider = serviceProviders[serviceProviderName];
        buttonSelector = "." + serviceProviderName;
        this.$(buttonSelector).addClass('service-loading');
        loginHandler = _(this.loginWith).bind(this, serviceProviderName, serviceProvider);
        this.delegate('click', buttonSelector, loginHandler);
        loaded = _(this.serviceProviderLoaded).bind(this, serviceProviderName, serviceProvider);
        serviceProvider.done(loaded);
        failed = _(this.serviceProviderFailed).bind(this, serviceProviderName, serviceProvider);
        _results.push(serviceProvider.fail(failed));
      }
      return _results;
    };

    LoginView.prototype.loginWith = function(serviceProviderName, serviceProvider, e) {
      e.preventDefault();
      if (!serviceProvider.isLoaded()) {
        return;
      }
      mediator.publish('login:pickService', serviceProviderName);
      return mediator.publish('!login', serviceProviderName);
    };

    LoginView.prototype.serviceProviderLoaded = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading');
    };

    LoginView.prototype.serviceProviderFailed = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading').addClass('service-unavailable').attr('disabled', true).attr('title', "Error connecting. Please check whether you areblocking " + (utils.upcase(serviceProviderName)) + ".");
    };

    return LoginView;

  })(View);
  
}});

window.require.define({"views/templates/backbone.validation-0.6.2": function(exports, require, module) {
  // Backbone.Validation v0.6.2
  //
  // Copyright (c) 2011-2012 Thomas Pedersen
  // Distributed under MIT License
  //
  // Documentation and full license available at:
  // http://thedersen.com/projects/backbone-validation
  
  (function (factory) {
    if (typeof exports === 'object') {
      module.exports = factory(require('backbone'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
      define(['backbone', 'underscore'], factory);
    }
  }(function (Backbone, _) {
  
  Backbone.Validation = (function(_){
    'use strict';
  
    // Default options
    // ---------------
  
    var defaultOptions = {
        forceUpdate: false,
        selector: 'name',
        labelFormatter: 'sentenceCase',
        valid: Function.prototype,
        invalid: Function.prototype
    };
  
  
    // Validation
    // ----------
  
    var Validation = (function(){
  
      // Returns an object with undefined properties for all
      // attributes on the model that has defined one or more
      // validation rules.
      var getValidatedAttrs = function(model) {
        return _.reduce(_.keys(model.validation || {}), function(memo, key) {
          memo[key] = void 0;
          return memo;
        }, {});
      };
  
      // Looks on the model for validations for a specified
      // attribute. Returns an array of any validators defined,
      // or an empty array if none is defined.
      var getValidators = function(model, attr) {
        var attrValidationSet = model.validation ? model.validation[attr] || {} : {};
  
        // If the validator is a function or a string, wrap it in a function validator
        if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
          attrValidationSet = {
            fn: attrValidationSet
          };
        }
  
        // Stick the validator object into an array
        if(!_.isArray(attrValidationSet)) {
          attrValidationSet = [attrValidationSet];
        }
  
        // Reduces the array of validators into a new array with objects
        // with a validation method to call, the value to validate against
        // and the specified error message, if any
        return _.reduce(attrValidationSet, function(memo, attrValidation) {
          _.each(_.without(_.keys(attrValidation), 'msg'), function(validator) {
            memo.push({
              fn: defaultValidators[validator],
              val: attrValidation[validator],
              msg: attrValidation.msg
            });
          });
          return memo;
        }, []);
      };
  
      // Validates an attribute against all validators defined
      // for that attribute. If one or more errors are found,
      // the first error message is returned.
      // If the attribute is valid, an empty string is returned.
      var validateAttr = function(model, attr, value, computed) {
        // Reduces the array of validators to an error message by
        // applying all the validators and returning the first error
        // message, if any.
        return _.reduce(getValidators(model, attr), function(memo, validator){
          var result = validator.fn.call(defaultValidators, value, attr, validator.val, model, computed);
          if(result === false || memo === false) {
            return false;
          }
          if (result && !memo) {
            return validator.msg || result;
          }
          return memo;
        }, '');
      };
  
      // Loops through the model's attributes and validates them all.
      // Returns and object containing names of invalid attributes
      // as well as error messages.
      var validateModel = function(model, attrs) {
        var error, attr,
            invalidAttrs = {},
            isValid = true,
            computed = _.clone(attrs);
  
        for (attr in attrs) {
          error = validateAttr(model, attr, attrs[attr], computed);
          if (error) {
            invalidAttrs[attr] = error;
            isValid = false;
          }
        }
  
        return {
          invalidAttrs: invalidAttrs,
          isValid: isValid
        };
      };
  
      // Contains the methods that are mixed in on the model when binding
      var mixin = function(view, options) {
        return {
  
          // Check whether or not a value passes validation
          // without updating the model
          preValidate: function(attr, value) {
            return validateAttr(this, attr, value, _.extend({}, this.attributes));
          },
  
          // Check to see if an attribute, an array of attributes or the
          // entire model is valid. Passing true will force a validation
          // of the model.
          isValid: function(option) {
            if(_.isString(option)){
              return !validateAttr(this, option, this.get(option), _.extend({}, this.attributes));
            }
            if(_.isArray(option)){
              for (var i = 0; i < option.length; i++) {
                if(validateAttr(this, option[i], this.get(option[i]), _.extend({}, this.attributes))){
                  return false;
                }
              }
              return true;
            }
            if(option === true) {
              this.validate();
            }
            return this.validation ? this._isValid : true;
          },
  
          // This is called by Backbone when it needs to perform validation.
          // You can call it manually without any parameters to validate the
          // entire model.
          validate: function(attrs, setOptions){
            var model = this,
                validateAll = !attrs,
                opt = _.extend({}, options, setOptions),
                allAttrs = _.extend(getValidatedAttrs(model), model.attributes, attrs),
                changedAttrs = attrs || allAttrs,
                result = validateModel(model, allAttrs);
  
            model._isValid = result.isValid;
  
            // After validation is performed, loop through all changed attributes
            // and call either the valid or invalid callback so the view is updated.
            for(var attr in allAttrs) {
              var invalid = result.invalidAttrs.hasOwnProperty(attr),
                  changed = changedAttrs.hasOwnProperty(attr);
              if(invalid && (changed || validateAll)){
                opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
              }
              if(!invalid){
                opt.valid(view, attr, opt.selector);
              }
            }
  
            // Trigger validated events.
            // Need to defer this so the model is actually updated before
            // the event is triggered.
            _.defer(function() {
              model.trigger('validated', model._isValid, model, result.invalidAttrs);
              model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
            });
  
            // Return any error messages to Backbone, unless the forceUpdate flag is set.
            // Then we do not return anything and fools Backbone to believe the validation was
            // a success. That way Backbone will update the model regardless.
            if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
              return result.invalidAttrs;
            }
          }
        };
      };
  
      // Helper to mix in validation on a model
      var bindModel = function(view, model, options) {
        _.extend(model, mixin(view, options));
      };
  
      // Removes the methods added to a model
      var unbindModel = function(model) {
        delete model.validate;
        delete model.preValidate;
        delete model.isValid;
      };
  
      // Mix in validation on a model whenever a model is
      // added to a collection
      var collectionAdd = function(model) {
        bindModel(this.view, model, this.options);
      };
  
      // Remove validation from a model whenever a model is
      // removed from a collection
      var collectionRemove = function(model) {
        unbindModel(model);
      };
  
      // Returns the public methods on Backbone.Validation
      return {
  
        // Current version of the library
        version: '0.6.2',
  
        // Called to configure the default options
        configure: function(options) {
          _.extend(defaultOptions, options);
        },
  
        // Hooks up validation on a view with a model
        // or collection
        bind: function(view, options) {
          var model = view.model,
              collection = view.collection;
          options = _.extend({}, defaultOptions, defaultCallbacks, options);
  
          if(typeof model === 'undefined' && typeof collection === 'undefined'){
            throw 'Before you execute the binding your view must have a model or a collection.\n' +
                  'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
          }
  
          if(model) {
            bindModel(view, model, options);
          }
          if(collection) {
            collection.each(function(model){
              bindModel(view, model, options);
            });
            collection.bind('add', collectionAdd, {view: view, options: options});
            collection.bind('remove', collectionRemove);
          }
        },
  
        // Removes validation from a view with a model
        // or collection
        unbind: function(view) {
          var model = view.model,
              collection = view.collection;
  
          if(model) {
            unbindModel(view.model);
          }
          if(collection) {
            collection.each(function(model){
              unbindModel(model);
            });
            collection.unbind('add', collectionAdd);
            collection.unbind('remove', collectionRemove);
          }
        },
  
        // Used to extend the Backbone.Model.prototype
        // with validation
        mixin: mixin(null, defaultOptions)
      };
    }());
  
  
    // Callbacks
    // ---------
  
    var defaultCallbacks = Validation.callbacks = {
  
      // Gets called when a previously invalid field in the
      // view becomes valid. Removes any error message.
      // Should be overridden with custom functionality.
      valid: function(view, attr, selector) {
        view.$('[' + selector + '~=' + attr + ']')
            .removeClass('invalid')
            .removeAttr('data-error');
      },
  
      // Gets called when a field in the view becomes invalid.
      // Adds a error message.
      // Should be overridden with custom functionality.
      invalid: function(view, attr, error, selector) {
        view.$('[' + selector + '~=' + attr + ']')
            .addClass('invalid')
            .attr('data-error', error);
      }
    };
  
  
    // Patterns
    // --------
  
    var defaultPatterns = Validation.patterns = {
      // Matches any digit(s) (i.e. 0-9)
      digits: /^\d+$/,
  
      // Matched any number (e.g. 100.000)
      number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
  
      // Matches a valid email address (e.g. mail@example.com)
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  
      // Mathes any valid url (e.g. http://www.xample.com)
      url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    };
  
  
    // Error messages
    // --------------
  
    // Error message for the build in validators.
    // {x} gets swapped out with arguments form the validator.
    var defaultMessages = Validation.messages = {
      required: '{0} is required',
      acceptance: '{0} must be accepted',
      min: '{0} must be greater than or equal to {1}',
      max: '{0} must be less than or equal to {1}',
      range: '{0} must be between {1} and {2}',
      length: '{0} must be {1} characters',
      minLength: '{0} must be at least {1} characters',
      maxLength: '{0} must be at most {1} characters',
      rangeLength: '{0} must be between {1} and {2} characters',
      oneOf: '{0} must be one of: {1}',
      equalTo: '{0} must be the same as {1}',
      pattern: '{0} must be a valid {1}'
    };
  
    // Label formatters
    // ----------------
  
    // Label formatters are used to convert the attribute name
    // to a more human friendly label when using the built in
    // error messages.
    // Configure which one to use with a call to
    //
    //     Backbone.Validation.configure({
    //       labelFormatter: 'label'
    //     });
    var defaultLabelFormatters = Validation.labelFormatters = {
  
      // Returns the attribute name with applying any formatting
      none: function(attrName) {
        return attrName;
      },
  
      // Converts attributeName or attribute_name to Attribute name
      sentenceCase: function(attrName) {
        return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
          return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
        }).replace('_', ' ');
      },
  
      // Looks for a label configured on the model and returns it
      //
      //      var Model = Backbone.Model.extend({
      //        validation: {
      //          someAttribute: {
      //            required: true
      //          }
      //        },
      //
      //        labels: {
      //          someAttribute: 'Custom label'
      //        }
      //      });
      label: function(attrName, model) {
        return model.labels[attrName] || defaultLabelFormatters.sentenceCase(attrName, model);
      }
    };
  
    // Built in validators
    // -------------------
  
    var defaultValidators = Validation.validators = (function(){
      // Use native trim when defined
      var trim = String.prototype.trim ?
          function(text) {
              return text === null ? '' : String.prototype.trim.call(text);
          } :
          function(text) {
              var trimLeft = /^\s+/,
                  trimRight = /\s+$/;
  
              return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
          };
  
      // Uses the configured label formatter to format the attribute name
      // to make it more readable for the user
      var formatLabel = function(attrName, model) {
        return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
      };
  
      // Replaces nummeric placeholders like {0} in a string with arguments
      // passed to the function
      var format = function() {
        var args = Array.prototype.slice.call(arguments);
        var text = args.shift();
        return text.replace(/\{(\d+)\}/g, function(match, number) {
          return typeof args[number] !== 'undefined' ? args[number] : match;
        });
      };
  
      // Determines whether or not a value is a number
      var isNumber = function(value){
        return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
      };
  
      // Determines whether or not not a value is empty
      var hasValue = function(value) {
        return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === ''));
      };
  
      return {
        // Function validator
        // Lets you implement a custom function used for validation
        fn: function(value, attr, fn, model, computed) {
          if(_.isString(fn)){
            fn = model[fn];
          }
          return fn.call(model, value, attr, computed);
        },
  
        // Required validator
        // Validates if the attribute is required or not
        required: function(value, attr, required, model, computed) {
          var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
          if(!isRequired && !hasValue(value)) {
            return false; // overrides all other validators
          }
          if (isRequired && !hasValue(value)) {
            return format(defaultMessages.required, formatLabel(attr, model));
          }
        },
  
        // Acceptance validator
        // Validates that something has to be accepted, e.g. terms of use
        // `true` or 'true' are valid
        acceptance: function(value, attr, accept, model) {
          if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
            return format(defaultMessages.acceptance, formatLabel(attr, model));
          }
        },
  
        // Min validator
        // Validates that the value has to be a number and equal to or greater than
        // the min value specified
        min: function(value, attr, minValue, model) {
          if (!isNumber(value) || value < minValue) {
            return format(defaultMessages.min, formatLabel(attr, model), minValue);
          }
        },
  
        // Max validator
        // Validates that the value has to be a number and equal to or less than
        // the max value specified
        max: function(value, attr, maxValue, model) {
          if (!isNumber(value) || value > maxValue) {
            return format(defaultMessages.max, formatLabel(attr, model), maxValue);
          }
        },
  
        // Range validator
        // Validates that the value has to be a number and equal to or between
        // the two numbers specified
        range: function(value, attr, range, model) {
          if(!isNumber(value) || value < range[0] || value > range[1]) {
            return format(defaultMessages.range, formatLabel(attr, model), range[0], range[1]);
          }
        },
  
        // Length validator
        // Validates that the value has to be a string with length equal to
        // the length value specified
        length: function(value, attr, length, model) {
          if (!hasValue(value) || trim(value).length !== length) {
            return format(defaultMessages.length, formatLabel(attr, model), length);
          }
        },
  
        // Min length validator
        // Validates that the value has to be a string with length equal to or greater than
        // the min length value specified
        minLength: function(value, attr, minLength, model) {
          if (!hasValue(value) || trim(value).length < minLength) {
            return format(defaultMessages.minLength, formatLabel(attr, model), minLength);
          }
        },
  
        // Max length validator
        // Validates that the value has to be a string with length equal to or less than
        // the max length value specified
        maxLength: function(value, attr, maxLength, model) {
          if (!hasValue(value) || trim(value).length > maxLength) {
            return format(defaultMessages.maxLength, formatLabel(attr, model), maxLength);
          }
        },
  
        // Range length validator
        // Validates that the value has to be a string and equal to or between
        // the two numbers specified
        rangeLength: function(value, attr, range, model) {
          if(!hasValue(value) || trim(value).length < range[0] || trim(value).length > range[1]) {
            return format(defaultMessages.rangeLength, formatLabel(attr, model), range[0], range[1]);
          }
        },
  
        // One of validator
        // Validates that the value has to be equal to one of the elements in
        // the specified array. Case sensitive matching
        oneOf: function(value, attr, values, model) {
          if(!_.include(values, value)){
            return format(defaultMessages.oneOf, formatLabel(attr, model), values.join(', '));
          }
        },
  
        // Equal to validator
        // Validates that the value has to be equal to the value of the attribute
        // with the name specified
        equalTo: function(value, attr, equalTo, model, computed) {
          if(value !== computed[equalTo]) {
            return format(defaultMessages.equalTo, formatLabel(attr, model), formatLabel(equalTo, model));
          }
        },
  
        // Pattern validator
        // Validates that the value has to match the pattern specified.
        // Can be a regular expression or the name of one of the built in patterns
        pattern: function(value, attr, pattern, model) {
          if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
            return format(defaultMessages.pattern, formatLabel(attr, model), pattern);
          }
        }
      };
    }());
  
    return Validation;
  }(_));
  
    return Backbone.Validation;
  }));
  
}});

window.require.define({"views/templates/bottom_left": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "";
    return buffer;}

    buffer += "<h2> Math: Multiply </h2>\r\n<h3>";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + "  * ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " = ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.multiple;
    stack3 = foundHelper || depth0.multiple;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</h3>\r\n<p> First Number: ";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<p> Second Number: ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<strong> Total: <span id=\"total\">";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.multiple;
    stack3 = foundHelper || depth0.multiple;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</span> </strong>\r\n";
    return buffer;});
}});

window.require.define({"views/templates/bottom_right": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "";
    return buffer;}

    buffer += "<h2> Math: Divide </h2>\r\n<h3>";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + "  / ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " = ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.divide;
    stack3 = foundHelper || depth0.divide;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</h3>\r\n<p> First Number: ";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<p> Second Number: ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<strong> Total: <span id=\"total\">";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.divide;
    stack3 = foundHelper || depth0.divide;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</span> </strong>\r\n";
    return buffer;});
}});

window.require.define({"views/templates/footer": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\r\n	<a href=\"";
    foundHelper = helpers.href;
    stack1 = foundHelper || depth0.href;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "href", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a>\r\n";
    return buffer;}

    foundHelper = helpers.links;
    stack1 = foundHelper || depth0.links;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\r\n";
    return buffer;});
}});

window.require.define({"views/templates/header": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\r\n	<a class=\"header-link\" href=\"";
    foundHelper = helpers.href;
    stack1 = foundHelper || depth0.href;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "href", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a>\r\n";
    return buffer;}

    foundHelper = helpers.items;
    stack1 = foundHelper || depth0.items;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\r\n";
    return buffer;});
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<a href=\"http://brunch.io/\">\r\n	<img src=\"http://brunch.io/images/brunch.png\" alt=\"Brunch\" />\r\n</a>\r\n";});
}});

window.require.define({"views/templates/login": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", foundHelper, self=this;


    return buffer;});
}});

window.require.define({"views/templates/topCenter": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<p>\r\n	<label>First Number: </label>\r\n	<input type=\"text\" id=\"first_num\" name=\"first_number\">\r\n	<span class=\"validation\"></span>\r\n</p>\r\n<p>\r\n	<label>Second Number: </label>\r\n	<input type=\"text\" id=\"second_num\" name=\"second_number\">\r\n	<span class=\"validation\"></span>\r\n</p>\r\n<p>\r\n	<button>Submit</button>\r\n</p>\r\n";});
}});

window.require.define({"views/templates/top_left": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "";
    return buffer;}

    buffer += "<h2> Math: Plus </h2>\r\n<h3>";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " +  ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " = ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.plus;
    stack3 = foundHelper || depth0.plus;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</h3>\r\n<p> First Number: ";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<p> Second Number: ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<strong> Total: <span id=\"total\">";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.plus;
    stack3 = foundHelper || depth0.plus;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</span> </strong>\r\n";
    return buffer;});
}});

window.require.define({"views/templates/top_right": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "";
    return buffer;}

    buffer += "<h2> Math: Minus </h2>\r\n<h3>";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " - ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " = ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.minus;
    stack3 = foundHelper || depth0.minus;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</h3>\r\n<p> First Number: ";
    foundHelper = helpers.first_number;
    stack1 = foundHelper || depth0.first_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "first_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<p> Second Number: ";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "second_number", { hash: {} }); }
    buffer += escapeExpression(stack1) + " </p>\r\n<strong> Total: <span id=\"total\">";
    foundHelper = helpers.second_number;
    stack1 = foundHelper || depth0.second_number;
    foundHelper = helpers.first_number;
    stack2 = foundHelper || depth0.first_number;
    foundHelper = helpers.minus;
    stack3 = foundHelper || depth0.minus;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</span> </strong>\r\n";
    return buffer;});
}});

window.require.define({"views/topCenter_view": function(exports, require, module) {
  var TopCenterView, Validation, View, mediator, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  Validation = require('views/templates/backbone.validation-0.6.2');

  mediator = require('mediator');

  template = require('views/templates/topCenter');

  module.exports = TopCenterView = (function(_super) {

    __extends(TopCenterView, _super);

    function TopCenterView() {
      return TopCenterView.__super__.constructor.apply(this, arguments);
    }

    TopCenterView.prototype.template = template;

    TopCenterView.prototype.container = '.top-center-panel';

    TopCenterView.prototype.tagName = 'form';

    TopCenterView.prototype.autoRender = true;

    TopCenterView.prototype.obj = null;

    TopCenterView.prototype.initialize = function() {
      this.on("change", this.getChangeResult, this);
      return Validation.bind(this);
    };

    TopCenterView.prototype.events = {
      'click button': "fireEvent"
    };

    TopCenterView.prototype.fireEvent = function(e) {
      var first_val, second_val;
      e.preventDefault();
      first_val = this.getFirstValue();
      second_val = this.getSecondValue();
      this.model.set({
        "first_number": first_val || 0,
        "second_number": second_val || 0
      });
      console.log(this.model.isValid());
      if (this.model.isValid(['first_number', 'second_number'])) {
        return mediator.publish("updateValue");
      }
    };

    TopCenterView.prototype.checkValidate = function(e) {
      var validator;
      validator = ($(e.target)).attr('name');
      return console.log(this.model.isValid(validator));
    };

    TopCenterView.prototype.getFirstValue = function() {
      var first;
      return first = ($("#first_num")).val();
    };

    TopCenterView.prototype.getSecondValue = function() {
      var second;
      return second = ($("#second_num")).val();
    };

    TopCenterView.prototype.getChangeResult = function() {
      return console.log(this.model.attributes);
    };

    return TopCenterView;

  })(View);
  
}});

window.require.define({"views/top_left_view": function(exports, require, module) {
  var Handlebar, TopLeftView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/top_left');

  Handlebar = require('lib/view_helper');

  module.exports = TopLeftView = (function(_super) {

    __extends(TopLeftView, _super);

    function TopLeftView() {
      return TopLeftView.__super__.constructor.apply(this, arguments);
    }

    TopLeftView.prototype.template = template;

    TopLeftView.prototype.container = '.top-left-panel';

    TopLeftView.prototype.initialize = function() {
      this.render();
      return this.subscribeEvent("updateValue", this.updateValue);
    };

    TopLeftView.prototype.updateValue = function() {
      console.log("get updateValue event");
      return this.render();
    };

    TopLeftView.prototype.render = function() {
      return TopLeftView.__super__.render.apply(this, arguments);
    };

    return TopLeftView;

  })(View);
  
}});

window.require.define({"views/top_right_view": function(exports, require, module) {
  var Handlebar, TopRightView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/top_right');

  Handlebar = require('lib/view_helper');

  module.exports = TopRightView = (function(_super) {

    __extends(TopRightView, _super);

    function TopRightView() {
      return TopRightView.__super__.constructor.apply(this, arguments);
    }

    TopRightView.prototype.template = template;

    TopRightView.prototype.container = '.top-right-panel';

    TopRightView.prototype.initialize = function() {
      this.render();
      return this.subscribeEvent("updateValue", this.updateValue);
    };

    TopRightView.prototype.updateValue = function() {
      console.log("get updateValue event");
      return this.render();
    };

    TopRightView.prototype.render = function() {
      return TopRightView.__super__.render.apply(this, arguments);
    };

    return TopRightView;

  })(View);
  
}});

