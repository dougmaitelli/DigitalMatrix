import "../css/style.css";

import $ from "jquery";
import DigitalMatrix from "./digitalmatrix.js";

$(document).ready(() => {
  var matrix = new DigitalMatrix("matrix");

  $(window).resize(() => {
    $("#matrix").empty();
    matrix.regenerateNumbers();
  });

  matrix.startPulsate();
});
