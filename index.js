// // // /**
// // //  * @param {string} s
// // //  * @return {number}
// // //  */
// // // var romanToInt = function (s) {
// // //     const romanSymbols = {
// // //         I: 1,
// // //         V: 5,
// // //         X: 10,
// // //         L: 50,
// // //         C: 100,
// // //         D: 500,
// // //         M: 1000
// // //     }

// // //     let number = 0;
// // //     for (let i = 0; i < s.length; i++) {
// // //         if (romanSymbols[s[i]] < romanSymbols[s[i + 1]]) {
// // //             number += romanSymbols[s[i + 1]] - romanSymbols[s[i]];
// // //             i++;
// // //         } else {
// // //             number += romanSymbols[s[i]]
// // //         }
// // //     }

// // //     console.log(number)
// // //     //     function convertToNumber(str = s, sum = 0) {
// // //     //         if(romanSymbols[s[0]])
// // //     //     }

// // //     //     converToNumber(s);
// // // };

// // // romanToInt('I')
// // // romanToInt('II')
// // // romanToInt('XX')
// // // romanToInt('XIX')
// // // romanToInt('MCMXCIV')



// // /**
// //  * Definition for singly-linked list.
// //  * function ListNode(val, next) {
// //  *     this.val = (val===undefined ? 0 : val)
// //  *     this.next = (next===undefined ? null : next)
// //  * }
// //  */
// // /**
// //  * @param {ListNode} head
// //  * @return {boolean}
// //  */
// //  var isPalindrome = function(head) {

// // };
/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
    let steps = 0;
    while (num !== 0) {
        if (num % 2 === 0) {
            num /= 2;
        } else {
            num -= 1;
        }
        steps++;
    }

    return steps;
};

console.log(numberOfSteps(8))



