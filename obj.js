 (function (exports) {

   function curvyLine() {
     this.path = [];
     this.diff = [];
     this.preX;
     this.preY;
     this.shrinkDone = 0;
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
     },
     shrink: function () {
       if (!this.shrinkDone) {
         this.path.forEach(function (item) {
           item[0] *= 0.2;
           item[1] *= 0.2;
         });
         this.diff.forEach(function (item) {
           item[0] *= 0.2;
           item[1] *= 0.2;
         });
         this.shrinkDone = 1;
       }
     },
     amplify: function () {
       if (this.shrink) {
         this.path.forEach(function (item) {
           item[0] /= 0.2;
           item[1] /= 0.2;
         });
         this.diff.forEach(function (item) {
           item[0] /= 0.2;
           item[1] /= 0.2;
         });
         this.shrink = 0;
       }
     },
     copyFrom: function (obj) {
       var i = 0;
       var that = this;
       obj.path.forEach(function (item) {
         that.path[i] = [item[0], item[1]];
         i++;
       });
       var j = 0;
       obj.diff.forEach(function (item) {
         that.diff[j] = [item[0], item[1]];
         j++;
       });
       // this.path = obj.path.slice(0);
       // this.diff = obj.diff.slice(0);
       this.preX = obj.preX;
       this.preY = obj.preY;
       this.shrinkDone = obj.shrinkDone;
       this.shrink = obj.shrink;
       this.amplify = obj.amplify;
       return this;
     }
   };

   function circle(arr1, arr2) {
     if (arr1 === undefined && arr2 === undefined) {
       this.size = [20];
       this.position = [
         [350, 300]
       ];
     } else if (arr1 === undefined && arr2[0][0] !== undefined) {
       this.size = [20];
       this.position = arr2;
     } else if (arr1[0] !== undefined && arr1[0][0] === undefined && arr2 ===
       undefined) {
       this.size = arr1;
       this.position = [
         [350, 300]
       ];
     } else if (arr1[0] !== undefined && arr2[0][0] !== undefined) {
       this.size = arr1;
       this.position = arr2;
     }
   }
   circle.prototype = {
     draw: function (ctx, i, j) {
       ctx.beginPath();
       ctx.arc(this.position[i][0], this.position[i][1], this.size[j], 0,
         2 * Math.PI);
       ctx.strokeStyle = '#000';
       ctx.stroke();
     }
   };

   exports.curvyLine = curvyLine;
   exports.circle = circle;

 })(this);