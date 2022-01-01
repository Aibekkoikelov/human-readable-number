var ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];
var tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
];
var thousand = ["", " thousand ", " million ", " billion ", " trillion "];


function toReadable(num) {
    var numString = num.toString();
    const arr = [];
    const iterationCount = Math.ceil(numString.length / 3);
    const numStrlength = numString.length;

    if (num < 0) throw new Error("Negative numbers are not supported.");
    if (num === 0) return "zero";
    if (numString.length == 2 || numString.length == 1) {
        return getWords(numString);
    }
   if (numString.length == 3) {
        if (numString[1] == 0 && numString[2] == 0) {
            return ones[+numString[0]] + " hundred";
        } else {
            return getWordsAfterHundred(numString);
        }
    }

    let count = 0;
    for (let i = 0; i < iterationCount; i++) {
        if (numStrlength % 3 == 1) {
            if (count == 0) {
                arr.push(numString.substr(count, 1));
                ++count;
            } else {
                arr.push(numString.substr(count, 3));
                count += 3;
            }
        } else if (numStrlength % 3 == 2) {
            if (count == 0) {
                arr.push(numString.substr(count, 2));
                ++count;
            } else {
                arr.push(numString.substr(count, 3));
                count += 3;
            }
        } else if (numStrlength % 3 == 0) {
            arr.push(numString.substr(count, 3));
        }
    }

   
   let arrCount = arr.length-1
   let res = ""
   for (let i = 0; i < arr.length; i++) {
      res += (getWords(arr[i]) + thousand[arrCount])
      arrCount--

    } 
    


   function getWords(numString) {
      const num = +numString;
      if (num < 100) {
         return getWordsBeforeHundred(numString)
      }
      else if (num >= 100 && num <= 999) {
         return getWordsAfterHundred(numString)
      }
   }       
   

      function getWordsBeforeHundred(numString) {
         const num = +numString;
         if (num < 20) {
            return ones[num]
         }
         else if (num >= 20 && num < 100) {
            if (+numString[1] == 0) {
               return tens[+numString[0]]
            } else {
               return tens[+numString[0]] + " " + ones[+numString[1]];
            }
            
         }
      }
   
   function getWordsAfterHundred(numString) {
          num = +numString;
          if (numString[0] == 0) {
              return getWordsBeforeHundred(numString.substring(1));
          } else if (numString[0] == 0 && numString[1]==0) {
              return ones[+numString[2]];
          } else {
              return (
                  ones[+numString[0]] +
                  " hundred " +
                  getWordsBeforeHundred(numString.substring(1))
              );
          }
   }


   return res
   
   
}


toReadable(1234567789);

module.exports = toReadable;


