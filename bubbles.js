var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRad = 40;

colorArray = [
    '#000000',
    '#52057b',
    '#892cdc',
    '#bc6ff1',
    '#150485',
]

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, rad, dx, dy) {    this.x = x ;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;
    this.minRad = rad;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        c.stroke();
        c.fillStyle = this.color
        c.strokeStyle = this.color
        c.fill();
    }
    this.update = function() {
        this.draw();
        if(this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx
        }
        if(this.y + this.rad > window.innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy
        }
        this.x+=this.dx;
        this.y+=this.dy;

        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50 && this.rad <40) {
            this.rad += 1;
        }
        else if(this.rad > this.minRad) {
            this.rad -= 1;
        }
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for(i=0; i<800; i++)
        circleArray.push(new Circle(Math.random()*(innerWidth-100)+50, Math.random()*(innerHeight-100)+50, Math.floor(Math.random()*5)+1, (Math.random()-0.5)*4, (Math.random()-0.5)*4));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();