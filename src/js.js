function countWords(str) {
  if (typeof str !== 'string') return 0;
  const trimmed = str.trim();
  if (trimmed === '') return 0;

  return trimmed.split(/\s+/).length;
}

// console.log(countWords("The quick brown fox jumps over the lazy dog")); // Вывод: 9
// console.log(countWords(" Hello   world  ")); // Вывод: 2



// function sortedSquares(nums) {
//   const result = [];
//   let left = 0 ;
//   let right = nums.length - 1;
//
//   for (let i = nums.length - 1; i >= 0; i--) {
//     if (Math.abs(nums[left]) > Math.abs(nums[right])) {
//       result[i] = nums[left] ** 2;
//       left++;
//     } else {
//       result[i] = nums[right] ** 2;
//       right--;
//     }
//   }
//   return result;
// }
//
// console.log(sortedSquares([-4, -1, 0, 3, 10])); // [0, 1, 9, 16, 100]


// function removeDuplicates(arr) {
//   if (arr.length === 0) return 0
//   let slow = 0;
//   let fast = 1;
//
//   while (fast <= arr.length) {
//     if(arr[fast] !== arr[slow]) {
//       slow++
//       arr[slow] = arr[fast];
//     }
//     fast++
//   }
//   return slow
// }
//
// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])); //→ 5
// Массив преобразуется в [0, 1, 2, 3, 4, ...]

// function isPalindrome (string) {
//   string = string.toLowerCase().replace(/[^a-z0-9]/g, '');
//   let left = 0, right = string.length - 1;
//   while (left < right) {
//     if (string[left] !== string[right]) return false;
//     left++;
//     right--;
//   }
//   return true;
// }
//
// console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
// console.log(isPalindrome('race a car'));  // false

//Последовательное выполнение промисов
//Задача:
//Напиши функцию chainPromises(arr), которая принимает массив функций,
// каждая из которых возвращает Promise, и выполняет их последовательно.

// async function chainPromises(promises) {
//   const resultArr = []
//   for (let promise of promises) {
//     const fn = async () => {
//       console.log('async')
//       const res = await promise();
//       console.log('after')
//       return res;
//     }
//     const res = await fn();
//     resultArr.push(res)
//   }
//   console.log('123', resultArr)
//   return resultArr
// }
//
// // Тестируем
// const f1 = () => Promise.resolve('Первый');
// const f2 = () => Promise.resolve('Второй');
// const f3 = () => Promise.resolve('Третий');
//
// chainPromises([f1, f2, f3]).then(console.log);//["Первый", "Второй", "Третий"]
//
// async function chainPromises1(promises) {
//   const resultArr = []
//   for (let promise of promises) {
//     resultArr.push(await promise())
//   }
//   console.log('123', resultArr)
//   return resultArr
// }

//Очередь промисов с задержкой
//Задача:
//Напиши функцию delayedLog(arr, delay), которая принимает массив строк
// и выводит их в консоль с задержкой через delay мс.

//
// const delayedLog = async (arr, delay) => {
//   for (let str of arr) {
//     const result = await new Promise((resolve) => {
//       setTimeout(() => resolve(str), delay)
//     })
//   }
// }
//
// delayedLog(["Привет", "Как дела?", "Пока"], 1000);