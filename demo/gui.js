function GUI(create_polygon) {

    var origin_x      = null;
    var origin_y      = null;
    var current_x     = null;
    var current_y     = null;
    var moving        = false;
    var rotate_by     = 5.0;
    var scale_larger  = 1.05;
    var scale_smaller = 0.95;

    var polygon1 = null;
    var polygon2 = null;
    var selected = null;
    var selected_element = null;

    var element = {};

    function onMouseClick(ev) {
        if (!moving) {
            origin_x = ev.clientX;
            origin_y = ev.clientY;
            moving = true;
        } else
            moving = false;
    }

    function onMouseMove(ev) {
        current_x = ev.clientX;
        current_y = ev.clientY;

        if (selected === null || !moving)
            return;

        var dx = origin_x - current_x,
            dy = origin_y - current_y;

        origin_x = current_x;
        origin_y = current_y;

        selected.translate(-dx, -dy);
        display_polygon(selected, selected_element);
        check_intersection();
    }

    var self = this;

    function onKeyPress(ev) {
        var key = null;
        try {
            key = String.fromCharCode(ev.charCode);
        } catch (e) {
            null;
        };

        switch (key) {
            case '1':
                self.select(1);
                break;
            case '2':
                self.select(2);
                break;
            case 'r':
                self.rotate_left();
                break;
            case 'R':
                self.rotate_right();
                break;
            case 's':
                self.scale(scale_smaller);
                break;
            case 'S':
                self.scale(scale_larger);
                break;
            case 'g':
            case 'G':
                self.generate();
        }
    }

    function rotate(angle) {
        if (selected === null)
            return;

        var c = selected.center();

        selected.rotate(c.x, c.y, angle * (Math.PI / 180));
        display_polygon(selected, selected_element);
        check_intersection();
    }


    function display_polygon(polygon, element) {
        var tmp = [];

        for (i in polygon.points) {
            tmp.push(polygon.points[i].x);
            tmp.push(polygon.points[i].y);
        }

        element.setAttribute("points", tmp.join(" "));
    }

    function check_intersection() {
        var result = check(polygon1, polygon2);
        if (result !== null) {
            // without intrsection
            var [V1, V2] = result;
            var line = element.line

            var p1 = lerp(V1, V2, 10);
            var p2 = lerp(V1, V2, -10);

            line.setAttribute('x1', p1.x);
            line.setAttribute('y1', p1.y);
            line.setAttribute('x2', p2.x);
            line.setAttribute('y2', p2.y);
            line.classList.remove("hidden");
            element.polygon1.classList.remove("collision");
            element.polygon2.classList.remove("collision");
        } else {
            element.line.classList.add("hidden");
            element.polygon1.classList.add("collision");
            element.polygon2.classList.add("collision");
        }

		var result = SAT(polygon1, polygon2);

		if (result) {
            var [P0, P1, N, range1, range2] = result;
            var line = element.sat_normal;

            var A = lerp(P0, P1, 0.5);
            var B = new Point(A.x + N.x, A.y + N.y);

            line.setAttribute('x1', A.x);
            line.setAttribute('y1', A.y);
            line.setAttribute('x2', B.x);
            line.setAttribute('y2', B.y);
            line.classList.remove("hidden");
		} else {
            var line = element.sat_normal;
            line.classList.add("hidden");
		}
    }

    function get(index) {
        if (index == 1) {
            return [polygon1, element.polygon1];
        }

        if (index == 2) {
            return [polygon2, element.polygon2];
        }

        if (selected) {
            return [selected, selected_element];
        }
    }

    this.select = function(index) {
        element.polygon1.classList.remove("selected");
        element.polygon2.classList.remove("selected");

        var result = get(index);

        if (result) {
            [selected, selected_element] = result;
            selected_element.classList.add("selected");
        } else {
            selected = null;
            selected_element = null;
        }
    }

    this.generate = function(index) {
        var result = get(index);

        if (result) {
            [polygon, polygon_element] = result;

            var c = polygon.center();
            var tmp = create_polygon(c.x, c.y);
            polygon.points = tmp.points;

            display_polygon(polygon, polygon_element);
            check_intersection();
        }
    }

    this.rotate_left = function() {
        rotate(rotate_by);
    }

    this.rotate_right = function() {
        rotate(-rotate_by);
    }

    this.scale = function(scale) {
        var result = get();

        if (result) {
            [polygon, polygon_element] = result;

            var c = polygon.center();
            polygon.scale(c.x, c.y, scale);

            display_polygon(polygon, polygon_element);
            check_intersection();
        }
    }

    this.init = function() {

        element["polygon1"] = document.getElementById("polygon1");
        element["polygon2"] = document.getElementById("polygon2");
        element["line"]     = document.getElementById("separating_line");
        element["sat_normal"] = document.getElementById("sat_normal");

        polygon1 = create_polygon(200, 200);
        polygon2 = create_polygon(400, 200);

        display_polygon(polygon1, element.polygon1);
        display_polygon(polygon2, element.polygon2);
        check_intersection();

        var canvas = document.getElementById("canvas")
        canvas.onclick = onMouseClick;
        canvas.onmousemove = onMouseMove;
        document.onkeypress = onKeyPress;
    }
}
