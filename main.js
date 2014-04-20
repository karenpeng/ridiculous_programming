tool.minDistance = 10;
tool.maxDistance = 45;

var path;

tool.minDistance = 20;

function onMouseDown(event) {
  // if (path) {
  //   path.selected = true;
  // };
  path = new Path();
  path.strokeColor = 'black';
  path.fullySelected = true;
}

function onMouseDrag(event) {
  path.add(event.point);
}

function onMouseUp(event) {
  path.selected = false;
  path.smooth();
}