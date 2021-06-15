import P5 from "p5";
import Rainbow from "rainbowvis.js";

import MatrixNumber from "./MatrixNumber";

export default class DigitalMatrix {
  private matrixElement: HTMLElement;
  private p5: P5;
  private numbers: MatrixNumber[];

  constructor(elementId: string) {
    this.matrixElement = document.getElementById(elementId);

    const sketch = (p5: P5) => {
      p5.setup = () => {
        const canvas = p5.createCanvas(
          this.matrixElement.clientWidth,
          this.matrixElement.clientHeight
        );
        canvas.parent(this.matrixElement);

        p5.background(0);

        p5.textFont('Consolas');
        p5.textSize(14);
        p5.textStyle(p5.BOLD);

        this.regenerateNumbers();
      };
    
      p5.draw = () => {
        p5.background(0);
        for (let number of this.numbers) {
          number.draw();
        }
      };
    };

    this.p5 = new P5(sketch);
  }

  public resize(): void {
    this.p5.resizeCanvas(
      this.matrixElement.clientWidth,
      this.matrixElement.clientHeight
    );
    this.regenerateNumbers();
  }

  public regenerateNumbers(): void {
    this.numbers = [];

    let docWidth = this.p5.width;
    let docHeight = this.p5.height;

    let nWidth = 25;
    let nHeight = 20;

    let xSteps = Math.floor(docWidth / nWidth);
    let ySteps = Math.floor(docHeight / nHeight);

    nWidth += (docWidth % nWidth) / xSteps;
    nHeight += (docHeight % nHeight) / ySteps;

    let rainbow = new Rainbow();
    rainbow.setNumberRange(0, xSteps);
    rainbow.setSpectrum('#42f445', '#8341f4');

    for (let x = 0; x < xSteps; x++) {
      for (let y = 0; y < ySteps; y++) {
        let opacity = Math.random();

        if (Math.random() < 0.7 && opacity > 0.1) {
          const value = this.getRandomInt(0, 255).toString(16).padStart(2, '0').toUpperCase();

          const number = new MatrixNumber(this.p5, x * nWidth, y * nHeight, value, '#' + rainbow.colourAt(x), opacity);

          this.numbers.push(number);
        }
      }
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffle<T extends any>(array: T[]): T[] {
    let m = array.length;
    let i: number;
    let t: T;

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

  private pulsate() {
    let selectedNumbers = this.shuffle(this.numbers).slice(0, this.numbers.length / 20);

    for (let number of selectedNumbers) {
      number.pulsate();
    }
  }

  public startPulsate() {
    setInterval(this.pulsate.bind(this), 1000);
  }
}