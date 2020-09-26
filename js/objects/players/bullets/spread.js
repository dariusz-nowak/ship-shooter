class Spread {
 constructor(x, y, player) {
  this.size = [30, 30]
  this.position = [
   [x - (this.size[0] / 2), y],
   [x - (this.size[0] / 2), y],
   [x - (this.size[0] / 2), y]
  ]

  this.movingInterval = []

  this.bullet = [document.createElement('div'), document.createElement('div'), document.createElement('div')]
  this.bulletOwner = player
 }
 load() {
  let spreadShift = [-15, 0, 15]
  for (let i = 0; i < spreadShift.length; i++) {
   this.create(spreadShift[i], i)
  }
 }
 create(shift, i) {
  this.bullet[i].classList.add('spread')
  game.playerBulletsContainer.appendChild(this.bullet[i])
  this.bullet[i].style.transform = `translate(${this.position[i][0]}px, ${this.position[i][1]}px)`
  this.move(shift, i)
 }
 move(shift, i) {
  this.movingInterval[i] = setInterval(() => {
   this.position[i][1] -= this.size[1]
   this.position[i][0] -= shift
   this.hit(i)
   this.bullet[i].style.transform = `translate(${this.position[i][0]}px, ${this.position[i][1]}px)`
   if (this.position[i][1] < 0 - this.size[1] || this.position[i][0] < 0 || this.position[i][0] > game.size[0]) {
    this.bullet[i].remove()
    clearInterval(this.movingInterval[i])
   }
  }, 25);
 }
 hit(j) {
  for (let i = 0; i < game.enemies.length; i++) {
   if (this.position[j][0] + (this.size[0] * .75) > game.enemies[i].currentPosition[0] && this.position[j][0] < game.enemies[i].currentPosition[0] + game.enemies[i].size[0] - (this.size[0] * .25) && this.position[j][1] + this.size[1] > game.enemies[i].currentPosition[1] && this.position[j][1] < game.enemies[i].currentPosition[1] + game.enemies[i].size[1] && !game.enemies[i].ship.classList.contains('destroyed')) {
    game.enemies[i].currentHelth--
    game.enemies[i].hit()
    this.destroy(j)
    if (game.enemies[i].currentHelth == 0) {
     game[`ship${this.bulletOwner}`].getPoints(game.enemies[i].worth)
     game.enemies[i].destroy(j)
     game.enemies.splice(i, 1)
     if (game.enemies.length == 0) {
      game.stages.clearStage()
     }
    }
   }
  }
 }
 destroy(j) {
  this.bullet[j].remove()
  clearInterval(this.movingInterval[j])
 }
}