(function (exports) {
  var patterns = [];
  var canvas1 = document.getElementById('myCanvas1');
  var context1 = canvas1.getContext('2d');
  var w = window.innerWidth * 2 / 5;
  var h = window.innerHeight * 2 / 5;
  $("#myCanvas1").attr('width', w);
  $("#myCanvas1").attr('height', h);

  function loop(foo, rate) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        loop(foo, rate);
      });
      foo();
    }, 1000 / rate);
  }

  $("#myCanvas").mouseup(function () {
    for (var i = 0; i < curvyLines.length; i++) {
      patterns[i] = new curvyLine().copyFrom(curvyLines[i]);
    }
  });

  loop(function () {
    if (patterns) {
      patterns.forEach(function (p) {
        p.shrink();
      });
    }
    patterns.forEach(function (cc) {
      cc.render(context1);
    });
  }, 10);

  exports.patterns = patterns;

})(this);