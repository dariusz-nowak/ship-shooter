class Standard {
 constructor(x, y, player) {
  this.size = [30, 50]
  this.position = [x - (this.size[0] / 2), y]
  this.bullet = document.createElement('div')
  this.bulletOwner = player

  this.movingInterval
 }
 load() {
  this.create()
 }
 create() {
  this.bullet.classList.add('standard')
  game.playerBulletsContainer.appendChild(this.bullet)
  this.bullet.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  this.move()
 }
 move() {
  this.movingInterval = setInterval(() => {
   this.position[1] -= this.size[1]
   this.bullet.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
   this.hit()
   if (this.position[1] < 0 - this.size[1]) {
    this.destroy()
   }
  }, 25);
 }
 hit() {
  for (let i = 0; i < game.enemies.length; i++) {
   if (this.position[0] + (this.size[0] * .75) > game.enemies[i].currentPosition[0] && this.position[0] < game.enemies[i].currentPosition[0] + game.enemies[i].size[0] - (this.size[0] * .25) && this.position[1] + this.size[1] > game.enemies[i].currentPosition[1] && this.position[1] < game.enemies[i].currentPosition[1] + game.enemies[i].size[1] && !game.enemies[i].ship.classList.contains('destroyed')) {
    game.enemies[i].currentHelth--
    game.enemies[i].hit()
    this.destroy()
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