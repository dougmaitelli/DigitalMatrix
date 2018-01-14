import "../css/style.css";

import $ from "jquery";
import Matrix from "../../index.js";

$(document).ready(() => {
  Matrix.generateNumbers(".matrix");

  $(window).resize(() => {
    $(".matrix").empty();
    Matrix.generateNumbers(".matrix");
  });

  Matrix.startPulsate();
});
