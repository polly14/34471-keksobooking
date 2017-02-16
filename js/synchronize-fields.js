'use strict';

window.synchronizeFields = function (firstSelect, secondSelect, firstArray, secondArray, selectProperty, callback) {

  if (typeof callback === 'function') {
    callback(firstSelect, secondSelect, firstArray, secondArray, selectProperty);
  }

};

window.synchronize = function (firstSelect, secondSelect, firstArray, secondArray, selectProperty) {

  secondSelect.addEventListener('change', function () {
    firstSelect.value = firstArray[secondArray.indexOf(secondSelect[selectProperty])];
  });
  firstSelect.addEventListener('change', function () {
    secondSelect[selectProperty] = secondArray[firstArray.indexOf(firstSelect.value)];
  });

};
