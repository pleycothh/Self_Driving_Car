// sensor is not subclass of the car, but sensor require car exist to create
// this is another idea of create subclass, not using inheritance, but method binding.
class Sensor {
  constructor(car) {
    this.car = car
    this.rayCount = 5
    this.rayLength = 150
    this.raySpread = Math.PI / 2

    this.rays = []
    this.readings = []
  }

  update(roadBorders) {
    // private method
    this.#castRays()
    this.readings = []

    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rayLength[i], roadBorders))
    }
  }

  #getReading(rayLength, roadBorders) {
    console.log(rayLength)
  }

  #castRays() {
    this.rays = []
    for (let i = 0; i < this.rayLength; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          // i / (this.rayCount - 1)
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1),
        ) + this.car.angle

      const start = { x: this.car.x, y: this.car.y }
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      }

      this.rays.push([start, end])
    }
  }

  draw(ctx) {
    //console.log(ctx);
    for (let i = 0; i < this.rayCount; i++) {
      //  if(this.rays[i] != undefined){
      // console.log(this.rays[i])
      let end = this.rays[i][1]

      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'yellow'
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
      //   }
    }
  }
}
