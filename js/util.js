const ALERT_SHOW_TIME = 5000;

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const calculateRandomInt = function (min, max) {
  if (min >= 0 & max >= 0) {
    if (max > min) {
      return getRandomInt(min,max) //Максимум включается, минимум включается
    } else {
      if (max < min) {
        return getRandomInt(max,min) // Необязательно передавать меньшее число первым параметром
      } else {
        alert('Некорректный интервал');
      }
    }
  } else {
    alert('Некорректный интервал');
  }
}

const getRandomArbitrary = function (min, max, decimalPlaces) {
  const optionalNumber = 10 ** decimalPlaces;
  min = Math.ceil(min * optionalNumber);
  max = Math.floor(max * optionalNumber);
  return (Math.floor(Math.random() * (max - min + 1)) + min) / optionalNumber;
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {calculateRandomInt, getRandomArbitrary, getRandomInt, isEscEvent, showAlert};
