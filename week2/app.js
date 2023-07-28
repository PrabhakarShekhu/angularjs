(function ()
{
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope)
  {
    var lunchCtrl = this;
    lunchCtrl.lunchItems = "";
    lunchCtrl.message = "";

    lunchCtrl.checkIfTooMuch = function ()
    {
      if (lunchCtrl.lunchItems.trim() === "")
      {
        lunchCtrl.message = "Please enter data first";
      } else 
      {
        var items = lunchCtrl.lunchItems.split(',');
        var itemCount = items.length;

        items = items.filter(function (item)
        {
          return item.trim() !== "";
        });

        itemCount = items.length;

        if (itemCount <= 3)
        {
          lunchCtrl.message = "Enjoy!";
        } else
        {
          lunchCtrl.message = "Too much!";
        }
      }
    };
  }
})
();
