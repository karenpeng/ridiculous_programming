    tool.minDistance = 1;
    tool.maxDistance = 20;

    var curvyLines = [];
    var c;

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var w = window.innerWidth / 2;
    var h = window.innerHeight;

    function drawGrid() {
      for (var x = 20; x < w - 20; x += 20) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, h);
        context.strokeStyle = '#ddd';
        context.stroke();
      }
      for (var y = 20; y < h - 20; y += 20) {
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
      this.path.fullySelected = true;
      this.preP = {
        x: 0,
        y: 0
      };
    }

    curvyLine.prototype = {
      beginLine: function (p) {
        this.preP = p - [10, 10];
      },
      addPoint: function (p) {
        if (p.x - this.preP.x >= 10) {
          console.log(p.x, this.preP.x);
          this.path.add(p);
          this.preP = p;
        }
      },
      endLine: function () {
        this.path.smooth();
      }
    };

    function onMouseDown(event) {
      c = new curvyLine();
      c.beginLine(event.point);
    }

    function onMouseDrag(event) {
      c.addPoint(event.point);
    }

    function onMouseUp(event) {
      c.endLine();
      curvyLines.push(c);
      //console.log(c);
    }

    function onFrame(event) {
      drawGrid();
      curvyLines.forEach(function (cl) {
        for (var i = 0; i < cl.path.segments.length; i++) {
          var p1 = cl.path.segments[i];
          for (var j = i + 1; j < cl.path.segments.length; j++) {
            var p2 = cl.path.segments[j];
            if (p2.x < p1.x) {
              //
            }
          }
        }
      });
    }