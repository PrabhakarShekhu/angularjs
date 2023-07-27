(function () {
    'use strict';

    angular.module('LunchCheck', []);
})();
(function () {
    'use strict';

    angular.module('LunchCheck')
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        // Implementation of the controller goes here
    }
})();
