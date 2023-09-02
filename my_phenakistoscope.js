const SLICE_COUNT = 18;

let animate = true;

let bombSlice = 0;
let lineSlice = 0;


function setup_pScope(pScope) {
  pScope.output_mode(animate ? ANIMATED_DISK : STATIC_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  strokeWeight(0);

  var layer1 = new PLayer(radarBG);
  var layer2 = new PLayer(radarLine);
  var layer3 = new PLayer(techys);
  var layer4 = new PLayer(bomb);
}

function bomb(x, y, animation, pScope) {
  translate(0, 0);
  rotate((360 / SLICE_COUNT) * bombSlice);

  if (animation.frame == 0) {
    fill(255);
    circle(0, 500, 25);

    bombSlice += 1;
    bombSlice = (bombSlice) % SLICE_COUNT;
  }
}

function radarLine(x, y, animation, pScope) {
  angleMode(DEGREES);
  strokeWeight(4);

  let l = 360 //number of lines

  if (animation.frame == 0) {
    for (let i = 0; i < l; i++) {
      stroke(0, 255, 100, (200 - i * (200 / l)));
      rotate(140 / l);
      line(0, 0, 0, 1100);
    }
  }
}

function radarBG(x, y, animation, pScope) {
  let cNum = 50;

  fill(0);
  circle(0, 0, 2000);

  for (let i = 0; i < cNum; i++) {
    fill(0, 150, 10, (255 / cNum));
    circle(0, 0, (2000 - (100 * i)));
  }

  strokeWeight(2);
  stroke(255, 255, 255, 100);
  cNum = 6;

  for (let i = 0; i < cNum; i++) {
    circle(0, 0, (2000 - ((2000 / cNum) * i)));
  }
}

function techys(x, y, animation, pScope) {
  fill(255);
  textSize(50);
  let degree = (360 / SLICE_COUNT) * (animation.frame * SLICE_COUNT)

  text(degree, 0, 950);
}