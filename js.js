var canvas = document.querySelector("#canvas"),
	ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

var lineThickness = 50;

var painting = false,
	lastX = 0,
	lastY = 0;

canvas.width = canvas.height = 600;
ctx.fillRect(0, 0, 600, 600);


canvas.touchstart = function(e) {
	e.preventDefault();
	painting = true;
	canvas.style.cursor = "grabbing";
	lastX = e.pageX - this.offsetLeft;
	lastY = e.pageY - this.offsetTop;
};

canvas.touchend = function() {
	e.preventDefault();
	painting = false;
	canvas.style.cursor = "grab";

}

canvas.touchmove = function(e) {
	e.preventDefault();
	if (painting) {
		mouseX = e.pageX - this.offsetLeft;
		mouseY = e.pageY - this.offsetTop;

		// find all points between        
		var x1 = mouseX,
			x2 = lastX,
			y1 = mouseY,
			y2 = lastY;


		var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
		if (steep) {
			var x = x1;
			x1 = y1;
			y1 = x;

			var y = y2;
			y2 = x2;
			x2 = y;
		}
		if (x1 > x2) {
			let x = x1;
			x1 = x2;
			x2 = x;

			let y = y1;
			y1 = y2;
			y2 = y;
		}

		var dx = x2 - x1,
			dy = Math.abs(y2 - y1),
			error = 0,
			de = dy / dx,
			yStep = -1,
			y = y1;

		if (y1 < y2) {
			yStep = 1;
		}


		for (let x = x1; x < x2; x++) {
			if (steep) {
				ctx.clearRect(y - lineThickness / 2, x - lineThickness / 2, lineThickness, lineThickness);
			} else {
				ctx.clearRect(x - lineThickness / 2, y - lineThickness / 2, lineThickness, lineThickness);
			}

			error += de;
			if (error >= 0.5) {
				y += yStep;
				error -= 1.0;
			}
		}


		lastX = mouseX;
		lastY = mouseY;
	}
}