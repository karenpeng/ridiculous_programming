(function (exports) {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var w = window.innerWidth * 3 / 5;
  var h = window.innerHeight;

  //------------------------class-------------------------
  tool.minDistance = 4;
  tool.maxDistance = 50;

  var nickNames = [
    'Sunset',
    'Peewee',
    'Skeeter',
    'Limberleg',
    'Two - Bits',
    'Hunky - Dory',
    'Hoot Owl',
    'Tumbleweed',
    'Swayback',
    'Wild - Cat',
    'Bean - Belly',
    'Never Sweat',
    'Iron Jaw',
    'Rockin - Chair',
    'Razorback',
    'Jack - Rabbit',
    'Four - Ace',
    'The Rambler',
    'Snake Eye',
    'Gray Wonder',
    'Puddin’ - Foot',
    'Bootjack',
    'Mountain Sprout'
  ];

  function curvyLine() {
    this.path = new Path();
    this.path.strokeColor = 'black';
    this.diff = [];
    this.path.fullySelected = true;
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

  //-------------------------main------------------------------

  exports.c;
  var pattern = [];
  var patterns = [];
  var theta = 0;

  function onMouseDown(event) {
    exports.c = new curvyLine();
    exports.c.begin(event.point);
  }

  function onMouseDrag(event) {
    exports.c.middle(event.delta, event.point);
  }

  function onMouseUp(event) {
    exports.c.end();
    patterns.push(exports.c);
  }
  var a;
  var counter = 0;

  function onFrame(event) {
    drawGrid();

    if (patterns.length > 1) {
      a = new patternCreator(patterns[0].diff);
      if (counter < patterns[1].path.segments.length) {
        patterns[1].path.segments.forEach(function (s) {
          var result = a.generate();
          console.log(result);
          counter++;
          s.point.y += (result.y + 4) * 60;
          //theta += 0.0001;
        });
      }
    }
  }
  //exports.c = c;
})(this);