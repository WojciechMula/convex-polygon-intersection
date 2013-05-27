function translate(points, dx, dy) {
    for (i in points) {
        points[i][0] += dx;
        points[i][1] += dy;
    }

    return points;
}

function rotate(points, x0, y0, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    for (i in points) {
        var x = points[i][0] - x0;
        var y = points[i][1] - y0;

        points[i][0] = x*c - y*s + x0;
        points[i][1] = x*s + y*c + y0;
    }

    return points;
}

function get_center(points) {
    var x = 0;
    var y = 0;
    for (i in points) {
        x += points[i][0];
        y += points[i][1];
    }

    return [x/points.length, y/points.length];
}

function check(polygon1, polygon2) {
    for (i in polygon1) {
        var [A1, A2, A3] = get_3points(polygon1, i);

        for (j in polygon2) {
            var [B1, B2, B3] = get_3points(polygon2, j);
            var [a, b, c] = get_line_equation(A2, B2);

            var sideA = get_side(A1, A3, a, b, c);   
            var sideB = get_side(B1, B3, a, b, c);   

            if (sideA != null && sideB != null) {
                if (sideA * sideB < 0.0) {
                    return [A2, B2];
                }
            }
        }
    }

    return null;
}

// return [points[index-1], points[index], points[index+1]], taking care
// about wrapping around
function get_3points(points, index) {
    var idx = 1 * index;
    var idx1 = idx - 1;
    var idx2 = idx;
    var idx3 = idx + 1;

    if (idx1 < 0) {
        idx1 = points.length - 1;
    }

    if (idx3 == points.length) {
        idx3 = 0;
    }

    return [
        points[idx1],
        points[idx2],
        points[idx3],
    ];
}

function get_side(point1, point2, a, b, c) {
    var s1 = get_line_side(point1[0], point1[1], a, b, c);
    var s2 = get_line_side(point2[0], point2[1], a, b, c);
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

function get_line_side(x, y, a, b, c) {
    function sign(x) {
        if (x < 0.0)
            return -1;

        if (x > 0.0)
            return +1;

        return 0.0;
    }

    return sign(a*x + b*y + c);
}


function get_line_equation(p1, p2) {
    var x1 = p1[0];
    var y1 = p1[1];

    var x2 = p2[0];
    var y2 = p2[1];

    var a = y2 - y1;
    var b = -(x2 - x1);
    var c = -(a*x1 + b*y1);

    return [a, b, c];
}

