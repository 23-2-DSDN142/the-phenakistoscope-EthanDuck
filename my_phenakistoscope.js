const SLICE_COUNT = 18;

let output = true;

let radarSlice = 0;

let rOffset = 0;

function setup_pScope(pScope) {
  pScope.output_mode(output ? ANIMATED_DISK : OUTPUT_GIF(1000));
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  strokeWeight(0);

  var layer = new PLayer(radarBG);
  var layer = new PLayer(texts);
  var layer = new PLayer(planeLayer);
  var layer = new PLayer(radarLine);
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

    if (plane) {
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

  //Circles Lines

  strokeWeight(2);
  stroke(255, 100);

  cNum = 6;

  for (let i = 0; i < cNum; i++) {
    circle(0, 0, (2000 - ((2000 / cNum) * i)));
  }

  //Liner Lines

  let cDistance = (1000 - ((1000 / cNum)));

  for (let i = 0; i < 9; i++) {
    line(0, cDistance, 0, -cDistance);
    line(-cDistance, 0, cDistance, 0);
    rotate(20)
  }

}

function texts(x, y, animation, pScope) {
  //Cancels the Phenakistoscope Rotation
  rotate((360 / SLICE_COUNT) * (rOffset + 10) + 170);

  if (animation.frame == 0) {
    for (let i = 0; i < 36; i++) {
      let degree = (360 / 36) * i;

      let cDistance = (1000 - ((1000 / 6)) + 30);
      
      rotate((360 / 36))
      
      strokeWeight(7);
      stroke(255, 200);
      line(0, cDistance, 0 , 880)
      
      strokeWeight(0);
      fill(200, 255, 200, 200);
      textSize(40);
      textAlign(CENTER);
      text(degree, 0, 935);
    }
  }
}