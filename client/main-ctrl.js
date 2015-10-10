/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies').controller('MainCtrl', [
  /*'navService',*/
  '$mdSidenav',
  '$mdBottomSheet',
  '$log',
  '$q',
  '$state',
  '$mdToast',
  function (/*navService,*/ $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast) {

    var vm = this;

    vm.menuItems = [ ];
    vm.selectItem = selectItem;
    vm.toggleItemsList = toggleItemsList;
    //vm.showActions = showActions;
    vm.title = $state.current.data.title;
    vm.showSimpleToast = showSimpleToast;

    //navService
    //  .loadAllItems()
    //  .then(function(menuItems) {
    //    vm.menuItems = [].concat(menuItems);
    //  });

    vm.menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: '.dashboard'
      },
      {
        name: 'Profile',
        icon: 'person',
        sref: '.profile'
      },
      {
        name: 'Table',
        icon: 'view_module',
        sref: '.table'
      }
    ];

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectItem (item) {
      vm.title = item.name;
      vm.toggleItemsList();
      vm.showSimpleToast(vm.title);
    }

    //function showActions($event) {
    //  $mdBottomSheet.show({
    //    parent: angular.element(document.getElementById('content')),
    //    templateUrl: 'app/views/partials/bottomSheet.html',
    //    controller: [ '$mdBottomSheet', SheetController],
    //    controllerAs: "vm",
    //    bindToController : true,
    //    targetEvent: $event
    //  }).then(function(clickedItem) {
    //    clickedItem && $log.debug( clickedItem.name + ' clicked!');
    //  });
    //
    //  function SheetController( $mdBottomSheet ) {
    //    var vm = this;
    //
    //    vm.actions = [
    //      { name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
    //      { name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
    //    ];
    //
    //    vm.performAction = function(action) {
    //      $mdBottomSheet.hide(action);
    //    };
    //  }
    //}

    function showSimpleToast(title) {
      $mdToast.show(
        $mdToast.simple()
          .content(title)
          .hideDelay(2000)
          .position('top right')
      );
    }
  }
]);