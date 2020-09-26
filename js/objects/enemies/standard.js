class StandardEnemy {
 constructor() {
  this.size = [60, 45]
  this.entryPosition = [Math.floor(Math.random() * (game.size[0] + 1000)) - 500, -500]
  this.currentPosition = [this.entryPosition[0], this.entryPosition[1]]
  this.worth = 150

  this.maxHealth = 2
  this.currentHelth = this.maxHealth

  this.entryInterval
  this.shootingInteral
  this.explosionInterval

  this.ship = document.createElement('div')
  this.life = document.createElement('div')
  this.explosion = document.createElement('div')
 }
 load(i, j) {
  this.create(i, j)
 }
 create(i, j) {
  this.ship.classList.add('normal')
  this.ship.style.backgroundImage = `url('img/enemies/standard/${Math.floor((Math.random() * 200) + 1)}.png')`
  this.ship.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg) grayscale(${Math.floor(Math.random() * 50)}%`
  this.ship.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px) rotate(180deg) scale(1.1)`
  this.life.classList.add('life')
  this.ship.appendChild(this.life)
  game.enemiesContainer.appendChild(this.ship)
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
   this.ship.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px) rotate(180deg) scale(1.1)`
   if (this.entryPosition[0].toFixed(0) == 0 && this.entryPosition[1].toFixed(0) == 0) {
    this.entryPosition[0] = Number(this.entryPosition[0].toFixed(0))
    this.entryPosition[1] = Number(this.entryPosition[1].toFixed(0))
    this.currentPosition = [this.entryPosition[0] + this.ship.offsetLeft, this.entryPosition[1] + this.ship.offsetTop]
    this.ship.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px) rotate(180deg) scale(1.1)`
    clearInterval(this.entryInterval)
    this.move()
   }
  }, 200);
 }
 move() {

 }
 shoot() {
  this.shootingInteral = setInterval(() => {
   if (this.ship.classList.contains('destroyed')) clearInterval(this.shootingInteral)
   else if (Math.random() * 100 < 5) {
    let bullet = new StandardEnemyBullet(this.currentPosition[0], this.size, this.currentPosition[1])
    bullet.load()
   }
  }, (Math.random() * 1000) + 500)
 }
 hit() {
  this.life.style.width = `${(this.currentHelth / this.maxHealth) * 100}%`
 }
 destroy() {
  this.explosion.classList.add('explosion')
  this.ship.appendChild(this.explosion)
  let explosionPositionX = 0
  this.explosionInterval = setInterval(() => {
   this.explosion.style.backgroundPositionX = `${explosionPositionX -= 60}px`
   if (explosionPositionX == -720) {
    clearInterval(this.explosionInterval)
    this.explosion.remove()
   }
  }, 50);
  clearInterval(this.entryInterval)
  clearInterval(this.shootingInteral)
  this.ship.classList.add('destroyed')
  if ((Math.random() * 100) < 15) {
   let chance = Math.floor(Math.random() * 100)
   let loot
   if (chance <= 50) {
    loot = new AmmoLoot(this.currentPosition[0] + (this.size[0] / 2), this.currentPosition[1])
   } else if (chance <= 65) {
    loot = new BombLoot(this.currentPosition[0] + (this.size[0] / 2), this.currentPosition[1])
   } else if (chance <= 80) {
    loot = new ShieldLoot(this.currentPosition[0] + (this.size[0] / 2), this.currentPosition[1])
   } else if (chance <= 90) {
    loot = new LifeLoot(this.currentPosition[0] + (this.size[0] / 2), this.currentPosition[1])
   } else if (chance <= 96) {
    loot = new MultiMoneyLoot(this.currentPosition[0] + (this.size[0] / 2), this.currentPosition[1])
   } else if (chance <= 100) {
    loot = new StageClearLoot(this.currentPosition[0] + (this.size[0] / 2), this.currentPosition[1])
   }
   loot.load()
  }
 }
}