function check(polygon1, polygon2) {

    function get_side(point1, point2) {
        var s1 = line.side(point1);
        var s2 = line.side(point2);
        var side = s1 * s2;

        if (side < 0.0) {
            return null;
        } else if (side > 0.0) {
            return s1;
        }

        if (s1 == 0.0) {
            return s2;
        }

        if (s2 == 0.0) {
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

            var line = new Line(A2, B2);

            var sideA = get_side(A1, A3);
            var sideB = get_side(B1, B3);

            if (sideA != null && sideB != null) {
                if (sideA * sideB < 0.0) {
                    return [A2, B2];
                }
            }
        }
    }

    return null;
}
