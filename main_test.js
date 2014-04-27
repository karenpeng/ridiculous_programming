(function (exports) {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var editorW = window.innerWidth * 2 / 5;
  var w = window.innerWidth * 3 / 5;
  var h = window.innerHeight;
  $("#myCanvas").attr('width', w);
  $("#myCanvas").attr('height', h);

  function curvyLine() {
    this.path = [];
    this.diff = [];
    this.preX;
    this.preY;
    this.shrink = false;
  }
  curvyLine.prototype = {
    begin: function (x1, y1) {
      this.path.push([x1, y1]);
      this.preX = x1;
      this.preY = y1;
    },
    middle: function (x1, y1) {
      this.path.push([x1, y1]);

      var x_ = x1 - this.preX;
      var y_ = y1 - this.preY;
      this.diff.push([x_, y_]);

      this.preX = x1;
      this.preY = y1;
    },
    render: function (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = '#000';
      for (var i = 0; i < this.path.length - 2; i++) {
        ctx.moveTo(this.path[i][0], this.path[i][1]);
        ctx.lineTo(this.path[i + 1][0], this.path[i + 1][1]);
      }
      ctx.stroke();
    }
  };

  function patternCreator(arr) {
    this.i = 0;
    this.arr = arr;
  }

  patternCreator.prototype = {
    normalize: function (maxX, minX, maxY, minY) {

    },
    generate: function () {
      this.i++;
      if (this.i > this.arr.length - 1) {
        this.i = 0;
      }
      return this.arr[this.i];
    },
    value: function (time) {
      this.i = time;
    }
  };

  function drawBg() {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, w, h);
  }

  function drawGrid() {
    context.beginPath();
    for (var x = 20; x < w; x += 20) {
      context.moveTo(x, 0);
      context.lineTo(x, h);
    }
    for (var y = 20; y < h; y += 20) {
      context.moveTo(0, y);
      context.lineTo(w, y);
    }
    context.strokeStyle = '#cde';
    context.stroke();
  }

  function draw(foo, rate) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        draw(foo, rate);
      });
      foo();
    }, 1000 / rate);
  }

  //-------------------------main------------------------------

  var c;
  var curvyLines = [];
  var down = 0;

  $("#myCanvas").mousedown(function (e) {
    c = new curvyLine();
    c.begin(e.pageX - editorW, e.pageY);
    down = 1;
  });

  $("#myCanvas").mousemove(function (e) {
    if (down === 1) {
      c.middle(e.pageX - editorW, e.pageY);
    }
  });

  $("#myCanvas").mouseup(function () {
    curvyLines.push(c);
    c = null;
    down = 0;
  });

  draw(function () {
    drawBg();
    drawGrid();
    if (c) {
      c.render(context);
    }
    curvyLines.forEach(function (cc) {
      if (!cc.shrink) {
        cc.render(context);
      }
    });

  }, 10);

  //exports.curvyLine = curvyLine;
  exports.curvyLines = curvyLines;

})(this);