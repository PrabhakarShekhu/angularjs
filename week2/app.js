(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.markAsBought = function (index) {
      ShoppingListCheckOffService.markAsBought(index);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [
      { name: 'cookies', quantity: 10 },
      { name: 'apples', quantity: 5 },
      { name: 'milk', quantity: 2 },
      { name: 'chips', quantity: 3 },
      { name: 'eggs', quantity: 12 }
    ];
    var alreadyBoughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };

    service.markAsBought = function (index) {
      var boughtItem = toBuyItems.splice(index, 1)[0];
      alreadyBoughtItems.push(boughtItem);
    };
  }

})();
