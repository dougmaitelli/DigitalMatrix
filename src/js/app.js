import "../css/style.css";

import $ from "jquery";
import DigitalMatrix from "./digitalmatrix.js";

$(document).ready(() => {
  var matrix = new DigitalMatrix();

  matrix.generateNumbers(".matrix");

  $(window).resize(() => {
    $(".matrix").empty();
    matrix.generateNumbers(".matrix");
  });

  matrix.startPulsate();
});
