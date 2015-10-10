/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies.dashboard').controller('DashboardCtrl', [

  function () {

    var vm = this;


    vm.counter = 0;

    vm.increase = function () {
      vm.counter++;
    };
  }
]);