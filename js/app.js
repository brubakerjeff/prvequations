
MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: "none",
        "HTML-CSS": {
        showMathMenu: false
    }
});
MathJax.Hub.Configured();

var myApp = angular.module("myApp", ['onsen']);

myApp.directive("mathjaxBinds", function () {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
            $scope.$watchCollection('[expressions]', function (value) {
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
});

myApp.directive("mathjaxBindp", function () {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
            $scope.$watchCollection('[expressionp]', function (value) {
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
});


myApp.controller('MyCtrl', ['$scope', function($scope) {
    $scope.Pressure = 100;
    $scope.Radius = 2;
    $scope.Thickness = 1;
	$scope.Length=5;
	$scope.Modulus=300;
	$scope.Poisson=0.3;
	$scope.VisiblePage=1;
//$scope.expression ="4";
    $scope.$watchCollection('[Pressure,Length,Modulus,Radius,Thickness,VisiblePage]', function (value) {
        $scope.expressions = "\\sigma_{cr}=\\dfrac{\\pi^2 E t^2}{12(1-\\nu^2)L^2} = \\\\ " + 
		String(((Math.pow(3.14159,2)*$scope.Modulus*Math.pow(10,6)*Math.pow($scope.Thickness,2))/(12*(1-$scope.Poisson)*Math.pow($scope.Length,2))).toFixed(2))
              + "\\text{ psi}";
		$scope.expressionp = "p_{cr}=\\dfrac{Et^3}{12R^3(1-\\nu^2)} = \\\\" + 
		String((($scope.Modulus*Math.pow(10,6)*Math.pow($scope.Thickness,3))/(12*Math.pow($scope.Radius,3)*(1-Math.pow($scope.Poisson,2)))).toFixed(2)) 
        + "\\text{ psi}";

	});

}]);

