import "../css/style.css";

import $ from "jquery";
import Rainbow from "rainbowvis.js";

$.fn.random = function() {
  var randomIndex = Math.floor(Math.random() * this.length);
  return $(this[randomIndex]);
};

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const docWidth = $(document).width();
const docHeight = $(document).height();

let nWidth = 25;
let nHeight = 20;

let xSteps = Math.floor(docWidth / nWidth);
let ySteps = Math.floor(docHeight / nHeight);

nWidth += (docWidth % nWidth) / xSteps;
nHeight += (docHeight % nHeight) / ySteps;

var rainbow = new Rainbow();
rainbow.setNumberRange(0, xSteps);
rainbow.setSpectrum("#42f445", "#8341f4");

let x = 0;
do {
  let y = 0;
  do {
    let opacity = Math.random();

    if (Math.random() < 0.7 && opacity > 0.1) {
      let n = $("<div/>")
        .text(
          ("00" + getRandomInt(0, 255).toString(16)).toUpperCase().slice(-2)
        )
        .addClass("number")
        .css({
          left: x * nWidth + "px",
          top: y * nHeight + "px",
          color: "#" + rainbow.colourAt(x),
          opacity: opacity
        });
      n.appendTo(".matrix");
    }

    y++;
  } while (y < ySteps);

  x++;
} while (x < xSteps);

let pulsate = () => {
  for (var i = 0; i < 20; i++) {
    $(".number")
      .random()
      .animate({ opacity: "+=0.3" }, 1000, "linear")
      .animate({ opacity: "-=0.3" }, 1000, "linear");
  }
};

$(document).ready(function() {
  setInterval(pulsate, 50);
});
