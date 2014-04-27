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