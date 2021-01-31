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

const calculateRandomArbitrary = function (min, max, decimalPlaces) {
  if (min >= 0 & max >= 0) {
    if (max > min) {
      return getRandomArbitrary(min, max, decimalPlaces) //Максимум включается, минимум включается
    } else {
      if (max < min) {
        return getRandomArbitrary(min, max, decimalPlaces) // Необязательно передавать меньшее число первым параметром
      } else {
        alert('Некорректный интервал');
      }
    }
  } else {
    alert('Некорректный интервал');
  }
}

console.log(getRandomArbitrary(1.5, 1.7, 1));
