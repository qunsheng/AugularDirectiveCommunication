var app = angular.module("app", []);

app.directive("country", function() {
    return {
        restrict: "E",
        // 
        // controler build an api for other directives to call
        //
        controller: function() {
            this.makeAnnouncement = function(message) {
                console.log("Country says: " + message);
            }
        }
    }
});


app.directive("state", function() {
    return {
        restrict: "E",
        //
		// use reqire to get controller of other directives
		// The ^ prefix means that this directive searches for the controller on its parents 
		// (without the ^ prefix, the directive would look for the controller on just its own element).
		//
        require: "^country",
        controller: function() {
            this.makeLaw = function(law) {
                console.log("Law: " + law);
            }
        },
        //
        // the controller is the 4th parameters, you can call any name you want
		//
        link: function(scope, element, attrs, countryCtrl) {

        }
    }
});

app.directive("city", function() {
    return {
        restrict: "E",
        require: ["^country", "^state"],
        link: function(scope, element, attrs, ctrls) {
        	// call country controller api method
            ctrls[0].makeAnnouncement("from city");
            // call state controller api method
            ctrls[1].makeLaw("Jump higher");
        }
    }
});