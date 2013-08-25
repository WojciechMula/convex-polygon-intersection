/**
 * Find convex hull using Jarvis algorithm
 */
function convex_hull(points) {

	switch (points.length) {
		case 0:
		case 1:
		case 2:
			return null;

		case 3:
			return points;

		default:
			return get_ch();
	}

	function get_ch() {
		var ch = new Array();

		var min_idx = find_min();
		var curr = points[min_idx];
		var first = curr;
		var prev = new Point(curr.x + 100, curr.y);

		ch.push(first)

		while (points.length > 0) {
			var idx = find_next(prev, curr);
			if (idx === null)
				return;

			prev = curr;
			curr = points[idx];
			if (curr == first) {
				break;
			} else {
				ch.push(curr);
			}
		}

		return ch;
	}


	function find_min() {
		var index = 0;
		var P_min = points[index];
		for (var i = 1; i < points.length; i++) {
			var P = points[i];

			if (P.y < P_min.y || (P.y == P_min.y && P.x < P_min.x)) {
				P_min = P;
				index = i;
			}
		}

		return index;
	}

	function find_next(prev, curr) {

		function side(A, B, C) {
			var dx1 = B.x - A.x
			var dy1 = B.y - A.y

			var dx2 = C.x - A.x
			var dy2 = C.y - A.y

			return (dx1*dy2 - dx2*dy1)
		}

		var idx = null;

		var A = curr;
		var B = prev;
	
		for (var i = 0; i < points.length; i++) {
			var P = points[i];
			var s = side(A, B, P);

			if (s > 0) {
				B = P;
				idx = i;
			}
		}

		return idx;
	}
}
