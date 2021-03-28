import {showAlert} from './util.js'

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');
    });
};

const sendData = (onSuccess, onError, data) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      data,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError()
    }
  })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
