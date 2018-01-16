# DigitalMatrix

![npm](https://img.shields.io/npm/v/digitalmatrix.svg) ![license](https://img.shields.io/npm/l/digitalmatrix.svg) ![github-issues](https://img.shields.io/github/issues/dougmaitelli/DigitalMatrix.svg)

![nodei.co](https://nodei.co/npm/digitalmatrix.png?downloads=true&downloadRank=true&stars=true)

Creates a "Digital Matrix" effect inside HTML elements:
[Demo](https://dougmaitelli.github.io/DigitalMatrix/)

![demo](https://raw.githubusercontent.com/dougmaitelli/DigitalMatrix/master/demo.png)

## Install

`npm install --save digitalmatrix`

## Usage

To generate the matrix:
```
import DigitalMatrix from "digitalmatrix";

var matrix = new DigitalMatrix("elementId");
```
Where "elementId" is the id of the element that will contain the matrix.

To enable the pulsate effect:
```
matrix.startPulsate();
```

To regenerate the matrix:
```
matrix.regenerateNumbers();
```
