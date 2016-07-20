var NUM_IMAGES = 2180;
var BASE_PATH = "photos"

var IMAGE_WIDTH = 100;
var IMAGE_HEIGHT = 100;

var images = [];
var imagePixels;

function preload() {
  // Preload the Images
  for (var counter = 1; counter <= NUM_IMAGES; counter++) {
    var imgPath = BASE_PATH + "/" + counter + ".jpg";
    var img = loadImage(imgPath);
    images.push(img);
  }
}

function setup() {
  // Create the Canvas
  var cnv = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  cnv.parent('sketch');

  // Initialize Empty Pixel Array For Total Pixels
  var pixelsTotalArray = [];
  for (var i = 0; i<IMAGE_HEIGHT*IMAGE_WIDTH; i++) {
    pixelsTotalArray[i] = {r: 0, g: 0, b: 0}
  }

  // Load Images Into Pixel Array
  var imagesAdded = 0;

  for (var imageNum = 0; imageNum < images.length; imageNum++) {
    var img = images[imageNum];
    img.loadPixels();

    if (img.width === 100 && img.height === 100) {
      imagesAdded++;

      imagePixels = img.pixels;

      for (var i=0; i<pixelsTotalArray.length; i++) {
        var destPixel = pixelsTotalArray[i];

        for (var j=0; j<4; j++) {
          var sourcePixel = img.pixels[i*4 + j];

          if(j === 0) {
            destPixel.r += sourcePixel;
          }
          else if(j === 1) {
            destPixel.g += sourcePixel;
          }
          else if (j === 2) {
            destPixel.b += sourcePixel;
          }
        }
      }
    }
  }

  // Average The Pixel Array
  for (var i = 0; i<pixelsTotalArray.length; i++) {
    var pixel = pixelsTotalArray[i];
    pixel.r /= imagesAdded;
    pixel.g /= imagesAdded;
    pixel.b /= imagesAdded;
  }
  var averagedPixelsArray = pixelsTotalArray;

  // Draw the Image
  img = createImage(IMAGE_WIDTH, IMAGE_HEIGHT);
  img.loadPixels();

  var pixelCounter = 0;
  for(var i=0; i<IMAGE_WIDTH; i++) {
    for(var j=0; j<IMAGE_HEIGHT; j++) {
      var pixel = averagedPixelsArray[pixelCounter];
      img.set(j, i, color(pixel.r, pixel.g, pixel.b));
      pixelCounter++;
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}
