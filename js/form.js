'use strict';

var formTitle = document.querySelector('#title');
var formPrice = document.querySelector('#price');
var formAdress = document.querySelector('#address');
var dialogOpenPins = document.querySelectorAll('.pin');
var containerPins = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogCloseButton = dialog.querySelector('.dialog__close');
var arrive = document.querySelector('#time');
var depart = document.querySelector('#timeout');
var apartType = document.querySelector('#type');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

formTitle.minLength = 30;
formTitle.maxLength = 100;
formTitle.required = true;
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
  apartType.value = formPrice.min;
});
apartType.addEventListener('change', function () {
  formPrice.min = apartType.value;
});

roomNumber.addEventListener('change', function () {
  capacity.value = roomNumber.value;
});
capacity.addEventListener('change', function () {
  roomNumber.value = capacity.value;
});

var isEnter = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

var onDialogKeydown = function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    dialog.classList.add('invisible');
  }
};

function openDialog(target) {
  for (var i = 0; i < dialogOpenPins.length; i++) {
    dialogOpenPins[i].classList.remove('pin--active');
  }
  target.classList.add('pin--active');
  dialog.classList.remove('invisible');
  document.addEventListener('keydown', onDialogKeydown);
  target.setAttribute('aria-pressed', 'true');
  dialog.setAttribute('aria-hidden', 'false');
}

function closeDialog() {
  for (var i = 0; i < dialogOpenPins.length; i++) {
    dialogOpenPins[i].classList.remove('pin--active');
    dialogOpenPins[i].setAttribute('aria-pressed', 'false');
  }
  dialog.classList.add('invisible');
  document.removeEventListener('keydown', onDialogKeydown);
  dialog.setAttribute('aria-hidden', 'true');
}

dialogCloseButton.addEventListener('click', closeDialog);

dialogCloseButton.addEventListener('keydown', function (evt) {
  if (isEnter(evt)) {
    closeDialog();
  }
});

containerPins.onclick = function (evt) {
  var target = evt.target;
  while (target !== containerPins) {
    if (target.classList.contains('pin')) {
      openDialog(target);
      return;
    }
    target = target.parentNode;
  }
};

containerPins.onkeydown = function (evt) {
  if (isEnter(evt)) {
    if (evt.target.classList.contains('pin')) {
      openDialog(evt.target);
    }
  }
};
