/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies.dashboard').controller('DashboardCtrl', [
  '$meteor',
  function ($meteor) {
    const vm = this;

    vm.devices = $meteor.collection(Devices);

    vm.removeDevice = (device) => vm.devices.remove(device);
  }
]);