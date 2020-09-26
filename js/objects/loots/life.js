class LifeLoot {
 constructor(x, y) {
  this.size = [75, 20]
  this.position = [x - (this.size[0] / 2), y]

  this.loot = document.createElement('div')

  this.movingInterval
 }
 load() {
  this.create()
 }
 create() {
  this.loot.classList.add('life')
  this.loot.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  game.lootsContainer.appendChild(this.loot)
  setTimeout(() => {
   this.move()
  }, 100);
 }
 move() {
  this.position[1] += this.size[1]
  this.loot.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  this.movingInterval = setInterval(() => {
   this.position[1] += this.size[1]
   this.loot.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
   for (let i = 1; i <= game.menu.players; i++) {
    if (this.position[0] < game[`ship${i}`].position[0] + (game[`ship${i}`].size[0] * .85) && this.position[0] > game[`ship${i}`].position[0] - this.size[0] + (game[`ship${i}`].size[0] * .15) && this.position[1] < game[`ship${i}`].position[1] + this.size[1] && this.position[1] > game[`ship${i}`].position[1] - (game[`ship${i}`].size[1] / 2) + this.size[1]) {
     this.take(i)
     this.destroy()
    }
   }
   if (this.position[1] > game.size[1] + this.size[1]) {
    this.destroy()
   }
  }, 100);
 }
 take(i) {
  game[`ship${i}`].getLoot(this.loot)
 }
 destroy() {
  clearInterval(this.movingInterval)
  this.loot.remove()
 }
}