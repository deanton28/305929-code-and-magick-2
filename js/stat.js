'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var shiftShadow = 10;
var shift = 50;
var histogramHeigth = 150;
var barWidth = 40;
var initialY = 100;
var indentText = 10;
var shiftBar = barWidth + shift;

function renderCloudFigure(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    maxElement = Math.max(maxElement, arr[i]);
  }
  return maxElement;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) - min;
}

function getOtherPlayerColor(r, g, b) {
  var a = getRandomNumber(0.3, 1);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

window.renderStatistics = function (ctx, names, times) {

  function drawCloud(x, y) {
    renderCloudFigure(ctx, x + shiftShadow, y + shiftShadow, 'rgba(0, 0, 0, 0.7)');
    renderCloudFigure(ctx, x, y, '#fff');
  }

  function drawText(time, height, name) {
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'bottom';
    ctx.fillText(Math.round(time), CLOUD_X + shift + shiftBar * i, initialY + histogramHeigth - height - indentText);

    ctx.textBaseline = 'top';
    ctx.fillText(name, CLOUD_X + shift + shiftBar * i, initialY + histogramHeigth + indentText);
  }

  function drawColumn(time, height, name) {
    drawText(time, height, name);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = getOtherPlayerColor(0, 0, 225);
    }

    ctx.fillRect(CLOUD_X + shift + shiftBar * i, initialY + histogramHeigth - height, barWidth, height);
  }

  var step = histogramHeigth / getMaxElement(times);

  drawCloud(CLOUD_X, CLOUD_Y);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'bottom';
  ctx.fillText('Ура вы победили!', 120, 45);
  ctx.fillText('Список результатов:', 120, 60);

  for (var i = 0; i < names.length; i++) {
    drawColumn(times[i], times[i] * step, names[i]);
  }
};
