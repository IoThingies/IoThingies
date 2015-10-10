/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies.dashboard').controller('DashboardCtrl', function ($scope) {
  $scope.counter = 0;
  $scope.increase = function () {
    $scope.counter++;
  }
});