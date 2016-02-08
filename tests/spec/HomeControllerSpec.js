describe("HomeController", function () {
  "use strict";
  beforeEach(function () {
    this.stopService = {
      getInfoForStop: function () {}
    };
    this.navService = {
      pushState: function () {}
    };
    this.subject = new WB.HomeController({
      getLocation: function () {}
    }, this.stopService, this.navService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  describe("When the user clicks 'Nearby stops'", function () {
    beforeEach(function () {
      WB.specHelper.simulateClick(this.root.querySelector(".nearby-stops"));
    });

    it("should show a NearbyStopsController", function () {
      expect(this.subject._child instanceof WB.NearbyStopsController).toBe(true);
      expect(this.root.querySelector(".child").firstChild).toBe(this.subject._child._root);
    });

    describe("When the NearbyStopsController's shouldShowStop event fires", function () {
      beforeEach(function () {
        this.subject._child.shouldShowStop.trigger("1_619");
      });

      it("should replace the NearbyStopController with a StopInfoController", function () {
        expect(this.subject._child instanceof WB.StopInfoController).toBe(true);
        var stopInfoController = this.subject._child;
        expect(stopInfoController._stopId).toEqual("1_619");
        expect(stopInfoController._root.parentNode).toBe(this.subject._root.querySelector(".child"));
      });
    });
  });
});
