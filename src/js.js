
// fn – функцию, возвращающую промис,
// retries – количество попыток повторного вызова, если промис отклонён,
// delay – задержку между попытками в миллисекундах.
// Функция должна вызывать fn(). Если промис разрешается – возвращать его результат,
// если отклоняется – ждать заданное время и повторять вызов, пока не исчерпаются попытки.
//Если после всех попыток промис так и не разрешился, функция должна отклониться с последней ошибкой.

function retryPromise(fn, retries, delay) {
  let curAttempt = retries
  return new Promise((res, rej) => {
    function attempt(curAttempt) {
      fn()
        .then((data) => res(data))
        .catch(error => {
          console.log(curAttempt)
          if (curAttempt <= 1) {
            rej(error)
          } else {
            setTimeout(() => attempt(curAttempt - 1), delay)
          }
        })
    }
    attempt(curAttempt)
  })

  // if (retries === 0) {
  //     throw
  // } else {
  //     fn()
  //         .then(data => data)
  //         .catch((err) => setTimeout(fn(), delay))
  //     retries--
  // }



  /* return new Promise((res, rej) => {

  }) */
}

// Пример использования:
let attemptCount = 0;
function unstableTask() {
  return new Promise((resolve, reject) => {
    attemptCount++;
    console.log(`Попытка ${attemptCount}`);
    if (attemptCount < 3) {
      reject(`Ошибка на попытке ${attemptCount}`);
    } else {
      resolve(`Успех на попытке ${attemptCount}`);
    }
  });
}

retryPromise(unstableTask, 2, 1000)
  .then(result => console.log(result))
  .catch(err => console.error(err));