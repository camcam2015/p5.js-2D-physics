var ship;
var currentTime, deltaTime, previousTime = 0;
var yForce = 0;
var xForce = 0;
var timeS;
var maxSpeed;
var arrows;

function setup() {
	createCanvas(800, 800);
	ship = new Ship(width / 2, height / 2, 10, 20);
	arrows = new Arrows(width, height);
	maxSpeed = 10;
}

function draw() {
	background(246,135,135);
	currentTime = millis() / 60;
	deltaTime = currentTime - previousTime;
	previousTime = currentTime;

	ship.calcMult();
	ship.computeVelocity(deltaTime, xForce, yForce);
	ship.dampVelocity();
	ship.computePosition(deltaTime);
	ship.computePositionRotation();
	ship.draw();
	currentTime += deltaTime;
	arrows.draw();

	if (keyIsDown(LEFT_ARROW)) {
		ship.theta -= 1/8;
	} else if (keyIsDown(RIGHT_ARROW)) {
		ship.theta += 1/8;
	}
	
	if (keyIsDown(LEFT_ARROW)) {
		arrows.leftColor = color('cyan');
	} else {
		arrows.leftColor = color('white');
	}
	if (keyIsDown(RIGHT_ARROW)) {
		arrows.rightColor = color('cyan');
	} else {
		arrows.rightColor = color('white');
	}
	
	

	if (keyIsDown(UP_ARROW)) {
		//	depending on where the offset circle is, a force of x and y will be added
		xForce = ship.xMult*2;
		yForce = ship.yMult*2;
		arrows.upColor = color('cyan');
	} else {
		arrows.upColor = color('white');
	}

	// eventually will add friction?? maybe??
	if (!keyIsPressed) {
		xForce = 0;
		yForce = 0;
	}

	// print("force x: " + xForce);
	// print("force y: " + yForce);

	// if (keyIsDown(LEFT_ARROW)) {
	// 	xForce = -2;
	// }
	// if (keyIsDown(RIGHT_ARROW)) {
	// 	xForce = 2;
	// }
	// if (keyIsDown(UP_ARROW)) {
	// 	yForce = 2;
	// }
	// if (keyIsDown(DOWN_ARROW)) {
	// 	yForce = -2;
	// }


	// looping movement across canvas
	if (ship.posX - ship.size > width) {
		ship.posX = -ship.size;
	}
	if (ship.posX + ship.size < 0) {
		ship.posX = width + ship.size;
	}
	if (ship.posY - ship.size > height) {
		ship.posY = -ship.size;
	}
	if (ship.posY + ship.size < 0) {
		ship.posY = height + ship.size;
	}
}

class Arrows {
	constructor(x, y) {
		this.offX = x - 75;
		this.offY = y - 50;
		this.leftColor = color('white');
		this.rightColor = color('white');
		this.upColor = color('white');
	}
	
	draw() {
		push();
		rectMode(CENTER);
		fill(this.leftColor);
		rect(this.offX-25, this.offY, 20, 20);
		
		fill(this.rightColor);
		rect(this.offX+25, this.offY, 20, 20);
		
		fill(this.upColor);
		rect(this.offX, this.offY - 25, 20, 20);
		pop();
	}
}

class Ship {
	constructor(x, y, size, mass) {
		this.size = size;
		this.posX = x;
		this.posY = y;
		this.mass = mass;
		this.velocityX = 0;
		this.velocityY = 0;

		this.theta = PI / 2;
		this.posOffsetX;
		this.posOffsetY;

		this.xMult;
		this.yMult;

	}

	draw() {
		circle(this.posX, this.posY, this.size);
		circle(this.posOffsetX, this.posOffsetY, 3);
	}

	computeForce() {
		// 		var forceX = this.mass * forceX;
		// 		var forceY = this.mass * forceY;

		// 		print("Force X: " + this.forceX);
		// 		print("Force Y: " + this.forceY);
	}

	computeVelocity(dt, fX, fY) {
		var forceX = this.mass * fX;
		var forceY = this.mass * fY;
		// print("forceX: " + forceX);
		// print("forceY: " + forceY);

		var accelerationX = forceX / this.mass;
		var accelerationY = forceY / this.mass;

		this.velocityX += accelerationX * dt;
		this.velocityY += accelerationY * dt;

		// print("Velocity X: " + abs(this.velocityX));
		// print("Velocity Y: " + abs(this.velocityY));
	}
	
	dampVelocity() {
		if(this.velocityX > maxSpeed) {
			this.velocityX = maxSpeed;
		}
		if(this.velocityX < -maxSpeed) {
			this.velocityX = -maxSpeed;
		}
		if(this.velocityY > maxSpeed) {
			this.velocityY = maxSpeed;
		}
		if(this.velocityY < -maxSpeed) {
			this.velocityY = -maxSpeed;
		}
	}

	computePosition(dt) {
		this.posX += this.velocityX * dt;
		this.posY += this.velocityY * dt;
		// print("Pos X: " + this.posX);
		// print("Pos Y: " + this.posY);
	}

	computePositionRotation() {
		this.posOffsetX = 20 * cos(this.theta) + this.posX;
		this.posOffsetY = 20 * sin(this.theta) + this.posY;
	}

	calcMult() {
		this.xMult = cos(this.theta);
		this.yMult = sin(this.theta);
	}
}
