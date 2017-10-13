
function toFixed(value, precision) {
    // if precision is 0 just round number and return 
  if(precision === 0) {
    return Math.round(value).toFixed(precision);
  }
    
  var valueStr = value.toString();
  // Get current index of decimal
  var currentDecimalIndex = valueStr.indexOf('.');
  // if there's no decimal in value, just round number & return
    if(currentDecimalIndex === -1) {
      return Math.round(value).toFixed(precision);
    }
    
  return roundNumber(value,precision);  
}

function moveDecimal(valStr, precision) {
  var valueStr = valStr.toString();
    // Get current index of decimal
  var currentDecimalIndex = valueStr.indexOf('.');
    // slice out decimal
  var beforeDecimal = valueStr.slice(0,currentDecimalIndex);
  var afterDecimal = valueStr.slice(currentDecimalIndex+1);
  var valueWithoutDecimal = beforeDecimal.concat(afterDecimal);
  // Where to move decimal point
  var newDecimalIndex = currentDecimalIndex + precision;
  // if new index value > length of value, will throw off correct decimal position
    while(valueWithoutDecimal.length < newDecimalIndex) {
    // add 0 to the string
      valueWithoutDecimal += 0;
    }
  // new value string w/decimal moved over 
  var newBeforeDecimal = valueWithoutDecimal.slice(0,newDecimalIndex);
  var newAfterDecimal = '.' + valueWithoutDecimal.slice(newDecimalIndex);
  var newValue = newBeforeDecimal.concat(newAfterDecimal);

  return newValue;
}

// Round number
function roundNumber(valueStr, precision) {
  // Get the updated value string
  var currentString = moveDecimal(valueStr,precision);
   // // round number
  var asNumber = Number(currentString);
  var rounded = Math.round(asNumber);
 // put number back to a string and move decimal back to where it started
  // if first number is 0 and before decimal, making it a number removes it so need to add it back to string
  var currentNumber;
    if(currentString.charAt(0) === '0') {
      currentNumber = '0' + rounded.toString();
    } else {
      currentNumber = rounded.toString();
    }
  // Move the decimal point back per precision
  var decimalPositionIndex = currentNumber.length - precision;
  // Get numbers before where to place decimal
  var updatedBeforeDecimal = currentNumber.slice(0,decimalPositionIndex);
  var decimalAndRemainder = '.' + currentNumber.slice(decimalPositionIndex);
  var finalResult = updatedBeforeDecimal.concat(decimalAndRemainder);

  // if final result begins with decimal, add 0 first since was removed when converted to number
  if(finalResult.charAt(0) === '.') {
    return '0' + finalResult;
  }
    
  return finalResult;

}

tests({
  'It should round 0.615 correctly to 0.62. Native toFixed does not correctly round this': function() {
    eq(toFixed(0.615, 2), '0.62');
  },
  'It should round 1.005 correctly to 1.01. Native toFixed does not correctly round this': function() {
    eq(toFixed(1.005, 2), '1.01');
  },
  'It should round 10.235 correctly to 10.24. Native toFixed does not correctly round this': function() {
    eq(toFixed(10.235, 2), '10.24');
  },
  'It should add 0 at end if necessary per the precision ': function() {
    eq(toFixed(100.5, 3), '100.500');
    eq(toFixed(1.01, 3), '1.010');
    eq(toFixed(100.5, 2), '100.50');
  },
  'It should round .62 to 0.620 when precision is 3': function() {
    eq(toFixed(.62, 3), '0.620');
  },
  // Tiffany's Test
  'It should pad 1.5 correctly to 1.5000': function() {
    eq(toFixed(1.5, 4), '1.5000');
  },
  // Kenney's Tests
  '"100" with 5 precision should return "100.00000"': function() {
    eq(toFixed(100, 5), '100.00000');
  },
  '".005" with 2 precision should return "0.01"': function() {
    eq(toFixed(.005, 2), '0.01');
  },
  '"1.005" with 2 precision return "1.01"': function() {
    eq(toFixed(1.005, 2), '1.01');
  },
  '"12314.12342145" with 7 precision return "12314.1234215"': function() {
    eq(toFixed(12314.12342145, 7), '12314.1234215');
  },
  'Precision greater than number of decimals': function() {
    eq(toFixed(12314.12342145, 15), '12314.123421450000000');
  },
  // James's Tests
  'It should return 0.62': function() {
    eq(toFixed(.615, 2), '0.62');
  },
  'It should return 10.24': function() {
    eq(toFixed(10.235, 2), '10.24');
  },
  'It should return 1.01': function() {
    eq(toFixed(1.005, 2), '1.01');
  },
  'It should return 0.236': function() {
    eq(toFixed(.2356, 3), '0.236');
  },
  'It should return 10.7': function() {
    eq(toFixed(10.678, 1), '10.7');
  },
  'It should return 10': function() {
    eq(toFixed(10.235, 0), '10');
  },
  'It should return 11': function() {
    eq(toFixed(10.635, 0), '11');
  },
  'It should return 1.00201': function() {
    eq(toFixed(1.002005, 5), '1.00201');
  }
});
