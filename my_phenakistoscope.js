const SLICE_COUNT = 18;

let outputMode = true;

// rOffset determines the backwards rotation of the phenakistoscope
var rOffset = 0;

// yOffset determines the movement of the planes
var yOffset = 0;

function setup_pScope(pScope) {
  pScope.output_mode(outputMode ? ANIMATED_DISK : OUTPUT_GIF(1000));
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
  planeSetup(0, 300, 13, false, animation)
  planeSetup(0, 450, 1, true, animation)
  planeSetup(0, 500, 6, false, animation)
  planeSetup(0, 600, 15, true, animation)
  planeSetup(0, 600, 4, true, animation)
  planeSetup(0, 700, 9, true, animation)

  if (animation.frame == 0) {                                  // Ensures that the plane is only drawn on once 
    rOffset += 1;
    rOffset = rOffset % SLICE_COUNT;

    yOffset -= 5;
  }
}

function planeSetup(x, y, slice, plane, animation) {
  let r = (360 / SLICE_COUNT) * (rOffset + slice);             // Cancels the phenakistoscope Rotation
  y = y + ((yOffset - (slice * 5) - 1) % (SLICE_COUNT * 5));   // Move the planes forward

  rotate(r);
  planeDraw(x, y, slice, plane, animation)
  rotate(-r);
}

function planeDraw(x, y, slice, plane, animation) {
  if (animation.frame == 0) {
                                                                // Fades the planes in and out
    fill(255, 255, 255, (255 - ((rOffset + slice - 1) % SLICE_COUNT * (255 / (SLICE_COUNT - 2)))));

    if (plane) {                                               // Plane
      planeIcon(x, y, animation)
    } else {                                                   // Bomb
      circle(x, y, 60);
      circle(x, y, 40);
      circle(x, y, 20);
    }
  }
}

function planeIcon(x, y) {
  beginShape();
  vertex((x - 30), (y + 63));
  vertex((x - 30), (y + 50));

  vertex((x - 10), (y + 40));

  vertex((x - 10), (y));
  vertex((x - 60), (y + 10));
  vertex((x - 60), (y));
  vertex((x - 10), (y - 25));

  vertex((x - 10), (y - 50));

  bezierVertex((x - 10), (y - 50), (x), (y - 100), (x + 10), (y - 50));

  vertex((x + 10), (y - 50));

  vertex((x + 10), (y));
  vertex((x + 60), (y + 10));
  vertex((x + 60), (y));
  vertex((x + 10), (y - 25));

  vertex((x + 10), (y + 40));


  vertex((x + 30), (y + 50));
  vertex((x + 30), (y + 63));

  vertex((x), (y + 55));
  endShape();

}

function radarLine(x, y, animation) {
  angleMode(DEGREES);
  strokeWeight(4);

  let l = 360                                                  // Number of lines

  if (animation.frame == 0) {

    for (let i = 0; i < l; i++) {                              // Draws all of the lines to create the gradient effect
      stroke(0, 255, 100, (200 - i * (200 / l)));
      rotate(140 / l);
      line(0, 0, 0, 1100);
    }
  }
}


function texts(x, y, animation) {
  rotate((360 / SLICE_COUNT) * (rOffset + 10) - 10);           // Cancels the phenakistoscope Rotation

  if (animation.frame == 0) {
    for (let i = 0; i < 36; i++) {
      let degree = (360 / 36) * i;

      let cDistance = (1000 - ((1000 / 6)) + 30);

      rotate((360 / 36))

      strokeWeight(7);                                         // Small ticker lines going around the outside
      stroke(255, 200);
      line(0, cDistance, 0, 880)

      strokeWeight(0);                                         // Text that goes around the outside
      fill(200, 255, 200, 200);
      textSize(40);
      textAlign(CENTER);
      text(degree, 0, 935);
    }
  }
}

function radarBG(x, y) {
  rotate((360 / SLICE_COUNT) * (rOffset + 10) - 10);           // Cancels the phenakistoscope Rotation

  fill(0);                                                     // Dark Green Background Circle
  circle(0, 0, 2000);

  let cNum = 50;                                               // Number of circles to make the background gradient

  for (let i = 0; i < cNum; i++) {                             // Draws the background circles
    fill(0, 150, 10, (255 / cNum));
    circle(0, 0, (2000 - (100 *  i)));
  }

  push()                                                       // Draws Europe without effecting any of the previous code
  europe()
  pop()

  strokeWeight(2);
  stroke(255, 100);
  fill(0, 0)

  for (let i = 0; i < 6; i++) {                                // Thin circles going from the center
    circle(0, 0, (2000 - ((2000 / 6) * i)));
  }

  let cDistance = (1000 - ((1000 / 6)));                       // Prevents the lines from going past the circles

  for (let i = 0; i < 9; i++) {                                // Thin straight lines going across the radar
    line(0, cDistance, 0, -cDistance);
    line(-cDistance, 0, cDistance, 0);
    rotate(20)
  }

}

// I traced a map of europe in Adobe Illustrator ( attached in the workbook ) which I export as a SVG
// which I then turned into p5 JS Code using this super cool online converter
// https://svg2p5.com/

function europe() {
  fill(0, 100);
  scale(0.7)                                                   // Scales the map down and puts it into the center
  translate(-1000, -1000);
  beginShape();
  vertex(-371.35, 1413.55);
  vertex(-346.07, 1402.56);
  vertex(-342.04, 1408.06);
  vertex(-335.08, 1402.56);
  vertex(-303.2, 1425.28);
  vertex(-243.47, 1438.47);
  vertex(-239.81, 1432.61);
  vertex(-232.11, 1443.97);
  vertex(-148.93, 1468.88);
  vertex(-136.47, 1465.59);
  vertex(-120.35, 1471.81);
  vertex(-99.83, 1485.74);
  vertex(-96.17, 1479.14);
  vertex(-81.88, 1480.24);
  vertex(-76.75, 1483.54);
  vertex(-60.62, 1493.43);
  vertex(-38.64, 1493.43);
  vertex(-33.51, 1491.24);
  vertex(-26.55, 1491.24);
  vertex(-17.02, 1482.81);
  vertex(22.19, 1345.03);
  vertex(26.59, 1341.73);
  vertex(33.18, 1355.29);
  vertex(39.41, 1365.18);
  vertex(41.24, 1358.95);
  vertex(37.95, 1347.96);
  vertex(29.15, 1338.43);
  vertex(18.16, 1329.64);
  vertex(18.53, 1319.38);
  vertex(13.76, 1309.49);
  vertex(14.49, 1303.99);
  vertex(26.22, 1317.18);
  vertex(28.79, 1307.29);
  vertex(28.79, 1290.43);
  vertex(0.2, 1272.11);
  vertex(-16.29, 1237.3);
  vertex(-5.29, 1227.41);
  vertex(-12.62, 1220.81);
  vertex(-36.07, 1190.03);
  vertex(-65.39, 1170.24);
  vertex(-92.87, 1153.39);
  vertex(-104.96, 1156.32);
  vertex(-111.19, 1154.85);
  vertex(-123.65, 1134.33);
  vertex(-119.98, 1096.23);
  vertex(-62.09, 1093.29);
  vertex(-56.96, 1087.8);
  vertex(-35.34, 1087.8);
  vertex(-20.68, 1115.28);
  vertex(-7.12, 1109.42);
  vertex(18.16, 1110.88);
  vertex(37.21, 1115.28);
  vertex(28.05, 1041.99);
  vertex(28.79, 1037.6);
  vertex(60.3, 1043.46);
  vertex(62.86, 1067.28);
  vertex(101.7, 1081.2);
  vertex(129.92, 1074.24);
  vertex(117.83, 1066.18);
  vertex(126.26, 1052.62);
  vertex(191.48, 1026.6);
  vertex(202.47, 978.6);
  vertex(290.05, 948.19);
  vertex(292.25, 936.46);
  vertex(321.2, 907.15);
  vertex(353.81, 844.49);
  vertex(357.11, 828);
  vertex(365.53, 826.17);
  vertex(368.83, 839.73);
  vertex(388.62, 822.5);
  vertex(410.6, 810.78);
  vertex(459.71, 808.58);
  vertex(463, 799.05);
  vertex(495.98, 792.09);
  vertex(503.68, 798.69);
  vertex(523.83, 801.25);
  vertex(523.83, 786.96);
  vertex(541.05, 782.2);
  vertex(534.82, 754.35);
  vertex(518.33, 696.82);
  vertex(508.81, 616.2);
  vertex(515.77, 572.23);
  vertex(532.99, 546.22);
  vertex(569.63, 542.92);
  vertex(583.19, 517.27);
  vertex(607.74, 502.61);
  vertex(613.24, 502.61);
  vertex(605.91, 509.94);
  vertex(609.94, 530.09);
  vertex(598.58, 557.21);
  vertex(602.25, 587.26);
  vertex(620.57, 589.82);
  vertex(625.7, 599.35);
  vertex(620.57, 612.91);
  vertex(601.51, 613.64);
  vertex(596.75, 637.09);
  vertex(587.96, 644.79);
  vertex(578.06, 659.08);
  vertex(575.5, 683.63);
  vertex(577.33, 705.25);
  vertex(590.15, 729.8);
  vertex(618.37, 750.32);
  vertex(632.66, 745.19);
  vertex(632.66, 759.11);
  vertex(644.02, 775.97);
  vertex(658.68, 762.78);
  vertex(671.87, 758.74);
  vertex(691.66, 740.79);
  vertex(715.47, 738.59);
  vertex(722.44, 745.92);
  vertex(754.68, 760.94);
  vertex(775.93, 772.67);
  vertex(848.12, 742.26);
  vertex(861.31, 721.37);
  vertex(878.9, 717.34);
  vertex(902.35, 700.12);
  vertex(940.09, 694.25);
  vertex(949.99, 717.34);
  vertex(960.98, 725.4);
  vertex(983.33, 718.44);
  vertex(998.36, 707.81);
  vertex(1004.59, 693.52);
  vertex(997.99, 673.37);
  vertex(1021.81, 670.07);
  vertex(1039.76, 648.45);
  vertex(1039.76, 613.64);
  vertex(1030.97, 586.52);
  vertex(1025.84, 559.41);
  vertex(1026.94, 532.66);
  vertex(1032.07, 517.63);
  vertex(1037.56, 488.69);
  vertex(1045.99, 472.2);
  vertex(1066.88, 459.74);
  vertex(1074.57, 459.74);
  vertex(1078.24, 467.07);
  vertex(1098.39, 482.46);
  vertex(1109.38, 500.05);
  vertex(1127.34, 506.27);
  vertex(1141.63, 494.55);
  vertex(1149.69, 480.26);
  vertex(1137.23, 438.49);
  vertex(1139.8, 403.31);
  vertex(1132.47, 399.28);
  vertex(1127.34, 413.57);
  vertex(1106.45, 405.14);
  vertex(1095.09, 383.15);
  vertex(1087.4, 363.37);
  vertex(1086.67, 345.05);
  vertex(1106.45, 337.72);
  vertex(1103.52, 331.12);
  vertex(1111.58, 331.12);
  vertex(1118.54, 321.59);
  vertex(1130.64, 318.3);
  vertex(1146.03, 313.17);
  vertex(1155.55, 311.33);
  vertex(1155.55, 298.51);
  vertex(1198.43, 298.51);
  vertex(1209.05, 303.27);
  vertex(1247.53, 298.51);
  vertex(1240.93, 273.59);
  vertex(1243.13, 266.63);
  vertex(1251.92, 276.16);
  vertex(1255.96, 269.93);
  vertex(1254.12, 258.2);
  vertex(1268.05, 265.9);
  vertex(1274.28, 258.2);
  vertex(1274.28, 245.74);
  vertex(1317.15, 242.08);
  vertex(1314.95, 235.85);
  vertex(1303.96, 235.85);
  vertex(1294.8, 225.22);
  vertex(1273.54, 231.82);
  vertex(1246.79, 210.2);
  vertex(1220.41, 220.83);
  vertex(1139.06, 259.67);
  vertex(1100.96, 286.42);
  vertex(1081.54, 291.18);
  vertex(1056.98, 296.68);
  vertex(1032.43, 285.32);
  vertex(1018.33, 266.63);
  vertex(995.06, 259.67);
  vertex(990.29, 244.64);
  vertex(985.53, 191.51);
  vertex(974.17, 165.86);
  vertex(965.74, 137.28);
  vertex(956.95, 108.33);
  vertex(967.94, 85.61);
  vertex(971.24, 69.49);
  vertex(980.77, 69.49);
  vertex(991.03, 60.33);
  vertex(989.56, 45.67);
  vertex(1018.33, -4.16);
  vertex(1035.37, -45.57);
  vertex(1047.82, -64.25);
  vertex(1056.62, -69.02);
  vertex(1058.45, -80.38);
  vertex(1054.79, -82.58);
  vertex(1049.29, -111.89);
  vertex(1015.94, -124.72);
  vertex(970.14, -117.39);
  vertex(957.68, -109.33);
  vertex(946.69, -88.07);
  vertex(939.36, -71.22);
  vertex(940.83, -52.9);
  vertex(932.4, -39.34);
  vertex(946.69, -17.35);
  vertex(950.72, -10.76);
  vertex(937.53, 6.47);
  vertex(935.7, 30.65);
  vertex(926.54, 42.01);
  vertex(907.85, 61.43);
  vertex(879.27, 90.38);
  vertex(867.91, 106.13);
  vertex(867.91, 121.16);
  vertex(845.19, 147.91);
  vertex(843.72, 201.04);
  vertex(841.52, 237.32);
  vertex(850.69, 277.26);
  vertex(873.77, 282.75);
  vertex(892.46, 299.61);
  vertex(911.15, 316.46);
  vertex(921.04, 335.15);
  vertex(910.05, 345.78);
  vertex(900.89, 373.99);
  vertex(886.6, 401.48);
  vertex(867.91, 407.71);
  vertex(850.69, 426.76);
  vertex(849.95, 460.47);
  vertex(846.65, 531.92);
  vertex(833.46, 593.48);
  vertex(827.97, 607.78);
  vertex(809.28, 608.88);
  vertex(776.67, 613.64);
  vertex(763.11, 629.76);
  vertex(762.74, 648.82);
  vertex(770.8, 659.08);
  vertex(757.25, 667.5);
  vertex(740.02, 666.04);
  vertex(723.9, 673.37);
  vertex(709.98, 671.17);
  vertex(709.61, 650.65);
  vertex(710.71, 639.66);
  vertex(688.72, 607.41);
  vertex(694.59, 592.39);
  vertex(705.95, 582.13);
  vertex(690.92, 575.16);
  vertex(654.28, 500.05);
  vertex(632.66, 441.42);
  vertex(627.9, 410.27);
  vertex(627.53, 398.18);
  vertex(607.74, 396.71);
  vertex(594.19, 397.08);
  vertex(593.82, 411.74);
  vertex(571.1, 411.74);
  vertex(558.64, 431.16);
  vertex(542.15, 456.44);
  vertex(511.01, 476.96);
  vertex(468.13, 483.56);
  vertex(449.45, 463.4);
  vertex(415.73, 431.52);
  vertex(412.07, 404.77);
  vertex(431.12, 403.31);
  vertex(443.58, 378.39);
  vertex(414.63, 385.35);
  vertex(402.91, 362.27);
  vertex(402.91, 313.17);
  vertex(414.27, 216.06);
  vertex(419.76, 185.28);
  vertex(469.23, 146.44);
  vertex(531.16, 102.84);
  vertex(565.24, 71.69);
  vertex(599.68, 23.69);
  vertex(627.53, -8.19);
  vertex(610.67, -10.76);
  vertex(610.67, -19.92);
  vertex(630.83, -19.92);
  vertex(657.58, -44.1);
  vertex(662.34, -103.46);
  vertex(692.02, -170.52);
  vertex(723.17, -229.15);
  vertex(744.42, -269.82);
  vertex(726.1, -266.16);
  vertex(675.53, -237.21);
  vertex(663.44, -228.41);
  vertex(674.43, -254.43);
  vertex(701.92, -269.82);
  vertex(730.86, -283.38);
  vertex(719.87, -289.24);
  vertex(703.01, -289.24);
  vertex(703.01, -305);
  vertex(728.66, -321.85);
  vertex(748.09, -344.21);
  vertex(745.15, -308.66);
  vertex(756.51, -320.39);
  vertex(762.74, -332.85);
  vertex(761.64, -357.4);
  vertex(814.04, -417.13);
  vertex(835.66, -419.69);
  vertex(848.85, -424.45);
  vertex(880, -436.55);
  vertex(878.9, -451.57);
  vertex(877.07, -455.6);
  vertex(888.06, -466.23);
  vertex(918.11, -486.01);
  vertex(949.62, -507.27);
  vertex(974.9, -507.27);
  vertex(979.3, -498.47);
  vertex(993.23, -504.7);
  vertex(993.59, -516.06);
  vertex(1007.15, -521.56);
  vertex(1040.5, -512.76);
  vertex(1103.52, -494.44);
  vertex(1101.32, -481.98);
  vertex(1098.02, -466.23);
  vertex(1061.02, -453.4);
  vertex(1129.54, -449.37);
  vertex(1131.37, -472.67);
  vertex(1170.21, -460.73);
  vertex(1162.88, -443.51);
  vertex(1216.38, -450.84);
  vertex(1253.76, -450.47);
  vertex(1334.37, -426.65);
  vertex(1405.46, -407.23);
  vertex(1436.6, -390.01);
  vertex(1453.83, -357.03);
  vertex(1450.16, -315.99);
  vertex(1427.44, -282.65);
  vertex(1403.26, -266.52);
  vertex(1357.46, -263.59);
  vertex(1322.28, -259.56);
  vertex(1288.57, -261.39);
  vertex(1238.73, -266.52);
  vertex(1220.05, -275.68);
  vertex(1206.49, -275.68);
  vertex(1247.16, -249.3);
  vertex(1275.74, -237.58);
  vertex(1299.56, -233.54);
  vertex(1320.81, -217.79);
  vertex(1319.71, -205.33);
  vertex(1319.35, -182.24);
  vertex(1331.07, -162.09);
  vertex(1344.63, -143.77);
  vertex(1352.69, -125.08);
  vertex(1372.85, -120.68);
  vertex(1382.37, -127.28);
  vertex(1394.47, -118.85);
  vertex(1404.73, -113.36);
  vertex(1430.01, -109.33);
  vertex(1446.5, -113.36);
  vertex(1456.39, -122.52);
  vertex(1456.39, -133.14);
  vertex(1448.33, -152.93);
  vertex(1436.24, -150.37);
  vertex(1426.34, -143.77);
  vertex(1388.24, -165.02);
  vertex(1388.24, -191.04);
  vertex(1404.73, -201.3);
  vertex(1429.64, -190.67);
  vertex(1462.99, -189.57);
  vertex(1494.13, -191.41);
  vertex(1494.13, -204.96);
  vertex(1494.13, -221.09);
  vertex(1459.69, -241.61);
  vertex(1458.96, -263.23);
  vertex(1466.65, -298.77);
  vertex(1486.44, -325.15);
  vertex(1487.9, -347.87);
  vertex(1507.33, -346.4);
  vertex(1519.42, -357.4);
  vertex(1534.81, -355.2);
  vertex(1551.66, -348.24);
  vertex(1543.24, -388.54);
  vertex(1520.15, -413.46);
  vertex(1500.73, -408.7);
  vertex(1484.61, -457.43);
  vertex(1468.48, -482.72);
  vertex(1454.19, -491.14);
  vertex(1435.87, -498.84);
  vertex(1454.19, -502.87);
  vertex(1466.65, -501.4);
  vertex(1492.67, -521.56);
  vertex(1513.92, -517.16);
  vertex(1539.94, -508.73);
  vertex(1551.66, -497.01);
  vertex(1545.43, -483.08);
  vertex(1524.91, -469.16);
  vertex(1527.48, -449.74);
  vertex(1528.58, -434.35);
  vertex(1545.8, -435.45);
  vertex(1563.39, -423.35);
  vertex(1578.41, -420.79);
  vertex(1599.67, -442.41);
  vertex(1607.36, -454.14);
  vertex(1591.24, -474.29);
  vertex(1585.38, -503.24);
  vertex(1605.16, -514.23);
  vertex(1594.54, -518.99);
  vertex(1582.44, -523.76);
  vertex(1607.36, -538.41);
  vertex(1613.96, -567);
  vertex(1613.96, -577.26);
  vertex(2647.47, -595.36);
  vertex(2627.82, 679.73);
  vertex(2601.07, 686.72);
  vertex(2586.07, 678.13);
  vertex(2564.88, 688.44);
  vertex(2562.59, 706.19);
  vertex(2540.26, 713.63);
  vertex(2507.05, 714.21);
  vertex(2501.89, 735.39);
  vertex(2476.7, 776.05);
  vertex(2463.53, 797.24);
  vertex(2450.36, 815.56);
  vertex(2448.07, 845.34);
  vertex(2449.21, 859.65);
  vertex(2433.18, 877.4);
  vertex(2416.57, 895.73);
  vertex(2404.55, 900.31);
  vertex(2414.28, 928.37);
  vertex(2414.28, 959.29);
  vertex(2407.41, 992.5);
  vertex(2409.13, 1005.1);
  vertex(2426.88, 999.94);
  vertex(2446.35, 1009.68);
  vertex(2470.4, 1035.45);
  vertex(2487.58, 1072.09);
  vertex(2502.47, 1081.26);
  vertex(2511.06, 1088.7);
  vertex(2531.1, 1098.43);
  vertex(2551.71, 1109.89);
  vertex(2572.9, 1124.77);
  vertex(2595.8, 1129.36);
  vertex(2607.26, 1135.08);
  vertex(2606.11, 2133.02);
  vertex(2601.07, 2141.79);
  vertex(2102.06, 2138.37);
  vertex(2105.45, 2087.82);
  vertex(2102.59, 2051.6);
  vertex(2106.49, 2020.33);
  vertex(2116.14, 1947.11);
  vertex(2119.26, 1923.13);
  vertex(2127.08, 1917.92);
  vertex(2126.56, 1907.24);
  vertex(2118.22, 1900.46);
  vertex(2111.97, 1883.53);
  vertex(2110.92, 1862.68);
  vertex(2098.94, 1853.04);
  vertex(2093.73, 1853.04);
  vertex(2095.03, 1814.47);
  vertex(2080.96, 1798.31);
  vertex(2093.2, 1768.87);
  vertex(2082.26, 1746.2);
  vertex(2063.5, 1774.08);
  vertex(2060.37, 1789.46);
  vertex(2008.78, 1783.46);
  vertex(1981.68, 1833.75);
  vertex(1945.19, 1859.29);
  vertex(1922.26, 1866.59);
  vertex(1906.37, 1873.62);
  vertex(1876.66, 1862.42);
  vertex(1859.72, 1846.52);
  vertex(1832.88, 1845.48);
  vertex(1812.04, 1844.96);
  vertex(1784.94, 1850.69);
  vertex(1782.59, 1879.1);
  vertex(1780.77, 1893.43);
  vertex(1767.74, 1897.86);
  vertex(1756.01, 1909.06);
  vertex(1729.69, 1916.88);
  vertex(1702.33, 1909.32);
  vertex(1697.64, 1889);
  vertex(1685.39, 1884.83);
  vertex(1685.39, 1895.25);
  vertex(1660.12, 1889);
  vertex(1635.62, 1911.93);
  vertex(1596.8, 1909.32);
  vertex(1624.42, 1897.6);
  vertex(1635.36, 1886.65);
  vertex(1645.79, 1869.71);
  vertex(1595.49, 1885.35);
  vertex(1584.03, 1881.18);
  vertex(1588.46, 1874.14);
  vertex(1600.97, 1874.67);
  vertex(1602.01, 1862.16);
  vertex(1577.25, 1862.16);
  vertex(1571.78, 1851.47);
  vertex(1555.36, 1840.53);
  vertex(1530.61, 1837.14);
  vertex(1570.22, 1839.23);
  vertex(1577.25, 1824.37);
  vertex(1567.09, 1816.82);
  vertex(1549.11, 1817.34);
  vertex(1517.84, 1822.55);
  vertex(1500.38, 1822.55);
  vertex(1485.79, 1812.91);
  vertex(1485.79, 1800.14);
  vertex(1485.79, 1791.8);
  vertex(1515.49, 1776.95);
  vertex(1535.82, 1773.82);
  vertex(1542.07, 1752.19);
  vertex(1519.14, 1756.1);
  vertex(1474.32, 1755.06);
  vertex(1484.75, 1742.03);
  vertex(1483.44, 1718.58);
  vertex(1483.44, 1671.67);
  vertex(1494.91, 1652.39);
  vertex(1511.33, 1642.75);
  vertex(1508.46, 1632.06);
  vertex(1500.9, 1639.62);
  vertex(1474.58, 1647.96);
  vertex(1458.17, 1636.23);
  vertex(1430.28, 1636.23);
  vertex(1405.79, 1634.93);
  vertex(1390.68, 1641.71);
  vertex(1378.95, 1642.49);
  vertex(1369.57, 1652.13);
  vertex(1347.94, 1662.03);
  vertex(1349.24, 1676.1);
  vertex(1363.58, 1686);
  vertex(1385.2, 1698.51);
  vertex(1379.99, 1701.64);
  vertex(1367.74, 1692.78);
  vertex(1364.62, 1700.86);
  vertex(1366.96, 1714.41);
  vertex(1360.71, 1717.27);
  vertex(1347.68, 1708.15);
  vertex(1342.21, 1712.84);
  vertex(1350.29, 1722.22);
  vertex(1327.62, 1722.49);
  vertex(1326.83, 1709.46);
  vertex(1313.54, 1704.24);
  vertex(1287.23, 1701.38);
  vertex(1287.49, 1725.61);
  vertex(1301.04, 1736.04);
  vertex(1310.94, 1752.45);
  vertex(1329.18, 1766);
  vertex(1338.04, 1775.38);
  vertex(1343.25, 1790.5);
  vertex(1355.76, 1805.35);
  vertex(1368.79, 1808.22);
  vertex(1381.56, 1808.22);
  vertex(1394.85, 1812.13);
  vertex(1395.11, 1821.25);
  vertex(1403.44, 1841.05);
  vertex(1419.6, 1840.79);
  vertex(1422.99, 1848.09);
  vertex(1422.47, 1854.08);
  vertex(1411.78, 1854.08);
  vertex(1400.32, 1846.26);
  vertex(1393.54, 1842.61);
  vertex(1390.42, 1844.96);
  vertex(1390.42, 1856.42);
  vertex(1399.01, 1874.67);
  vertex(1396.15, 1878.57);
  vertex(1385.2, 1878.05);
  vertex(1372.7, 1868.41);
  vertex(1363.58, 1860.33);
  vertex(1332.05, 1876.49);
  vertex(1342.21, 1878.05);
  vertex(1346.9, 1888.22);
  vertex(1354.19, 1894.73);
  vertex(1363.84, 1896.29);
  vertex(1371.13, 1903.07);
  vertex(1354.72, 1907.24);
  vertex(1352.89, 1915.84);
  vertex(1333.87, 1902.03);
  vertex(1326.83, 1901.77);
  vertex(1350.03, 1946.06);
  vertex(1355.24, 1967.95);
  vertex(1363.31, 1976.29);
  vertex(1349.5, 1975.77);
  vertex(1333.61, 1957.01);
  vertex(1330.74, 1953.62);
  vertex(1319.8, 1955.97);
  vertex(1322.66, 1974.99);
  vertex(1322.14, 1986.45);
  vertex(1311.46, 1979.42);
  vertex(1309.11, 1961.7);
  vertex(1297.13, 1949.19);
  vertex(1292.7, 1942.94);
  vertex(1283.84, 1946.06);
  vertex(1287.23, 1962.48);
  vertex(1285.66, 1967.95);
  vertex(1271.07, 1967.43);
  vertex(1259.86, 1939.55);
  vertex(1266.12, 1927.3);
  vertex(1255.69, 1910.89);
  vertex(1240.06, 1904.63);
  vertex(1226.77, 1891.86);
  vertex(1230.42, 1883.53);
  vertex(1237.19, 1883.53);
  vertex(1237.71, 1866.33);
  vertex(1251.26, 1868.15);
  vertex(1264.81, 1853.82);
  vertex(1270.81, 1853.82);
  vertex(1282.01, 1860.07);
  vertex(1312.5, 1864.5);
  vertex(1325.53, 1869.97);
  vertex(1332.57, 1869.97);
  vertex(1329.44, 1864.76);
  vertex(1325.79, 1862.42);
  vertex(1335.69, 1861.64);
  vertex(1344.03, 1854.6);
  vertex(1339.34, 1851.99);
  vertex(1320.58, 1852.78);
  vertex(1310.16, 1846.26);
  vertex(1296.87, 1845.22);
  vertex(1282.27, 1847.3);
  vertex(1260.39, 1850.95);
  vertex(1248.92, 1855.12);
  vertex(1236.41, 1847.04);
  vertex(1230.94, 1855.9);
  vertex(1220.78, 1859.81);
  vertex(1209.05, 1832.19);
  vertex(1196.54, 1824.89);
  vertex(1161.62, 1785.03);
  vertex(1140.52, 1751.93);
  vertex(1132.44, 1743.33);
  vertex(1110.29, 1730.82);
  vertex(1102.99, 1721.18);
  vertex(1112.9, 1721.18);
  vertex(1095.96, 1704.77);
  vertex(1104.82, 1642.23);
  vertex(1105.86, 1620.6);
  vertex(1084.75, 1617.99);
  vertex(1057.39, 1592.19);
  vertex(994.59, 1559.1);
  vertex(953.42, 1524.44);
  vertex(923.19, 1515.84);
  vertex(899.48, 1524.18);
  vertex(880.46, 1497.86);
  vertex(848.93, 1460.86);
  vertex(839.55, 1432.2);
  vertex(840.85, 1414.74);
  vertex(823.65, 1399.36);
  vertex(811.14, 1391.81);
  vertex(807.49, 1401.19);
  vertex(800.72, 1425.94);
  vertex(787.17, 1435.32);
  vertex(773.88, 1413.96);
  vertex(764.76, 1387.64);
  vertex(776.48, 1380.34);
  vertex(784.04, 1374.87);
  vertex(768.67, 1365.49);
  vertex(761.11, 1368.35);
  vertex(747.56, 1368.09);
  vertex(744.43, 1375.65);
  vertex(717.07, 1385.81);
  vertex(706.13, 1396.24);
  vertex(699.35, 1409.53);
  vertex(713.16, 1419.43);
  vertex(719.94, 1432.2);
  vertex(710.3, 1439.23);
  vertex(705.09, 1442.36);
  vertex(706.39, 1467.38);
  vertex(725.67, 1498.12);
  vertex(750.95, 1506.46);
  vertex(772.84, 1522.36);
  vertex(783.52, 1537.47);
  vertex(795.77, 1566.92);
  vertex(800.72, 1584.9);
  vertex(834.59, 1617.47);
  vertex(849.19, 1627.37);
  vertex(873.68, 1635.45);
  vertex(906.78, 1634.41);
  vertex(922.41, 1633.11);
  vertex(928.14, 1645.09);
  vertex(919.28, 1651.35);
  vertex(908.34, 1659.95);
  vertex(954.72, 1681.57);
  vertex(982.6, 1687.83);
  vertex(988.08, 1695.65);
  vertex(1009.71, 1706.07);
  vertex(1030.29, 1716.49);
  vertex(1042.8, 1730.82);
  vertex(1058.43, 1742.81);
  vertex(1061.82, 1753.23);
  vertex(1059.22, 1765.22);
  vertex(1058.96, 1774.34);
  vertex(1040.98, 1771.21);
  vertex(1030.29, 1758.71);
  vertex(1025.34, 1744.11);
  vertex(997.46, 1743.07);
  vertex(986.51, 1738.38);
  vertex(986.77, 1732.13);
  vertex(973.22, 1733.69);
  vertex(965.41, 1753.23);
  vertex(952.9, 1774.86);
  vertex(953.42, 1793.88);
  vertex(972.96, 1797.27);
  vertex(987.3, 1812.91);
  vertex(991.99, 1831.67);
  vertex(996.42, 1838.7);
  vertex(995.11, 1845.48);
  vertex(982.87, 1847.83);
  vertex(972.44, 1849.13);
  vertex(958.37, 1863.2);
  vertex(963.58, 1886.91);
  vertex(944.3, 1899.16);
  vertex(941.17, 1914.27);
  vertex(938.05, 1923.92);
  vertex(913.55, 1923.13);
  vertex(910.16, 1903.59);
  vertex(919.28, 1892.65);
  vertex(923.19, 1874.67);
  vertex(919.8, 1868.67);
  vertex(937.78, 1864.76);
  vertex(939.61, 1856.42);
  vertex(938.31, 1847.56);
  vertex(904.95, 1774.6);
  vertex(900, 1769.13);
  vertex(891.14, 1770.95);
  vertex(882.54, 1772.52);
  vertex(859.61, 1756.36);
  vertex(864.04, 1745.94);
  vertex(853.1, 1732.91);
  vertex(828.34, 1734.99);
  vertex(834.85, 1726.39);
  vertex(823.39, 1720.66);
  vertex(808.28, 1725.09);
  vertex(793.68, 1691.22);
  vertex(781.96, 1692.26);
  vertex(782.22, 1697.99);
  vertex(762.67, 1693.3);
  vertex(748.86, 1689.13);
  vertex(734.27, 1676.36);
  vertex(704.82, 1653.17);
  vertex(676.42, 1622.42);
  vertex(654.01, 1612.26);
  vertex(645.67, 1615.91);
  vertex(644.11, 1593.76);
  vertex(613.88, 1571.61);
  vertex(607.37, 1541.38);
  vertex(600.07, 1517.67);
  vertex(594.34, 1499.17);
  vertex(579.48, 1490.57);
  vertex(573.23, 1493.17);
  vertex(548.74, 1474.41);
  vertex(535.45, 1472.07);
  vertex(522.68, 1465.03);
  vertex(506.26, 1475.71);
  vertex(499.49, 1488.48);
  vertex(491.41, 1499.95);
  vertex(468.22, 1510.63);
  vertex(452.06, 1510.89);
  vertex(445.28, 1517.67);
  vertex(433.56, 1523.14);
  vertex(422.87, 1530.44);
  vertex(412.71, 1538.25);
  vertex(411.41, 1546.85);
  vertex(364.77, 1559.62);
  vertex(354.34, 1549.46);
  vertex(342.09, 1548.16);
  vertex(341.05, 1536.17);
  vertex(327.24, 1537.73);
  vertex(324.11, 1533.3);
  vertex(322.03, 1527.57);
  vertex(313.69, 1532);
  vertex(304.83, 1535.65);
  vertex(299.88, 1533.82);
  vertex(300.14, 1523.14);
  vertex(280.86, 1525.75);
  vertex(274.08, 1516.1);
  vertex(262.88, 1518.97);
  vertex(248.02, 1531.48);
  vertex(229, 1539.82);
  vertex(222.75, 1558.06);
  vertex(215.45, 1570.05);
  vertex(222.49, 1595.84);
  vertex(227.96, 1605.22);
  vertex(221.44, 1607.57);
  vertex(217.8, 1613.56);
  vertex(221.18, 1629.2);
  vertex(215.97, 1637.01);
  vertex(174.02, 1656.56);
  vertex(160.73, 1666.46);
  vertex(155, 1672.97);
  vertex(121.9, 1677.93);
  vertex(93.5, 1680.01);
  vertex(79.69, 1691.74);
  vertex(76.3, 1698.51);
  vertex(87.77, 1705.03);
  vertex(84.38, 1705.81);
  vertex(58.06, 1716.23);
  vertex(18.71, 1765.48);
  vertex(6.73, 1777.99);
  vertex(5.42, 1799.88);
  vertex(10.37, 1814.99);
  vertex(20.02, 1832.97);
  vertex(31.74, 1835.84);
  vertex(28.87, 1841.05);
  vertex(10.37, 1851.99);
  vertex(-11.25, 1861.64);
  vertex(-24.02, 1874.4);
  vertex(-28.45, 1893.95);
  vertex(-35.23, 1904.89);
  vertex(-30.8, 1914.01);
  vertex(-53.99, 1917.14);
  vertex(-65.46, 1913.49);
  vertex(-77.7, 1919.22);
  vertex(-100.11, 1929.39);
  vertex(-111.58, 1951.54);
  vertex(-123.83, 1961.96);
  vertex(-133.99, 1955.71);
  vertex(-146.76, 1955.71);
  vertex(-156.14, 1961.96);
  vertex(-165.26, 1958.83);
  vertex(-175.16, 1953.88);
  vertex(-194.7, 1953.1);
  vertex(-200.18, 1960.14);
  vertex(-219.72, 1946.85);
  vertex(-242.13, 1946.06);
  vertex(-256.2, 1946.06);
  vertex(-277.05, 1960.14);
  vertex(-292.16, 1952.58);
  vertex(-308.32, 1958.83);
  vertex(-323.95, 1972.64);
  vertex(-333.86, 1978.38);
  vertex(-348.97, 1963);
  vertex(-361.48, 1954.66);
  vertex(-363.82, 1932.78);
  vertex(-360.17, 1933.04);
  vertex(-371.35, 1921.57);
  vertex(-369.82, 1912.45);
  vertex(-372.94, 1899.42);
  vertex(-383.37, 1890.04);
  vertex(-402.13, 1873.1);
  vertex(-430.01, 1877.27);
  vertex(-448.77, 1881.96);
  vertex(-467.27, 1869.97);
  vertex(-485.51, 1865.54);
  vertex(-508.44, 1865.28);
  vertex(-508.44, 1854.13);
  vertex(-493.09, 1825.53);
  vertex(-488.9, 1810.66);
  vertex(-492.33, 1800.37);
  vertex(-483.56, 1782.83);
  vertex(-480.89, 1766.43);
  vertex(-482.41, 1760.71);
  vertex(-499.57, 1760.71);
  vertex(-499.95, 1746.99);
  vertex(-512.92, 1734.02);
  vertex(-495.38, 1698.56);
  vertex(-483.18, 1685.6);
  vertex(-458.01, 1647.85);
  vertex(-430.94, 1588.75);
  vertex(-430.94, 1550.24);
  vertex(-427.89, 1519.74);
  vertex(-419.12, 1502.2);
  vertex(-411.88, 1491.14);
  vertex(-415.31, 1479.32);
  vertex(-421.79, 1461.02);
  vertex(-425.6, 1438.14);
  vertex(-428.65, 1432.04);
  vertex(-408.44, 1428.23);
  vertex(-405.01, 1422.13);
  vertex(-391.67, 1422.13);
  vertex(-373.37, 1424.04);
  vertex(-371.35, 1413.55);
  endShape();
}