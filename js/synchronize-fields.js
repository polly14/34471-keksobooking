'use strict';

window.synchronizeFields = function (firstSelect, secondSelect, firstArray, secondArray, selectProperty) {

  secondSelect.addEventListener('change', function () {
    firstSelect.value = firstArray[secondArray.indexOf(secondSelect[selectProperty])];
  });
  firstSelect.addEventListener('change', function () {
    secondSelect[selectProperty] = secondArray[firstArray.indexOf(firstSelect.value)];
  });

};
