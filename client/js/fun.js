var fun = function(input) {
  console.log(input);
  var innerFun = function(input) {
    console.log(input);
  }
  innerFun('yo');
}

fun('hi');