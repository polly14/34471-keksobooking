'use strict';

var formTitle = document.querySelector('#title');
var formPrice = document.querySelector('#price');
var formAdress = document.querySelector('#address');
var dialogOpenPins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogCloseButton = dialog.querySelector('.dialog__close');
var arrive = document.querySelector('#time');
var depart = document.querySelector('#timeout');
var apartType = document.querySelector('#type');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

formTitle.required = true;
formTitle.max = 100;
formTitle.min = 30;
formPrice.required = true;
formPrice.max = 1000000;
formPrice.min = 1000;
formAdress.required = true;

arrive.addEventListener('click', function () {
  depart.selectedIndex = arrive.selectedIndex;
});
depart.addEventListener('click', function () {
  arrive.selectedIndex = depart.selectedIndex;
});

formPrice.addEventListener('change', function () {
  apartType.value = formPrice.value;
});
apartType.addEventListener('change', function () {
  formPrice.value = apartType.value;
});

roomNumber.addEventListener('change', function () {
  capacity.value = roomNumber.value;
});
capacity.addEventListener('change', function () {
  roomNumber.value = capacity.value;
});

for (var i = 0; i < dialogOpenPins.length; i++) {
  clickControl(dialogOpenPins[i]);
}

function openDialog(dialogPin) {
  for (i = 0; i < dialogOpenPins.length; i++) {
    dialogOpenPins[i].classList.remove('pin--active');
  }
  dialogPin.classList.add('pin--active');
  dialog.classList.remove('invisible');
}

function closeDialog() {
  for (i = 0; i < dialogOpenPins.length; i++) {
    dialogOpenPins[i].classList.remove('pin--active');
  }
  dialog.classList.add('invisible');
}

dialogCloseButton.addEventListener('click', closeDialog);

function clickControl(dialogPin) {
  dialogPin.addEventListener('click', function () {
    openDialog(dialogPin);
  });
}
