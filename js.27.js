//Дан массив строк (не меньше 3 элементов), в котором одна из строк отличается по составу входящих в неё букв от остальных строк в массиве.
//Порядок, количество, регистр букв и пробелы роли не играют.
//Реализовать метод, который принимает на вход такой массив строк, и возвращает отличающуюся строку.
console.assert( findUniq(['a', 'a Aa', 'ab a', 'AA a']) === 'ab a' );
console.assert( findUniq(['ab', 'a Aa', 'ab a', 'bAA a']) === 'a Aa' );
console.assert( findUniq([1,2,1,1]) === 2 );
console.assert( findUniq(['aBca', 'ac b', 'bac', 'fO o', 'bca', 'cabaccBA', ' Ccba']) === 'fO o' );

function findUniq(strings) {
  //
}

//Даны два отсортированных списка интервалов с временными промежутками, когда пользователи были онлайн.
//Нужно вычислить интервалы пересечения, когда оба пользователя находились в сети одновременно.
//Интервалы заданы в формате [начало, конец], где начало < конец.
//Часы находятся в диапазоне от 0 до 24.

console.log(intersection(
  [[8, 12], [17, 22]],
  [[5, 11], [14, 18], [20, 23]]
));
// Ожидаемый результат: [[8, 11], [17, 18], [20, 22]]

console.log(intersection(
  [[9, 15], [18, 21]],
  [[10, 14], [21, 22]]
));

function intersection(user1, user2) {
}

// У вас есть функция checker, которая возвращает
// другую функцию. Эта возвращаемая функция принимает объект с полями id и text
// а так же коллбэк. Объекты передаются в случайном порядке, но id всегда начинаются с 1 и идут последовательно без пропусков.
// Ваша задача - вызвать коллбэк в порядке возрастания id.

// Пример
function cb(obj) {
  console.log(obj.id)
}

const myFunc = checker()

myFunc({ id: 1, text: 'text1' }, cb) //Должно вывести 1
myFunc({ id: 4, text: 'text4' }, cb) //Не выведет ничего пока не придут 2 и 3
myFunc({ id: 3, text: 'text3' }, cb) //не выведет ничего пока не придёт 2
myFunc({ id: 2, text: 'text2' }, cb) //Должно вывести 2, 3, 4
myFunc({ id: 5, text: 'text5' }, cb) //Должно вывести 5


//Дан массив строк (не меньше 3 элементов), в котором одна из строк отличается по составу входящих в неё букв от остальных строк в массиве.
//Порядок, количество, регистр букв и пробелы роли не играют.
//Реализовать метод, который принимает на вход такой массив строк, и возвращает отличающуюся строку.
console.log(findUniq(['a', 'a Aa', 'ab a', 'AA a']) === 'ab a');
console.log(findUniq(['ab', 'a Aa', 'ab a', 'bAA a']) === 'a Aa');
console.log(findUniq(['aBca', 'ac b', 'bac', 'fO o', 'bca', 'cabaccBA', ' Ccba']) === 'fO o');

// ========================================

// function findUniq(strings) {
//   const countUniqLetters = {};
//
//   strings.forEach((word) => {
//     let wordWithouSpacesLowCase = word
//       .replace(/\s+/g, "")
//       .toLowerCase()
//       .split("")
//
//     let uniqKey = [...new Set(wordWithouSpacesLowCase)].sort().join("")
//
//     countUniqLetters[uniqKey] = countUniqLetters[uniqKey] + 1 || 1;
//   })
//
//   const uniqStrKey = Object.entries(countUniqLetters).find(([_key, value]) => value === 1);//[ab, 1]
//
//   for (let word of strings) {
//     let wordWithouSpacesLowCase = word
//       .replace(/\s+/g, "")
//       .toLowerCase()
//       .split("")
//
//     let uniqKey = [...new Set(wordWithouSpacesLowCase)].sort().join("")
//
//     if (uniqKey === uniqStrKey[0]) return word;
//   }
// }
//
// function findUniq(strings) {
//   const normalize = str => [...new Set(str.toLowerCase().replace(/\s/g, ''))].sort().join('');
//
//   const counts = strings.map(normalize);
//   console.log(counts)
//   const unique = counts.find(str => {
//     return counts.indexOf(str) === counts.lastIndexOf(str)
//   });
//
//   return strings[counts.indexOf(unique)];
// }

// ==================================================

//Даны два отсортированных списка интервалов с временными промежутками, когда пользователи были онлайн.
//Нужно вычислить интервалы пересечения, когда оба пользователя находились в сети одновременно.
//Интервалы заданы в формате [начало, конец], где начало < конец.
//Часы находятся в диапазоне от 0 до 24.

console.log(intersection(
  [[8, 12], [17, 22]],
  [[5, 11], [14, 18], [20, 23]]
));
// Ожидаемый результат: [[8, 11], [17, 18], [20, 22]]

// /* console.log(intersection(
//     [[9, 15], [18, 21]],
//     [[10, 14], [21, 22]]
// )); */

/* function intersection(user1, user2) {
    let intevalUser1 = 0;
    let intervalUser2 = 0;
    const result = [];

    while (intevalUser1 < user1.length && intervalUser2 < user2.length) {
        let start = Math.max(user1[intevalUser1][0], user2[intervalUser2][0])
        //user1[intevalUser1][0] = 9, user2[intevalUser2][0] = 10
        let end = Math.min(user1[intevalUser1][1], user2[intervalUser2][1])
        //user1[intevalUser1][1] = 15, user2[intevalUser2][1] = 14

        if (start < end) {
            result.push([start, end]);
        }

        if (user1[intevalUser1][1] < user2[intervalUser2][1]) {
            intevalUser1++;
        } else {
            intervalUser2++;
        }
    }

    return result;
}
 */

function intersection(user1, user2) {
  function getCollision(first, sec) {
    let firtArr = []
    let secondArr = []
    let result = []
    for (let i = first[0]; i <= first[1]; i++) {
      firtArr.push(i)
    }
    for (let i = sec[0]; i <= sec[1]; i++) {
      secondArr.push(i)
    }

    for (let i = 0; i < firtArr.length; i++) {
      for (let k = 0; k < secondArr.length; k++) {
        if (firtArr[i] === secondArr[k]) {
          result.push(secondArr[k])
          continue
        }
      }
    }
    if (result.length <= 1) return []
    return [result[0], result[result.length - 1]]
  }

  let summary = []
  for (let i = 0; i < user1.length; i++) {
    for (let k = 0; k < user2.length; k++) {

      let res = getCollision(user1[i], user2[k])
      if (res.length) {
        summary.push(res)
      }
    }
  }
}

function intersection(user1, user2) {
  const result = [];

  for (let i = 0; i < user1.length; i++) {
    const user1Enter = user1[i][0];
    const user1Exit = user1[i][1];
    for (let j = 0; j < user2.length; j++) {
      const user2Enter = user2[j][0];
      const user2Exit = user2[j][1];

      if (user2Exit > user1Enter && user2Enter < user1Exit) {
        result.push([
          Math.max(user1Enter, user2Enter),
          Math.min(user1Exit, user2Exit),
        ]);
      }
    }
  }

  return result;
}

// 5
//мы должны написать функцию которая сможет возвести в квадрат каждый элемент и вернуть результат в отсортированном порядке
//за один проход и не добавляя память.

function squareAndSort(arr) {

}

// console.log(squareAndSort([-9, -2, 0, 2, 3]) // [0, 4, 4, 9, 81])
// console.log(squareAndSort([-9, -2, 0, 2, 3, 12]) // [0, 4, 4, 9, 81, 144])
