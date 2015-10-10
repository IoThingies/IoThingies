/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies.dashboard').controller('DashboardCtrl', [
  '$meteor',
  function ($meteor) {
    const vm = this;

    vm.devices = $meteor.collection(Devices);
    vm.counter = 0;

    vm.increase = ()=> vm.counter++;
  }
]);