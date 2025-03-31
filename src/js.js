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