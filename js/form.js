import {sendData} from './fetch-pins.js';
import {successModalToggle, errorModalToggle} from './modal.js';


const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_PRICE_PLACEHOLDER = 1000;


const adForm = document.querySelector('.ad-form');
const typeSelect = document.querySelector('#type');
const resetBtn = document.querySelector('.ad-form__reset')
const getPriceMinValue = (typeSelectValue) => {
  switch (typeSelectValue) {
    case 'flat':
      return 1000;
    case 'bungalow':
      return 0;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    default:
      return 0;
  }
};

resetBtn.addEventListener('click', () => {
  document.querySelector('#price').placeholder = DEFAULT_PRICE_PLACEHOLDER;
})

typeSelect.addEventListener('change', () => {
  const priceMin = getPriceMinValue(typeSelect.value);
  document.querySelector('#price').placeholder = priceMin;
});



// Время заезда и выезда
let checkIn = document.querySelector('#timein');
let checkOut = document.querySelector('#timeout');


checkIn.addEventListener('change', (event) => {
  checkOut.value = event.target.value
});


checkOut.addEventListener('change', (event) => {
  checkIn.value = event.target.value
});


const room = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const getRoomCapacity = () => {
  for (let option of capacity.options) {
    option.disabled = !ROOMS_CAPACITY[room.value].includes(option.value);
  }
  capacity.value = ROOMS_CAPACITY[room.value].includes(capacity.value) ? capacity.value : ROOMS_CAPACITY[room.value][0];
};

room.addEventListener('change', () => {
  getRoomCapacity();
});

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// validation #price
const priceInput = document.querySelector('#price');
priceInput.addEventListener('input', () => {
  priceInput.reportValidity();
});

//Дефолтные данные и возврат к дефолту после отправки формы.

const typeDefault = document.querySelector('#type').value;
const timeInDefault = document.querySelector('#timein').value;
const roomDefault = document.querySelector('#room_number').value;
const timeOutDefault = document.querySelector('#timeout').value;
const featureCheckbox = document.querySelectorAll('.feature__checkbox');
const capacityDefault = document.querySelector('#capacity').value;
const descriptionDefault = document.querySelector('#description').value;

const onFormSuccess = () => {
  document.querySelector('#title').value = '';
  document.querySelector('#address').value = '35.6895000, 139.6917100';
  document.querySelector('#type').value = typeDefault;
  document.querySelector('#price').value = '';
  document.querySelector('#timein').value = timeInDefault;
  document.querySelector('#timeout').value = timeOutDefault;
  document.querySelector('#room_number').value = roomDefault;
  document.querySelector('#capacity').value = capacityDefault;
  featureCheckbox.forEach(element => {
    element.checked = false;
  });
  document.querySelector('#description').value = descriptionDefault;
  successModalToggle();
};

const onFormError = () => {
  errorModalToggle();
};



//Обработчик submit


const setUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target)

    sendData(
      () => onSuccess(),
      () => onError(),
      formData,
    );
  });
};

export {onFormSuccess, setUserFormSubmit, onFormError};
