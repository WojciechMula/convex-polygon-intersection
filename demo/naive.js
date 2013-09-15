/***********************************************************************

	Implementation of "naive" checking

	author: Wojciech Muła, wojciech_mula@poczta.onet.pl
	license: public domain
	last update: 2013-09-15

***********************************************************************/

function naive(polygon1, polygon2) {

	var mul = 0;
	var add = 0;
	var cmp = 0;

	function print_stats() {
		//console.log("naive: mul - " + mul + ", add = " + add + ", cmp = " + cmp);
	}

    function get_side(point1, point2) {
		mul += 2*2 + 1;
		add += 2*2;
        var s1 = line.side(point1);
        var s2 = line.side(point2);
        var side = s1 * s2;

        if (side < 0.0) {
			cmp += 1;
            return null;
        } else if (side > 0.0) {
			cmp += 1;
            return s1;
        }

        if (s1 == 0.0) {
			cmp += 1;
            return s2;
        }

        if (s2 == 0.0) {
			cmp += 1;
            return s1;
        }
    }
 
    var line;
    var i, n = polygon1.points.length;
    var j, k = polygon2.points.length;

    for (i=0; i < n; i++) {
        var A1 = polygon1.get(i - 1),
            A2 = polygon1.get(i),
            A3 = polygon1.get(i + 1);

        for (j=0; j < k; j++) {
            var B1 = polygon2.get(j - 1),
                B2 = polygon2.get(j),
                B3 = polygon2.get(j + 1);

			mul += 2;
			add += 2;

            line = new Line(A2, B2);

            var sideA = get_side(A1, A3);
            if (sideA === null) continue;
            var sideB = get_side(B1, B3);
            if (sideB === null) continue;

			mul += 1;
			cmp += 1;

            if (sideA * sideB < 0.0) {
				print_stats();
                return [A2, B2];
            }
        }
    }

	print_stats();
    return null;
}

