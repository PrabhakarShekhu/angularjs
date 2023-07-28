// Declare the AngularJS module
angular.module('NarrowItDownApp', [])

// Define the MenuSearchService
.service('MenuSearchService', ['$http', function ($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: 'GET',
            url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
        }).then(function (response) {
            var foundItems = [];

            var menuItems = response.data;
            for (var key in menuItems) {
                var menuItem = menuItems[key];
                if (menuItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                    foundItems.push(menuItem);
                }
            }

            return foundItems;
        });
    };
}])

.controller('NarrowItDownController', ['MenuSearchService', function (MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.foundItems = [];

    ctrl.narrowItDown = function () {
        if (ctrl.searchTerm.trim() === '') {
            ctrl.foundItems = [];
        } else {
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (foundItems) {
                    ctrl.foundItems = foundItems;
                });
        }
    };

    ctrl.removeItem = function (index) {
        ctrl.foundItems.splice(index, 1);
    };
}])

.directive('foundItems', function () {
    return {
        restrict: 'E',
        templateUrl: 'found-items.html',
        scope: {
            found: '<',
            onRemove: '&'
        }
    };
});
