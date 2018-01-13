import "../css/style.css";

import $ from "jquery";
import Rainbow from "rainbowvis.js";

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let shuffle = array => {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

let pulsate = () => {
  shuffle($(".number"))
    .slice(0, $(".number").length / 20)
    .toggleClass("glow");
};

let generateNumbers = () => {
  let docWidth = $(document).width();
  let docHeight = $(document).height();

  let nWidth = 25;
  let nHeight = 20;

  let xSteps = Math.floor(docWidth / nWidth);
  let ySteps = Math.floor(docHeight / nHeight);

  nWidth += (docWidth % nWidth) / xSteps;
  nHeight += (docHeight % nHeight) / ySteps;

  let rainbow = new Rainbow();
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
};

$(document).ready(() => {
  generateNumbers();

  $(window).resize(() => {
    $(".matrix").empty();
    generateNumbers();
  });

  setInterval(pulsate, 1000);
});
