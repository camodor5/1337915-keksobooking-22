const typeSelect = document.querySelector('#type');
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


// Количество комнат - Количество мест
let roomsAmount = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');

const capacityDisabled = () => {
  for (let i = 0; i < capacity.length; i++) {
    capacity[i].setAttribute('disabled', 'true');
  }
}
const capacityRemoveDisabled = (start, end) => {
  for (let i = start; i < end + 1; i++) {
    capacity[i].removeAttribute('disabled');
  }
}

if (roomsAmount.value == 1) {
  capacityDisabled();
  capacity[2].selected = true;
  capacity[2].removeAttribute('disabled');
}


roomsAmount.addEventListener('change', () => {
  for (let i = 0; i < roomsAmount.length; i++) {
    if (roomsAmount.value === capacity[i].value) {
      capacity[i].selected = true;
    }
  }
  if (roomsAmount.value == 1) {
    capacityDisabled();
    capacityRemoveDisabled(2, 2);
  }
  if (roomsAmount.value == 2) {
    capacityDisabled();
    capacityRemoveDisabled(1, 2);
  }
  if (roomsAmount.value == 3) {
    capacityDisabled();
    capacityRemoveDisabled(0, 2);
  }
  if (roomsAmount.value == 100) {
    capacityDisabled();
    capacity[3].selected = true;
    capacityRemoveDisabled(3, 3);
  }
});

// validation #title
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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
