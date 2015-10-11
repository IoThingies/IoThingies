angular.module('IoThingies.createdevice').controller('CreateDeviceCtrl', [
    '$meteor', '$mdDialog',
    function ($meteor, $mdDialog) {
        const vm = this;

        //vm.closeDialog = function() {
        //    console.log('closebtn');
        //
        //    $mdDialog.hide();
        //};
        vm.closeDialog = closeDialog;

        // Dialog #1 - Show simple alert dialog and cache
        // reference to dialog instance
        function closeDialog() {
            console.log('clicked!');
            $mdDialog.hide();
        }
    }
]);