const SLICE_COUNT = 18;

let pieRadius = 1000;
let circleCount = 10;

let animate = true;

function setup_pScope(pScope) {
  pScope.output_mode(animate ? ANIMATED_DISK : STATIC_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  colorMode(HSL, circleCount);
  noStroke();

  new PLayer(null, 0);

  var layer1 = new PLayer(circles);
  layer1.mode(RING);
}

function circles(x, y, animation, pScope) {
  for (let i = 1; i < (circleCount + 1); i++) {

    let x = (animation.frame * SLICE_COUNT * 5) + 300;
    let y = i * (pieRadius / circleCount);

    let w = (animation.wave() * SLICE_COUNT * i) + 10;

    let h = ((animation.frame * SLICE_COUNT) + (i / 4)) % circleCount;
    fill(h, circleCount, (circleCount / 2));
    ellipse(x, y, w, w);
  }
}