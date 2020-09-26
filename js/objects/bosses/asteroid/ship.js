class Stage1Boss {
 constructor() {
  this.size = [1200, 400]
  this.entryPosition = [0, -800]
  this.currentPosition = [this.entryPosition[0], this.entryPosition[1]]
  this.worth = 5000

  this.maxHealth = 250
  this.currentHelth = this.maxHealth

  this.entryInterval

  this.ship = document.createElement('div')
 }
 load(i, j) {
  this.create(i, j)
 }
 create(i, j) {
  this.ship.classList.add('boss', 'asteroid')
  this.ship.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px)`
  game.enemiesContainer.appendChild(this.ship)
  game.bosshealth.firstElementChild.innerText = this.currentHelth
  game.bosshealth.style.top = '20px'
  game.bosshealth.firstElementChild.style.width = `${(this.currentHelth / this.maxHealth) * 100}%`
  setTimeout(() => {
   this.entry()
   this.shoot()
  }, 300 * (i + j + Math.floor(Math.random() * 5)));
 }
 entry() {
  this.fivePercentPosition = [this.entryPosition[0] / 20, this.entryPosition[1] / 20]
  this.entryInterval = setInterval(() => {
   this.currentPosition = [this.entryPosition[0] + this.ship.offsetLeft, this.entryPosition[1] + this.ship.offsetTop]
   this.entryPosition[0] -= this.fivePercentPosition[0]
   this.entryPosition[1] -= this.fivePercentPosition[1]
   this.ship.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px)`
   if (this.entryPosition[1].toFixed(0) == -200) {
    this.entryPosition[0] = Number(this.entryPosition[0].toFixed(0))
    this.entryPosition[1] = Number(this.entryPosition[1].toFixed(0))
    this.currentPosition = [this.entryPosition[0] + this.ship.offsetLeft, this.entryPosition[1] + this.ship.offsetTop]
    this.ship.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px)`
    clearInterval(this.entryInterval)
    // this.move()
   }
  }, 400);
 }
 shoot() {

 }
 hit() {
  game.bosshealth.firstElementChild.innerText = this.currentHelth
  game.bosshealth.firstElementChild.style.width = `${(this.currentHelth / this.maxHealth) * 100}%`
 }
 destroy() {
  clearInterval(this.entryInterval)
  this.ship.remove()
  game.bosshealth.style.top = `-200px`
 }
}