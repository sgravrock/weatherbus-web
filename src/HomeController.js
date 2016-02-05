(function () {
  "use strict";
  WB.HomeController = class extends WB.Controller {
    constructor(browserLocationService, stopService) {
      super();
      this.loginClicked = new WB.Event();
      this._browserLocationService = browserLocationService;
      this._stopService = stopService;
    }
  
    createDom() {
      var dom = this.createDomFromTemplate("#template_HomeController");
  
      dom.querySelector(".log-in").addEventListener("click", event => {
        event.preventDefault();
        this.loginClicked.trigger();
      });
  
      dom.querySelector(".nearby-stops").addEventListener("click", event => {
        event.preventDefault();
        this._showNearbyStops();
      });
  
      return dom;
    }
  
    _showNearbyStops() {
      this._child = new WB.NearbyStopsController(this._browserLocationService, this._stopService);
      this._child.appendTo(this._root.querySelector(".child"));
    }
  };
}());
