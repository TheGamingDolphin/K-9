function TestsFunction() {
  var T = document.getElementById("backgroundVideo"),
    displayValue = "";
  if (T.style.display == "") displayValue = "none";

  T.style.display = displayValue;
}
