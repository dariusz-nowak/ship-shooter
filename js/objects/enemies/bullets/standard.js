class StandardEnemyBullet {
 constructor(x, enemySize, y) {
  this.size = [25, 25]
  this.position = [x + (enemySize[0] / 2) - (this.size[0] / 2), y + enemySize[1]]
  this.bullet = document.createElement('div')

  this.movingInterval
 }
 load() {
  this.create()
 }
 create() {
  this.bullet.classList.add('standard')
  this.bullet.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  game.enemiesBulletsContainer.appendChild(this.bullet)
  this.move()
 }
 move() {
  this.movingInterval = setInterval(() => {
   this.position[1] += this.size[1]
   this.bullet.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
   for (let i = 1; i <= game.menu.players; i++) {
    if (this.position[0] < game[`ship${i}`].position[0] + (game[`ship${i}`].size[0] * .85) && this.position[0] > game[`ship${i}`].position[0] - this.size[0] + (game[`ship${i}`].size[0] * .15) && this.position[1] < game[`ship${i}`].position[1] + this.size[1] && this.position[1] > game[`ship${i}`].position[1] - (game[`ship${i}`].size[1] / 2) + this.size[1] && !game[`ship${i}`].ship.classList.contains('shield')) {
     this.hit(i)
    }
   }
   if (this.position[1] > game.size[1]) {
    this.destroy()
   }
  }, 100);
 }
 hit(i) {
  this.destroy()
  game[`ship${i}`].destroy()
 }
 destroy() {
  this.bullet.remove()
  clearInterval(this.movingInterval)
 }
}