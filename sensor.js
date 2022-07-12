class Sensor {
  constructor(car) {
    this.car = car
    this.rayCount = 5
    this.rayLength = 150
    this.raySpread = Math.PI / 2

    this.rays = []
    this.readings = []
  }

  update() {
    this.rays = []
    for (let i = 0; i < this.rayLength; i++) {
      const rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        i / (this.rayCount - 1),
      )

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
