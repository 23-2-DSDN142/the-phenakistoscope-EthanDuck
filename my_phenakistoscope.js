const SLICE_COUNT = 18;

let animate = true;

let animatedSlide = 0;
let currentSlide = 0;


function setup_pScope(pScope) {
  pScope.output_mode(animate ? ANIMATED_DISK : STATIC_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  strokeWeight(0);

  var layer1 = new PLayer(radarBG);
  var layer2 = new PLayer(radarLine);
  var layer2 = new PLayer(debug);
}

function radarLine(x, y, animation, pScope) {
  angleMode(DEGREES); 
  strokeWeight(4);

  if (animation.frame == 0) {
    for (let i = 0; i < 50; i++) {
      rotate(90/50);
      stroke(0, 255, 100, ((100 / 50) * i));
      line((0), 0, 0, 1000);
    }
  }

  rotate(90/50);
}

function radarBG(x, y, animation, pScope) {
  fill(0, 100, 50)
  circle(0, 0, 2100)
}

function debug(x, y, animation, pScope) {
  fill(255);
  textSize(50);
  text((animation.frame * SLICE_COUNT), 0, 900);
}