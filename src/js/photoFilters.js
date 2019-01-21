//todo apply multiple filters to one image

export const sepia = el => {
    //todo check browser support before hiding image
    const image = getAndHideImage(el);
    const canvas = createCanvas(image);
    drawImageInCanvas(image, canvas);
    colorSepia(canvas);
};

const blackAndWhite = el => {
    //todo check browser support before hiding image
    const image = getAndHideImage(el);
    const canvas = createCanvas(image);
    drawImageInCanvas(image, canvas);
    colorBlackAndWhite(canvas);
};

const vignette = el => {
    //todo check browser support before hiding image
    const image = getAndHideImage(el);
    const canvas = createCanvas(image);
    drawImageInCanvas(image, canvas);
    drawVignette(canvas);
};


const getAndHideImage = id => {
    const image = document.getElementById(id);
    image.setAttribute('style', 'display:none');
    return image;
};

const getNewCanvasId = el => {
    const elementId = el.getAttribute('id');
    const suffix = '_canvas_photoFilter';
    return `${elementId}${suffix}`;
};

const createCanvas = image => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', getNewCanvasId(image));
    canvas.setAttribute('height', image.height);
    canvas.setAttribute('width', image.width);
    image.parentNode.insertBefore(canvas, image);
    return canvas;
};

const drawImageInCanvas = (image, canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
};

const colorSepia = canvas => {
    const hue = 'rgb(163, 99, 16)';
    const saturation = 'rgb(140, 116, 84)';
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'hue';
    ctx.fillStyle = hue;
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'saturation';
    ctx.fillStyle = saturation;
    ctx.fillRect(0,0,canvas.width, canvas.height);
};

const colorBlackAndWhite = canvas => {
    const saturation = 'rgb(0,0,0)';
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'saturation';
    ctx.fillStyle = saturation;
    ctx.fillRect(0,0,canvas.width, canvas.height);
};

const drawVignette = canvas => {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const radiusBase = canvas.width < canvas.height ? canvas.width : canvas.height;
    const innerRadius = radiusBase/3;
    const outerRadius = innerRadius * 2;

    var gradient = ctx.createRadialGradient(centerX, centerY,innerRadius, centerX, centerY,outerRadius);

    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
    gradient.addColorStop(.75, 'rgba(0,0,0,0.32)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.65)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width, canvas.height);
};