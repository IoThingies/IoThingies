/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies.dashboard').controller('DashboardCtrl', ['$scope', function ($scope) {
  let x = 7;
  $scope.counter = 0;
  $scope.increase = function () {
    $scope.counter++;
  }
}]);