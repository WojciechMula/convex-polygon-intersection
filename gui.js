function create_GUI(options) {

    var selected_id = null;
    var object_id   = null;
    var origin_x    = null;
    var origin_y    = null;
    var rotate_by   = 5.0;

    var polygons = options.polygons;

    function onMouseClick(ev) {
        if (object_id == null) {
            object_id = selected_id;
            origin_x = ev.clientX;
            origin_y = ev.clientY;
        } else {
            object_id = null;
        }
    }

    function onMouseMove(ev) {
        if (object_id !== null) {
            var dx = origin_x - ev.clientX;
            var dy = origin_y - ev.clientY;

            origin_x = ev.clientX;
            origin_y = ev.clientY;

            var idx = object_id;
            translate(polygons[idx], -dx, -dy);
            display_polygon(polygons[idx], "polygon" + idx);
            checkIntersection();
        }
    }

    function rotateSelected(angle) {
        var idx = selected_id;
        if (null == idx)
            return;

        var [cx, cy] = get_center(polygons[idx]);

        rotate(polygons[idx], cx, cy, angle * (Math.PI / 180));
        display_polygon(polygons[idx], "polygon" + idx);
        checkIntersection();
    }

    function onKeyPress(ev) {
        var key = null;
        try {
            key = String.fromCharCode(ev.charCode);
        } catch (e) {
            null;
        };

        switch (key) {
            case '1':
                select(0);
                break;
            case '2':
                select(1);
                break;
            case 'r':
                rotateSelected(rotate_by);
                break;
            case 'R':
                rotateSelected(-rotate_by);
                break;
        }
    }

    function display_polygon(points, id) {
        var item = document.getElementById(id);
        var tmp = [];

        for (i in points) {
            tmp.push(points[i][0]);
            tmp.push(points[i][1]);
        }

        item.setAttribute("points", tmp.join(" "));
    }

    function checkIntersection() {
        var result = check(polygons[0], polygons[1]);
        console.log(result);
        if (result !== null) {
            // without intrsection
            var [V1, V2] = result;
            var line = document.getElementById("sample_line");

            line.setAttribute('x1', V1[0]);
            line.setAttribute('y1', V1[1]);
            line.setAttribute('x2', V2[0]);
            line.setAttribute('y2', V2[1]);
            line.classList.remove("hidden");
            document.getElementById("polygon0").classList.remove("collision");
            document.getElementById("polygon1").classList.remove("collision");
        } else {
            document.getElementById("sample_line").classList.add("hidden");
            document.getElementById("polygon0").classList.add("collision");
            document.getElementById("polygon1").classList.add("collision");
        }
    }

    function select(index) {
        var item = null;
        var p1 = document.getElementById("polygon0");
        var p2 = document.getElementById("polygon1");

        p1.classList.remove("selected");
        p2.classList.remove("selected");

        selected_id = null;
        if (index == 0) {
            item = p1;
            selected_id = 0;
        } else if (index == 1) {
            item = p2;
            selected_id = 1;
        }

        if (item) {
            item.classList.add("selected");
        }
    }

    function init() {
        for (i in options.polygons) {
            display_polygon(options.polygons[i], "polygon" + i);
        }

        checkIntersection();

        var canvas = document.getElementById("canvas")
        canvas.onclick = onMouseClick;
        canvas.onmousemove = onMouseMove;
        document.onkeypress = onKeyPress;
    }

    init();

    return {
        select: select,
    }
}
