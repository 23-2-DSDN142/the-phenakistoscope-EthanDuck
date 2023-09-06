const SLICE_COUNT = 18;

let animate = true;

let radarSlice = 0;

let rOffset = 0;

function setup_pScope(pScope) {
  pScope.output_mode(animate ? ANIMATED_DISK : STATIC_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  strokeWeight(0);

  var layer = new PLayer(radarBG);
  var layer = new PLayer(techys);
  var layer = new PLayer(planeLayer);
  var layer = new PLayer(radarLine);
  // var layer = new PLayer(planeIcon);
}

function planeLayer(x, y, animation, pScope) {
  planeSetup(0, 450, 1, true, animation)
  planeSetup(0, 300, 13, false, animation)
  planeSetup(0, 600, 15, true, animation)
  planeSetup(0, 800, 8, true, animation)
  planeSetup(0, 500, 6, false, animation)

  if (animation.frame == 0) {
    rOffset += 1;
    rOffset = rOffset % SLICE_COUNT;
    print(rOffset)  
  }
}

function planeSetup(x, y, slice, plane, animation) {
  let r = (360 / SLICE_COUNT) * (rOffset + slice);
  rotate(r);
  planeDraw(x, y, slice, plane, animation)
  rotate(-r);
}

function planeDraw(x, y, slice, plane, animation) {
  if (animation.frame == 0) {
    fill(255, 255, 255, (255 - ((rOffset + slice - 1) % SLICE_COUNT * (255 / (SLICE_COUNT - 2)))));

    if (plane){
      planeIcon(x, y, animation)
    } else {
      circle(x, y, 60);
      circle(x, y, 40);
      circle(x, y, 20);
    }
  }
}

function planeIcon(x, y, animation) {
  if (animation.frame == 0) {

    beginShape();

    vertex((x - 10), (y));
    vertex((x - 60), (y + 10));
    vertex((x - 60), (y));
    vertex((x - 10), (y - 25));

    vertex((x - 10), (y - 50));
    vertex((x + 10), (y - 50));

    vertex((x + 10), (y));
    vertex((x + 60), (y + 10));
    vertex((x + 60), (y));
    vertex((x + 10), (y - 25));

    vertex((x + 10), (y + 50));
    vertex((x - 10), (y + 50));
    endShape();
  }
}

function radarLine(x, y, animation, pScope) {
  angleMode(DEGREES);
  strokeWeight(4);

  let l = 360 //number of lines

  if (animation.frame == 0) {
    radarSlice += 1;
    radarSlice = (radarSlice) % SLICE_COUNT;

    for (let i = 0; i < l; i++) {
      stroke(0, 255, 100, (200 - i * (200 / l)));
      rotate(140 / l);
      line(0, 0, 0, 1100);
    }
  }
}

function radarBG(x, y, animation, pScope) {
  //Cancels the Phenakistoscope Rotation
  rotate((360 / SLICE_COUNT) * (rOffset + 2));

  //BG Gradient Circles

  fill(0);
  circle(0, 0, 2000);

  let cNum = 50;

  for (let i = 0; i < cNum; i++) {
    fill(0, 150, 10, (255 / cNum));
    circle(0, 0, (2000 - (100 * i)));
  }

  //Thin lined Circles

  strokeWeight(2);
  stroke(255, 255, 255, 200);

  cNum = 6;

  for (let i = 0; i < cNum; i++) {
    circle(0, 0, (2000 - ((2000 / cNum) * i)));
  }

  //Lines

  let cDistance = (1000 - ((1000 / cNum)));

  stroke(255, 255, 255, 100);
  line(0, cDistance, 0, -cDistance)
  line(-cDistance, 0, cDistance, 0)

  line(1000, 1000, -1000, -1000)
  line(1000, -1000, -1000, 1000)
}

function techys(x, y, animation, pScope) {
  //Cancels the Phenakistoscope Rotation
  rotate((360 / SLICE_COUNT) * (rOffset + 1) + 0.75);

  let degree = (360 / SLICE_COUNT) * (animation.frame * SLICE_COUNT);

  fill(255);
  textSize(50);
  text(degree, 0, 950);
}