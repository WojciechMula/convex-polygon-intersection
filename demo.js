var gui;

function init() {

    function create_convex_polygon(num_points, radius, dx, dy) {

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function randint(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        var polygon = new Polygon();

        p1 = new Point(random(-radius, radius), random(-radius, radius));
        p2 = new Point(random(-radius, radius), random(-radius, radius));
        p3 = new Point(random(-radius, radius), random(-radius, radius));

        p1.set_length(radius);
        p2.set_length(radius);
        p3.set_length(radius);

        polygon.add(p1);
        polygon.add(p2);
        polygon.add(p3);

        var c = polygon.center();
        polygon.translate(-c.x, -c.y);

        while (polygon.points.length < num_points) {
            var idx = randint(0, polygon.points.length);
            var p1 = polygon.get(idx);
            var p2 = polygon.get(idx + 1);

            var x = (p1.x + p2.x)/2;
            var y = (p1.y + p2.y)/2;
            var p = new Point(x, y);

            p.set_length(random(p.get_length(), radius));

            polygon.points.splice(idx+1, 0, p);
        }

        polygon.translate(dx, dy)

        return polygon;
    }

    function create_callback(dx, dy) {
        return create_convex_polygon(6, 150, dx, dy)
    }

    gui = new GUI(create_callback);
    gui.init();
}
