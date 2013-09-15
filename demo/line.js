/***********************************************************************

	Line in form a*x + b*y + c = 0

	author: Wojciech Muła, wojciech_mula@poczta.onet.pl
	license: public domain
	last update: 2013-09-15

***********************************************************************/

function Line(point1, point2) {

    var [a, b, c] = get_line_equation(point1, point2)

    this.side = function(point) {
        function sign(x) {
            if (x < 0.0)
                return -1;

            if (x > 0.0)
                return +1;

            return 0.0;
        }

        return sign(a*point.x + b*point.y + c);
    }

    function get_line_equation(p1, p2) {
        var a = p2.y - p1.y;
        var b = -(p2.x - p1.x);
        var c = -(a*p1.x + b*p1.y);

        return [a, b, c];
    }

}
