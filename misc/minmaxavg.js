function MinMaxAvg(arr) {
    var sfn = "MinMaxAvg(" + arr + ")"
    var min = arr[0];
    var max = arr[0];
    var sum = 0;
    for (var idx = 0; idx < arr.length; idx++) {
      if (min > arr[idx]) {
        min = arr[idx];      
      }
      if (max < arr[idx]) {
        max = arr[idx];      
      }
      sum += arr[idx];
    }
    var avg = sum / arr.length;
    console.log(sfn)
    console.log(" ... Min=" + min.toString() + ", Max=" + max.toString() + ", Avg=" + avg.toString());
  }
  var a1 = [1,2,3,4,5,6,7,8,9,-18]
  console.log(MinMaxAvg(a1));