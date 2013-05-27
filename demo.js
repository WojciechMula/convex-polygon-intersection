var polygons = [];
var GUI;

function init() {

    function create_convex_polygon(num_points, radius, dx, dy) {

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function randint(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        function get_length(x, y) {
            return Math.sqrt(x*x + y*y);
        }

        function set_length(x, y, length) {
            var len = get_length(x, y);

            return [x*length/len, y*length/len];
        }

        var points = [
            set_length(random(-radius, radius), random(-radius, radius), radius),
            set_length(random(-radius, radius), random(-radius, radius), radius),
            set_length(random(-radius, radius), random(-radius, radius), radius)
        ];

        var [cx, cy] = get_center(points);

        translate(points, -cx, -cy);

        while (points.length < num_points) {
            var idx = randint(0, points.length);
            var p1 = points[idx];
            var p2 = points[idx + 1];

            if (p2 == undefined) {
                continue;
            }

            var x = (p1[0] + p2[0])/2;
            var y = (p1[1] + p2[1])/2;
            var min_length = get_length(x, y);

            var p = set_length(x, y, random(min_length, radius));

            points.splice(idx+1, 0, p);
        }

        return translate(points, dx, dy);
    }

    var polygons = [
        create_convex_polygon(6, 100, 100, 200),
        create_convex_polygon(6, 100, 300, 200)
    ];

    var options = {
        polygons: polygons,
    }

    GUI = create_GUI(options);
}
