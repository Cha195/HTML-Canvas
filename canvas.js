var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
// c.beginPath();
// c.arc(200,200,50,0,Math.PI*2,false);
// c.stroke();

function Circle(x, y, rad, dx, dy) {
    this.x = x ;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        c.stroke();
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
    }
}
var circleArray = [];
for(i=0; i<100; i++) {
    circleArray.push(new Circle(Math.random()*(innerWidth-100)+50, Math.random()*(innerHeight-100)+50, 50, (Math.random()-0.5)*4, (Math.random()-0.5)*4));
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();