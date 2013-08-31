function check(polygon1, polygon2) {

	var mul = 0;
	var add = 0;
	var cmp = 0;

	function print_stats() {
		console.log("wmu: mul - " + mul + ", add = " + add + ", cmp = " + cmp);
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

function SAT(polygon1, polygon2) {

	var mul = 0;
	var add = 0;
	var cmp = 0;

	function print_stats() {
		console.log("SAT: mul - " + mul + ", add = " + add + ", cmp = " + cmp);
	}

	var res = null;

	res = process(polygon1, polygon2);
	if (res) {
		print_stats();
		return res;
	}

	res = process(polygon2, polygon1);
	if (res) {
		print_stats();
		return res;
	}

		print_stats();

	function process(polygon1, polygon2) {
		var n = polygon1.points.length;
		var i;
		for (i=0; i < n; i++) {
			var P0 = polygon1.get(i);
			var P1 = polygon1.get(i + 1);

			add += 2;

			var dx = P1.x - P0.x;
			var dy = P1.y - P0.y;
			var N = new Point(-dy, dx);

			var proj1 = projection(polygon1.points, N);
			var proj2 = projection(polygon2.points, N);
			var [min1, max1] = proj1;
			var [min2, max2] = proj2;

			cmp += 2;

			if (max1 <= min2 || min1 >= max2)
				return [P0, P1, N, proj1, proj2];
		}

		return null;
	}

	function projection(points, N) {

		function proj(P, N) {
			mul += 2;
			add += 1;
			return (P.x * N.x + P.y * N.y);
		}

		var val = proj(points[0], N);
		var min = val;
		var max = val;
		
		var n = points.length;
		for (var i=1; i < n; i++) {
			var val = proj(points[i], N);

			cmp += 2;

			if (val > max)
				max = val;

			if (val < min)
				min = val;
		}

		return [min, max];
	}

}
