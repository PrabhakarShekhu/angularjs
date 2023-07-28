// routes.js
(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Welcome to our Restaurant</h1>'
            })
            .state('categories', {
                url: '/categories',
                template: '<categories categories="ctrl.categories"></categories>',
                controller: CategoriesController,
                controllerAs: 'ctrl',
                resolve: {
                    categoriesData: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                template: '<items items="ctrl.items"></items>',
                controller: ItemsController,
                controllerAs: 'ctrl',
                resolve: {
                    itemsData: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }

    CategoriesController.$inject = ['categoriesData'];
    function CategoriesController(categoriesData) {
        var ctrl = this;
        ctrl.categories = categoriesData;
    }

    ItemsController.$inject = ['itemsData'];
    function ItemsController(itemsData) {
        var ctrl = this;
        ctrl.items = itemsData;
    }
})();
