/***********************************************************************

	2D point class

	author: Wojciech Muła, wojciech_mula@poczta.onet.pl
	license: public domain
	last update: 2013-09-15

***********************************************************************/

function Point(x, y) {
    this.x = x;
    this.y = y;

    this.get_length = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    this.set_length = function(length) {
        var len = this.get_length();

        if (len != 0.0) {
            var coef = length/len;
            this.x *= coef;
            this.y *= coef;
        }
    }
}

function lerp(p1, p2, t) {
    return new Point(
        p1.x + (p2.x - p1.x)*t,
        p1.y + (p2.y - p1.y)*t
    );
}
