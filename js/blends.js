var canvas = document.getElementById('canvas');

var colors = {
    golden: 'rgb(244, 200, 66)',
    turquoise: 'rgb(15, 175, 193)'
};

var ctx = canvas.getContext('2d');

console.log(canvas);

ctx.fillStyle = 'rgb(255,0,255)';
ctx.fill();

const image = document.getElementById('source');

canvas.setAttribute('height', image.height);
canvas.setAttribute('width', image.width);

ctx.fillStyle = colors.turquoise;
ctx.globalCompositeOperation = 'overlay';
ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
//ctx.fillRect(0,0,image.width, image.height);

// Create a linear gradient
// The start gradient point is at x=20, y=0
// The end gradient point is at x=220, y=0
var gradient = ctx.createLinearGradient(0,0, image.width,0);

// Add three color stops
gradient.addColorStop(0, colors.turquoise);
gradient.addColorStop(.5, colors.golden);
gradient.addColorStop(1, colors.turquoise);

// Set the fill style and draw a rectangle
//ctx.fillStyle = gradient;
//ctx.fillRect(0,0,image.width, image.height);

ctx.filter = 'saturate(100)';
ctx.fillRect(0,0,image.width, image.height);