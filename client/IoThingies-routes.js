/**
 * Created by naor on 10/10/15.
 */
angular.module('IoThingies')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$mdThemingProvider',
    '$mdIconProvider',
    function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
      $stateProvider
        .state('home', {
          url: '',
          templateUrl: 'client/main.ng.html',
          controller: 'MainCtrl',
          controllerAs: 'vm',
          abstract: true
        })
        .state('home.dashboard', {
          url: '/dashboard',
          controller: 'DashboardCtrl',
          controllerAs: 'dashboard',
          templateUrl: 'client/dashboard/dashboard-main.ng.html',
          data: {
            title: 'Dashboard'
          }
        });
      //.state('home.profile', {
      //  url: '/profile',
      //  templateUrl: 'app/views/profile.html',
      //  controller: 'ProfileController',
      //  controllerAs: 'vm',
      //  data: {
      //    title: 'Profile'
      //  }
      //})
      //.state('home.table', {
      //  url: '/table',
      //  controller: 'TableController',
      //  controllerAs: 'vm',
      //  templateUrl: 'app/views/table.html',
      //  data: {
      //    title: 'Table'
      //  }
      //});

      $urlRouterProvider.otherwise('/dashboard');

      $mdThemingProvider
        .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

      $mdThemingProvider.theme('dark', 'default')
        .primaryPalette('defaultPrimary')
        .dark();

      $mdThemingProvider.theme('grey', 'default')
        .primaryPalette('grey');

      $mdThemingProvider.theme('custom', 'default')
        .primaryPalette('defaultPrimary', {
          'hue-1': '50'
        });

      $mdThemingProvider.definePalette('defaultPrimary', {
        '50':  '#FFFFFF',
        '100': 'rgb(255, 198, 197)',
        '200': '#E75753',
        '300': '#E75753',
        '400': '#E75753',
        '500': '#E75753',
        '600': '#E75753',
        '700': '#E75753',
        '800': '#E75753',
        '900': '#E75753',
        'A100': '#E75753',
        'A200': '#E75753',
        'A400': '#E75753',
        'A700': '#E75753'
      });

      $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
    }]);