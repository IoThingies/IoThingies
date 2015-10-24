angular.module('IoThingies.createdevice').controller('CreateDeviceCtrl', [
  '$scope', '$meteor', '$mdDialog',
  function ($scope, $meteor, $mdDialog) {
    const vm = this;

    vm.device = {
      config: {},
      readings: []
    };
    //vm.closeDialog = function() {
    //    console.log('closebtn');
    //
    //    $mdDialog.hide();
    //};
    vm.closeDialog = closeDialog;

    vm.create = () => {
      Devices.insert(vm.device);
      $mdDialog.hide();
    };

    // Dialog #1 - Show simple alert dialog and cache
    // reference to dialog instance
    function closeDialog() {
      console.log('clicked!');
      $mdDialog.hide();
    }
  }
]);