import "../css/style.css";

import $ from "jquery";
import Rainbow from "rainbowvis.js";

$.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);
    return $(this[randomIndex]);
};

var docWidth = $(document).width();
var docHeight = $(document).height();

var nWidth = 25;
var nHeight = 20;

var xSteps = Math.floor(docWidth / nWidth);
var ySteps = Math.floor(docHeight / nHeight);

nWidth += (docWidth % nWidth) / xSteps;
nHeight += (docHeight % nHeight) / ySteps;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var rainbow = new Rainbow();
rainbow.setNumberRange(0, xSteps);
rainbow.setSpectrum("#42f445", "#8341f4");

var x = 0;
do {
  var y = 0;
  do {
    var opacity = Math.random();

    if (Math.random() < 0.7 && opacity > 0.1) {
      var n = $("<div/>").text(("00" + getRandomInt(0, 255).toString(16)).toUpperCase().slice(-2)).addClass("number").css({
        left: (x * nWidth) + "px",
        top: (y * nHeight) + "px",
        color: "#" + rainbow.colourAt(x),
        opacity: opacity
      });
      n.appendTo(".matrix");
    }

    y++;
  } while(y < ySteps);

  x++;
} while(x < xSteps);

function pulsate() {
  $(".number").random().animate({ opacity: "+=0.3" }, 500, 'linear')
    .animate({ opacity: "-=0.3" }, 500, 'linear');
}
$(document).ready(function() {
  setInterval(pulsate, 5);
});
