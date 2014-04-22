    tool.minDistance = 4;
    tool.maxDistance = 50;

    var c;
    var pattern = [];
    var patterns = [];
    var theta = 0;

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var w = window.innerWidth / 2;
    var h = window.innerHeight;

    function drawGrid() {
      for (var x = 20; x < w; x += 20) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, h);
        context.strokeStyle = '#ddd';
        context.stroke();
      }
      for (var y = 20; y < h; y += 20) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(w, y);
        context.strokeStyle = '#ddd';
        context.stroke();
      }
    }

    function curvyLine() {
      this.path = new Path();
      this.path.strokeColor = 'black';
      this.diff = [];
    }
    curvyLine.prototype = {
      begin: function (p) {
        this.path.add(p);
      },
      middle: function (m, p) {
        this.diff.push(m);
        this.path.add(p);
      },
      end: function () {
        this.path.smooth();
      }
    };

    function onMouseDown(event) {
      c = new curvyLine();
      c.begin(event.point);
    }

    function onMouseDrag(event) {
      c.middle(event.delta, event.point);
    }

    function onMouseUp(event) {
      c.end();
      patterns.push(c);
    }

    function onFrame(event) {

      //setTimeout(function () {
      //drawGrid();

      if (patterns.length > 1) {
        patterns[1].path.segments.forEach(function (s) {
          s.point.y += Math.sin(theta) * 200;
          theta += 0.01;
        });
      }

      //}, 200);
    }