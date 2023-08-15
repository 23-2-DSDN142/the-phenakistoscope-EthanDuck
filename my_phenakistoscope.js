const SLICE_COUNT = 18;

let pieRadius = 1000;
let circleCount = 10;

function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  colorMode(HSL, circleCount);
  noStroke();

  new PLayer(null, 0); //lets us draw the whole circle background, ignoring the boundaries

  var layer1 = new PLayer(circles);
  layer1.mode(RING);
  layer1.set_boundary(0, pieRadius);
}

function circles(x, y, animation, pScope) {
  for (let i = 1; i < (circleCount + 1); i++) {
    fill((animation.frame * i), circleCount, (circleCount / 2));
    ellipse(0, ((i * (pieRadius / (circleCount + 1)))), (50 * (i * 0.2)), (50 * (i * 0.2)));
  }
}