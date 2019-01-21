'use strict';

//todo apply multiple filters to one image

var sepia = function sepia(el) {
    //todo check browser support before hiding image
    var image = getAndHideImage(el);
    var canvas = createCanvas(image);
    drawImageInCanvas(image, canvas);
    colorSepia(canvas);
};

var blackAndWhite = function blackAndWhite(el) {
    //todo check browser support before hiding image
    var image = getAndHideImage(el);
    var canvas = createCanvas(image);
    drawImageInCanvas(image, canvas);
    colorBlackAndWhite(canvas);
};

var vignette = function vignette(el) {
    //todo check browser support before hiding image
    var image = getAndHideImage(el);
    var canvas = createCanvas(image);
    drawImageInCanvas(image, canvas);
    drawVignette(canvas);
};

var getAndHideImage = function getAndHideImage(id) {
    var image = document.getElementById(id);
    image.setAttribute('style', 'display:none');
    return image;
};

var getNewCanvasId = function getNewCanvasId(el) {
    var elementId = el.getAttribute('id');
    var suffix = '_canvas_photoFilter';
    return '' + elementId + suffix;
};

var createCanvas = function createCanvas(image) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', getNewCanvasId(image));
    canvas.setAttribute('height', image.height);
    canvas.setAttribute('width', image.width);
    image.parentNode.insertBefore(canvas, image);
    return canvas;
};

var drawImageInCanvas = function drawImageInCanvas(image, canvas) {
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
};

var colorSepia = function colorSepia(canvas) {
    var hue = 'rgb(163, 99, 16)';
    var saturation = 'rgb(140, 116, 84)';
    var ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'hue';
    ctx.fillStyle = hue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'saturation';
    ctx.fillStyle = saturation;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var colorBlackAndWhite = function colorBlackAndWhite(canvas) {
    var saturation = 'rgb(0,0,0)';
    var ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'saturation';
    ctx.fillStyle = saturation;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var drawVignette = function drawVignette(canvas) {
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radiusBase = canvas.width < canvas.height ? canvas.width : canvas.height;
    var innerRadius = radiusBase / 3;
    var outerRadius = innerRadius * 2;

    var gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);

    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
    gradient.addColorStop(.75, 'rgba(0,0,0,0.32)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.65)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};