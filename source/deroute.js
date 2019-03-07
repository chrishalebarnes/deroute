(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Router = factory();
  }
}(this, function () {
  return {
    routes:{},
    route: function(url, e) {
      if(!url) { console.warn('Deroute: recieved undefined URL'); return; }
      url = new URL(url, window.location.href);

      if(typeof this.any === 'function') {
        this.any(url, e);
      }

      if(this.routes !== null) {
        if(typeof this.routes[url.hash] === 'function') {
          return this.routes[url.hash](url, e);
        } else {
          console.warn('Deroute: action not found for hash: ' + url.hash);
        }
      }
    },
    register: function(matcher, options) {
      this.configuration = options || { autoScroll: true };
      this.target = options && options.target ? options.target : window;
      this.target.addEventListener('hashchange', this.handler.bind(this), false);

      matcher(function(route, action) {
        if(this.routes !== null) {
          this.routes[route] = action;
        }
      }.bind(this), function(root) {
        if(root !== undefined && root !== null) {
          this.target.location.hash = root;
        }
      }.bind(this), function(any) {
        this.any = any;
      }.bind(this));
      return this;
    },
    handler: function(e) {
      var newUrl = e.newUrl ? e.newUrl : document.URL;
      if(e.newUrl) {
        this.route(newUrl, e);
      } else {
        this.route(newUrl, e);
      }
      if(this.configuration && this.configuration.autoScroll) {
        window.scrollTo(0, 0);
      }
    },
    dispose: function() {
      if(this.target !== undefined && this.target !== null) {
        this.target.removeEventListener('hashchange', this.handler, false);
      }

      for(var key in this) {
        if(Object.prototype.hasOwnProperty.call(this, key)) {
          delete this[key];
        }
      }
      Object.freeze(this);
    }
  };
}));
