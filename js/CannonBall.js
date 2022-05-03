var r;
var speed;
var body;
var image, animation
var trajectory;
var isSink;

class CannonBall {

  constructor(x, y) {
    var options = {
      isStatic: true
    };

    this.r = 30;
    this.speed = 0.05;  //  INICIALIZAR speed EN 0.05
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.animation = [this.image];
    this.trajectory = [];
    this.isSink = false;
    World.add(world, this.body);
  }

  //  CREAR MÉTODO animate()
  animate() {
    this.speed += 0.05;
  }

  remove(index) {
    this.isSink = true; // CAMBIAR isSink A VERDADERO
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    //  configuración de la animación de salpicadura de la bala
    this.animation = waterSplashAnimation;
    this.speed = 0.05;
    this.r = 150;
    
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete balls[index];
    }, 1000);
  }

  shoot() {
    var newAngle = cannon.angle - 28;
    newAngle = newAngle * (3.14 / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)
    });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    //  CALCULAR ÍNCIDE PARA LAS ANIMACIONES DE LAS BALAS
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    //  REEMPLAZAR image POR animation[index]
    //image(this.image, 0, 0, this.r, this.r);
    image(this.animation[index], 0, 0, this.r, this.r);
    pop();

    //  AGREGAR CONDICIÓN PARA !this.isSink
    if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }

}
