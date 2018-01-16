import "../css/lib.css";

import Rainbow from "rainbowvis.js";

export default class DigitalMatrix {
  constructor(elementId) {
    this.matrixElement = document.getElementById(elementId);
    this.matrixElement.className = "matrix";

    this.regenerateNumbers();
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _shuffle(array) {
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
  }

  _pulsate() {
    let numbers = Array.prototype.slice.call(
      this.matrixElement.getElementsByClassName("number"),
      0
    );

    let selectedNumbers = this._shuffle(numbers).slice(0, numbers.length / 20);

    selectedNumbers.forEach(nElement => {
      nElement.className =
        nElement.className == "number" ? "number glow" : "number";
    });
  }

  regenerateNumbers() {
    let docWidth = this.matrixElement.offsetWidth;
    let docHeight = this.matrixElement.offsetHeight;

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
          let nElement = document.createElement("div");
          nElement.appendChild(
            document.createTextNode(
              ("00" + this._getRandomInt(0, 255).toString(16))
                .toUpperCase()
                .slice(-2)
            )
          );

          nElement.className = "number";

          nElement.style.left = x * nWidth + "px";
          nElement.style.top = y * nHeight + "px";
          nElement.style.color = "#" + rainbow.colourAt(x);
          nElement.style.opacity = opacity;

          this.matrixElement.appendChild(nElement);
        }

        y++;
      } while (y < ySteps);

      x++;
    } while (x < xSteps);
  }

  startPulsate() {
    setInterval(this._pulsate.bind(this), 1000);
  }
}
