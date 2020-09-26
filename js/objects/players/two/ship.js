class PlayerTwoShip {
 constructor(spread, laser, shotgun) {
  this.size = [50, 60]
  this.position = [-100, -100]
  this.speed = 40
  this.activeWeapon = 0
  this.amunition = [spread, laser, shotgun]
  this.health = game.menu.lives
  this.bombs = game.menu.bombs
  this.wallet = 100000
  this.moneyMultipler = 1
  this.inShop = false

  this.shieldTimeout
  this.shieldInterval

  this.movingInterval
  this.shootingInterval

  this.ship = document.createElement('div')
  this.shieldTime = document.createElement('div')
  this.moneyMultiplerTime = document.querySelector('.game .stats .player-stats .player.two div.points p:last-of-type')
  this.livesContainer = document.querySelector('.game .stats .player-stats .player.two .lives p:first-of-type')
  this.moneyContainer = document.querySelector('.game .stats .player-stats .player.two .points p:first-of-type')

  this.changeWeapon = (e) => {
   if (e.keyCode == 49 || e.keyCode == 50 || e.keyCode == 51 || e.keyCode == 52) {
    if (e.keyCode == 49) {
     if (!game.stats.playerTwoAmmunitions[0].classList.contains('empty')) this.activeWeapon = 0
    } else if (e.keyCode == 50) {
     if (!game.stats.playerTwoAmmunitions[1].classList.contains('empty')) this.activeWeapon = 1
    } else if (e.keyCode == 51) {
     if (!game.stats.playerTwoAmmunitions[2].classList.contains('empty')) this.activeWeapon = 2
    } else if (e.keyCode == 52) {
     if (!game.stats.playerTwoAmmunitions[3].classList.contains('empty')) this.activeWeapon = 3
    }
    game.stats.playerTwoAmmunitions.forEach(e => e.classList.remove('active'))
    game.stats.playerTwoAmmunitions[this.activeWeapon].classList.add('active')
   }
  }

  this.checkBullets = (activeBullet) => {
   if (activeBullet >= 0) {
    game.stats.playerTwoAmmunitions[this.activeWeapon].firstElementChild.innerText = --this.amunition[activeBullet]
    if (this.amunition[activeBullet] == 0) {
     game.stats.playerTwoAmmunitions[this.activeWeapon].classList.remove('active')
     game.stats.playerTwoAmmunitions[this.activeWeapon].classList.add('empty')
     this.activeWeapon = 0
     game.stats.playerTwoAmmunitions[this.activeWeapon].classList.add('active')
    }
   }
  }

  this.keydownListener = (e) => {
   this.changeWeapon(e)
   if (!this.pressedKeys.includes(e.keyCode)) {
    this.pressedKeys.push(e.keyCode)
   }
  }

  this.keyupListener = (e) => {
   this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1)
  }
 }
 load() {
  this.create()
 }
 create() {
  this.ship.classList.add('red')
  game.redShipContainer.appendChild(this.ship)
  this.entry()
 }
 entry() {
  this.ship.classList.add('shield')
  this.ship.style.transition = `.8s`
  this.ship.style.transform = `translate(${game.size[0] / 2 + game.size[0] / 4}px, ${game.size[1] * 1.5}px)`
  setTimeout(() => {
   this.ship.style.transform = `translate(${game.size[0] / 2 + game.size[0] / 4}px, ${game.size[1] * .8}px)`
   setTimeout(() => {
    this.ship.style.transition = `.09s linear`
    this.position = [game.size[0] / 2 + game.size[0] / 4, game.size[1] * .8]
    this.move()
    setTimeout(() => {
     this.ship.classList.remove('shield')
    }, 3500);
   }, 1000);
  }, 500);
 }
 move() {
  this.pressedKeys = []
  window.addEventListener('keydown', this.keydownListener)
  window.addEventListener('keyup', this.keyupListener)
  this.movingInterval = setInterval(() => {
   if (this.pressedKeys.includes(87) && this.pressedKeys.includes(65)) {
    this.position[1] -= this.speed
    this.position[0] -= this.speed
   } else if (this.pressedKeys.includes(87) && this.pressedKeys.includes(68)) {
    this.position[1] -= this.speed
    this.position[0] += this.speed
   } else if (this.pressedKeys.includes(83) && this.pressedKeys.includes(65)) {
    this.position[1] += this.speed
    this.position[0] -= this.speed
   } else if (this.pressedKeys.includes(83) && this.pressedKeys.includes(68)) {
    this.position[1] += this.speed
    this.position[0] += this.speed
   } else if (this.pressedKeys.includes(87)) {
    this.position[1] -= this.speed
   } else if (this.pressedKeys.includes(83)) {
    this.position[1] += this.speed
   } else if (this.pressedKeys.includes(68)) {
    this.position[0] += this.speed
   } else if (this.pressedKeys.includes(65)) {
    this.position[0] -= this.speed
   }
   this.ship.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  }, 75);
  this.shootingInterval = setInterval(() => {
   if (this.pressedKeys.includes(32) && this.pressedKeys.includes(65) && this.pressedKeys.includes(83)) {
    this.shoot(this.speed, -this.speed * 2)
   } else if (this.pressedKeys.includes(32) && this.pressedKeys.includes(68) && this.pressedKeys.includes(83)) {
    this.shoot(-this.speed, -this.speed * 2)
   } else if (this.pressedKeys.includes(32) && this.pressedKeys.includes(65)) {
    this.shoot(this.speed, 0)
   } else if (this.pressedKeys.includes(32) && this.pressedKeys.includes(68)) {
    this.shoot(-this.speed, 0)
   } else if (this.pressedKeys.includes(32)) {
    this.shoot(0, -this.speed)
   }
  }, 200);
 }
 shoot(shiftX, shiftY) {
  if (game.stats.playerTwoAmmunitions[this.activeWeapon].firstElementChild.innerText !== "0") {
   if (this.activeWeapon == 0) {
    this.bullet = new Standard(this.position[0] + shiftX + (this.size[0] / 2), this.position[1] + shiftY, '2')
   } else if (this.activeWeapon == 1) {
    this.bullet = new Spread(this.position[0] + (this.size[0] / 2), this.position[1], '2')
   } else if (this.activeWeapon == 2) {
    this.bullet = new Laser(this.position[0] + (this.size[0] / 2), this.position[1] - game.size[1], '2')
   } else if (this.activeWeapon == 3) {
    this.bullet = new Shotgun(this.position[0] + (this.size[0] / 2), this.position[1], '2')
   }
   this.bullet.load()
   this.checkBullets(this.activeWeapon - 1)
  } else {
   this.activeWeapon = 0
  }
 }
 getPoints(money) {
  this.wallet += (money * this.moneyMultipler)
  this.moneyContainer.innerText = this.wallet
 }
 getLoot(loot) {
  if (loot.classList.contains('ammunition')) {
   if (loot.classList.contains('spread')) {
    game.playerTwoAmmoContainers[1].innerText = (this.amunition[0] += 10)
    game.stats.playerTwoAmmunitions[1].classList.remove('empty')
   } else if (loot.classList.contains('laser')) {
    game.playerTwoAmmoContainers[2].innerText = (this.amunition[1] += 10)
    game.stats.playerTwoAmmunitions[2].classList.remove('empty')
   } else if (loot.classList.contains('shotgun')) {
    game.playerTwoAmmoContainers[3].innerText = (this.amunition[2] += 10)
    game.stats.playerTwoAmmunitions[3].classList.remove('empty')
   }
  } else if (loot.classList.contains('bomb')) {
   this.bombs += 3
   game.bombsContainer[1].innerText = this.bombs
  } else if (loot.classList.contains('shield')) {
   this.ship.classList.add('shield')
   this.shieldTime.remove()
   let shieldTime = 15
   this.shieldTime.innerText = shieldTime
   this.ship.appendChild(this.shieldTime)
   clearInterval(this.shieldInterval)
   clearTimeout(this.shieldTimeout)
   this.shieldInterval = setInterval(() => {
    shieldTime--
    this.shieldTime.innerText = shieldTime
    if (!this.ship.classList.contains('shield')) {
     clearInterval(this.shieldInterval)
     this.shieldTime.remove()
    }
   }, 1000);
   this.shieldTimeout = setTimeout(() => {
    this.ship.classList.remove('shield')
   }, 15000);
  } else if (loot.classList.contains('life')) {
   this.health += 3
   game.livesContainer[1].innerText = this.health
  } else if (loot.classList.contains('multi-money')) {
   this.ship.classList.add('money-multipler')
   this.moneyMultiplerTime.remove
   let moneyMultiplerTime = 15
   this.moneyMultiplerTime.innerText = moneyMultiplerTime
   this.moneyMultipler = 2
   this.moneyMultiplerTime.innerHTML = `2x(<span>${moneyMultiplerTime}</span>sec)`
   this.moneyMultiplerTime.style.float = `left`
   this.moneyMultiplerTime.style.paddingRight = `15px`
   clearInterval(this.moneyMultiplerInterval)
   clearTimeout(this.moneyMultiplerTimeout)
   this.moneyMultiplerInterval = setInterval(() => {
    moneyMultiplerTime--
    this.moneyMultiplerTime.innerHTML = `2x(<span>${moneyMultiplerTime}</span>sec)`
    this.moneyMultiplerTime.firstElementChild.style.transform = `scale(1.3)`
    this.moneyMultiplerTime.firstElementChild.style.filter = `drop-shadow(0px 0px 20px white)`
    setTimeout(() => {
     if (this.moneyMultiplerTime.firstElementChild) {
      this.moneyMultiplerTime.firstElementChild.style.transform = `scale(1)`
      this.moneyMultiplerTime.firstElementChild.style.filter = `drop-shadow(0 0 0px white)`
     }
    }, 200);
    if (!this.ship.classList.contains('money-multipler')) {
     clearInterval(this.moneyMultiplerInterval)
     this.moneyMultiplerTime.innerText = ``
    }
   }, 1000);
   this.moneyMultiplerTimeout = setTimeout(() => {
    this.moneyMultipler = 1
    this.ship.classList.remove('money-multipler')
    this.moneyMultiplerTime.style.paddingRight = `0`
   }, 15000);
  } else if (loot.classList.contains('stage-clear')) {
   game.enemies.forEach(e => {
    setTimeout(() => {
     e.destroy()
     e.life.remove()
     this.wallet += (e.worth * this.moneyMultipler)
     this.moneyContainer.innerText = this.wallet
    }, Math.floor(Math.random() * 1000))
   });
   setTimeout(() => {
    game.enemies = []
    game.stages.clearStage()
   }, 1000);
  }
 }
 exitShop() {
  this.pressedKeys = []
  window.addEventListener('keydown', this.keydownListener)
  window.addEventListener('keyup', this.keyupListener)
  this.movingInterval = setInterval(() => {
   if (this.pressedKeys.includes(87) && this.pressedKeys.includes(65)) {
    this.position[1] -= this.speed
    this.position[0] -= this.speed
   } else if (this.pressedKeys.includes(87) && this.pressedKeys.includes(68)) {
    this.position[1] -= this.speed
    this.position[0] += this.speed
   } else if (this.pressedKeys.includes(83) && this.pressedKeys.includes(65)) {
    this.position[1] += this.speed
    this.position[0] -= this.speed
   } else if (this.pressedKeys.includes(83) && this.pressedKeys.includes(68)) {
    this.position[1] += this.speed
    this.position[0] += this.speed
   } else if (this.pressedKeys.includes(87)) {
    this.position[1] -= this.speed
   } else if (this.pressedKeys.includes(83)) {
    this.position[1] += this.speed
   } else if (this.pressedKeys.includes(68)) {
    this.position[0] += this.speed
   } else if (this.pressedKeys.includes(65)) {
    this.position[0] -= this.speed
   }
   this.ship.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  }, 75);
  this.shootingInterval = setInterval(() => {
   if (this.pressedKeys.includes(32) && this.pressedKeys.includes(65) && this.pressedKeys.includes(83)) {
    this.shoot(this.speed, -this.speed * 2)
   } else if (this.pressedKeys.includes(32) && this.pressedKeys.includes(68) && this.pressedKeys.includes(83)) {
    this.shoot(-this.speed, -this.speed * 2)
   } else if (this.pressedKeys.includes(32) && this.pressedKeys.includes(65)) {
    this.shoot(this.speed, 0)
   } else if (this.pressedKeys.includes(32) && this.pressedKeys.includes(68)) {
    this.shoot(-this.speed, 0)
   } else if (this.pressedKeys.includes(32)) {
    this.shoot(0, -this.speed)
   }
  }, 200);
  document.querySelectorAll('.game .stats .players-ammunition .player.two > div').forEach(e => e.classList.remove('inShop'))
  this.ship.style.transition = `.09s linear`
  game.board.style.cursor = 'none'
 }
 destroy() {
  window.removeEventListener('keydown', this.keydownListener)
  window.removeEventListener('keyup', this.keyupListener)
  clearInterval(this.movingInterval)
  clearInterval(this.shootingInterval)
  if (!this.inShop) {
   this.ship.remove()
   this.position = [-100, -100]
   this.health--
   this.livesContainer.innerText = this.health
   if (this.health != 0) {
    this.load()
   } else {
    this.gameover()
   }
  }
 }
 gameover() {
  console.log('gameover')
 }
}