var gui;

function init() {

    function create_convex_polygon(num_points, radius, dx, dy) {

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function randint(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

		function generate_points() {
			var points = new Array();
			for (var i = 0; i < num_points; i++) {
				var P = new Point(random(-10, 10), random(-10, 10));
				P.set_length(random(0.3 * radius, radius));

				points.push(P);
			}

			return points;
		}

		var points = generate_points();
		var ch = convex_hull(points);
        var polygon = new Polygon();

		for (i in ch) {
			polygon.add(ch[i]);
		}

        polygon.translate(dx, dy)

        return polygon;
    }

    function create_callback(dx, dy) {
        return create_convex_polygon(15, 150, dx, dy)
    }

    gui = new GUI(create_callback);
    gui.init();
}
