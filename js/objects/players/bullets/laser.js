class Laser {
 constructor(x, y, player) {
  this.size = [50, game.size[1]]
  this.position = [x - (this.size[0] / 2), y]
  this.positionShift = [-75, 0]

  this.movingInterval

  this.bullet = document.createElement('div')
  this.bulletOwner = player
 }
 load() {
  this.create()
 }
 create() {
  this.bullet.classList.add('laser')
  game.playerBulletsContainer.appendChild(this.bullet)
  this.bullet.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  this.move()
 }
 move() {
  this.movingInterval = setInterval(() => {
   this.hit()
   this.bullet.style.backgroundPosition = `${this.positionShift[0]}px ${this.positionShift[1]}px`
   this.positionShift[0] -= 200
   if (this.positionShift[0] == -875) {
    if (this.positionShift[1] == -1850) {
     this.destroy()
    }
    this.positionShift[0] = -75
    this.positionShift[1] -= 925
   }
  }, 50);
 }
 hit() {
  for (let i = 0; i < game.enemies.length; i++) {
   if (this.position[0] + (this.size[0] * .75) > game.enemies[i].currentPosition[0] && this.position[0] < game.enemies[i].currentPosition[0] + game.enemies[i].size[0] - (this.size[0] * .25) && this.position[1] + this.size[1] > game.enemies[i].currentPosition[1] && this.position[1] < game.enemies[i].currentPosition[1] + game.enemies[i].size[1] && !game.enemies[i].ship.classList.contains('destroyed')) {
    game.enemies[i].currentHelth--
    game.enemies[i].hit()
    if (game.enemies[i].currentHelth == 0) {
     game[`ship${this.bulletOwner}`].getPoints(game.enemies[i].worth)
     game.enemies[i].destroy()
     game.enemies.splice(i, 1)
     if (game.enemies.length == 0) {
      game.stages.clearStage()
     }
    }
   }
  }
 }
 destroy() {
  this.bullet.remove()
  clearInterval(this.movingInterval)
 }
}