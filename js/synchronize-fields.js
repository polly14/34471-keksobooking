'use strict';

window.synchronizeFields = (function () {
  return function (firstSelect, secondSelect, firstArray, secondArray, callback) {
    firstSelect.addEventListener('change', function () {
      if (typeof callback === 'function') {
        callback(secondSelect, secondArray[firstArray.indexOf(firstSelect.value)]);
      }
    });
  };
})();
