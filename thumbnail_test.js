(function (exports) {
  var patterns = [];
  var canvas1 = document.getElementById('myCanvas1');
  var context1 = canvas1.getContext('2d');
  var w = window.innerWidth * 2 / 5;
  var h = window.innerHeight * 2 / 5;
  $("#myCanvas1").attr('width', w);
  $("#myCanvas1").attr('height', h);
  var lineNumber = 0;

  $("#myCanvas").mouseup(function () {
    if (!shiftDown) {
      // patterns[lineNumber] = new curvyLine().copyFrom(lines[lineNumber]);
      // patterns[lineNumber].shrink();
      // patterns[lineNumber].render(context1);
      // lineNumber++;
    }
  });

  exports.patterns = patterns;

})(this);