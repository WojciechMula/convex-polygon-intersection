/***********************************************************************

	Polygon class

	author: Wojciech Muła, wojciech_mula@poczta.onet.pl
	license: public domain
	last update: 2013-09-15

***********************************************************************/

function Polygon() {

    this.points = []

    this.add = function(point) {
        this.points.push(point);
    }

    this.get = function(index) {
        var n = this.points.length;
        if (index >= 0 && index < n) {
            var pt = this.points[index];
            if (pt !== undefined) {
                return pt;
            }
        }

        if (index >= n) {
            var pt = this.points[index - n];
            if (pt !== undefined) {
                return pt;
            }
        }

        if (index < 0) {
            var pt = this.points[n + index];
            if (pt !== undefined) {
                return pt;
            }
        }

        return undefined;
    }

    this.translate = function(dx, dy) {
        for (i in this.points) {
            this.points[i].x += dx;
            this.points[i].y += dy;
        }
    }

    this.rotate = function(x0, y0, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);

        for (i in this.points) {
            var x = this.points[i].x - x0;
            var y = this.points[i].y - y0;

            this.points[i].x = x*c - y*s + x0;
            this.points[i].y = x*s + y*c + y0;
        }
    }

    this.scale = function(x0, y0, scale) {
        for (i in this.points) {
            var x = this.points[i].x - x0;
            var y = this.points[i].y - y0;

            this.points[i].x = x*scale + x0;
            this.points[i].y = y*scale + y0;
        }
    }

    this.center = function() {
        var n = this.points.length;

        if (n == 0) {
            return undefined;
        }

        var xs = 0;
        var ys = 0;
        for (i in this.points) {
            xs += this.points[i].x;
            ys += this.points[i].y;
        }

        return new Point(xs/n, ys/n);
    }
}

