
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

            });
        }]
    };
});


myApp.controller('MyCtrl', ['$scope', function($scope) {
    $scope.Pressure = 100;
    $scope.Radius = 50;
    $scope.Thickness = 1;
    $scope.Modulus=30;
    $scope.Poisson=0.3;
    $scope.VisiblePage=1;
    
    $scope.CalculateS =  function() {
        $scope.expressions = "\\sigma_{cr}=\\dfrac{E t}{R\\sqrt{3(1-\\nu^2)}} = \\\\ \\text{               } " + 
		String((($scope.Modulus*Math.pow(10,6)*$scope.Thickness) / ($scope.Radius * Math.pow( 3*(1.0 - Math.pow($scope.Poisson, 2.0)) , 0.5) ) ).toFixed(2))
              + "\\text{ psi}";

        var $script = angular.element("<script type='math/tex'>")
                    .html($scope.expressions);
        $element =  angular.element(document.querySelector('#expressions'));
        $element.html("");
        $element.html($script);
        MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);



    };

    $scope.CalculateP =  function() {

        $scope.expressionp = "p_{cr}=\\dfrac{Et^3}{4R^3(1-\\nu^2)} = \\\\ \\text{               }" + 
        String((($scope.Modulus*Math.pow(10,6)*Math.pow($scope.Thickness,3))/(4*Math.pow($scope.Radius,3)*(1-Math.pow($scope.Poisson,2)))).toFixed(2)) 
        + "\\text{ psi}";
        var $script = angular.element("<script type='math/tex'>")
                    .html($scope.expressionp);
        $element =  angular.element(document.querySelector('#expressionp'));
        $element.html("");
        $element.html($script);
        MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);


    };
    $scope.CalculateS();


    
}
]);

