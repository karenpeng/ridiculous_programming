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

  loop(function () {
    for (var i = 0; i < curvyLines.length; i++) {
      patterns[i] = curvyLines[i];
    }

    if (patterns) {
      patterns.forEach(function (p) {
        if (!p.shrink) {
          p.path.forEach(function (item) {
            item[0] *= 0.2;
            item[1] *= 0.2;
          });
          p.diff.forEach(function (item) {
            item[0] *= 0.2;
            item[1] *= 0.2;
          });
          p.shrink = true;
        }
      });
    }
    patterns.forEach(function (cc) {
      cc.render(context1);
    });
  }, 10);

})(this);