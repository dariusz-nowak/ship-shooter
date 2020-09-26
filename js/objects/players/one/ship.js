class PlayerOneShip {
 constructor(spread, laser, shotgun) {
  this.size = [50, 60]
  this.position = [-100, -100]
  this.activeWeapon = 0
  this.amunition = [spread, laser, shotgun]
  this.health = game.menu.lives
  this.bombs = game.menu.bombs
  this.wallet = 100000
  this.moneyMultipler = 1
  this.inShop = false

  this.shieldTimeout
  this.shieldInterval

  this.ship = document.createElement('div')
  this.shieldTime = document.createElement('div')
  this.moneyMultiplerTime = document.querySelector('.game .stats .player-stats .player.one div.points p:last-of-type')
  this.livesContainer = document.querySelector('.game .stats .player-stats .player.one .lives p:first-of-type')
  this.moneyContainer = document.querySelector('.game .stats .player-stats .player.one .points p:first-of-type')

  this.moving = e => {
   this.position[0] = e.clientX - (this.size[0] / 2)
   this.position[1] = e.clientY - (this.size[1] / 2)
   this.ship.style.transform = `translate(${this.position[0]}px, ${this.position[1]}px)`
  }

  this.changeWeapon = (e) => {
   if (e.deltaY < 0) {
    this.activeWeapon--
    if (this.activeWeapon == -1) {
     this.activeWeapon = 3
    }
    if (game.stats.playerOneAmmunitions[this.activeWeapon].classList.contains('empty')) {
     do {
      this.activeWeapon--
      if (this.activeWeapon == -1) {
       this.activeWeapon = 3
      }
     } while (game.stats.playerOneAmmunitions[this.activeWeapon].classList.contains('empty'))
    }
    game.stats.playerOneAmmunitions.forEach(e => e.classList.remove('active'))
    game.stats.playerOneAmmunitions[this.activeWeapon].classList.add('active')
   } else {
    this.activeWeapon++
    if (this.activeWeapon == 4) {
     this.activeWeapon = 0
    }
    if (game.stats.playerOneAmmunitions[this.activeWeapon].classList.contains('empty')) {
     do {
      this.activeWeapon++
      if (this.activeWeapon == 4) {
       this.activeWeapon = 0
      }
     } while (game.stats.playerOneAmmunitions[this.activeWeapon].classList.contains('empty'))
    }
    game.stats.playerOneAmmunitions.forEach(e => e.classList.remove('active'))
    game.stats.playerOneAmmunitions[this.activeWeapon].classList.add('active')
   }
  }

  this.checkBullets = (activeBullet) => {
   if (activeBullet >= 0) {
    game.stats.playerOneAmmunitions[this.activeWeapon].firstElementChild.innerText = --this.amunition[activeBullet]
    if (this.amunition[activeBullet] == 0) {
     game.stats.playerOneAmmunitions[this.activeWeapon].classList.remove('active')
     game.stats.playerOneAmmunitions[this.activeWeapon].classList.add('empty')
     this.activeWeapon = 0
     game.stats.playerOneAmmunitions[this.activeWeapon].classList.add('active')
    }
   }
  }

  this.checkShootingAvaiability = () => {
   this.autoShooting = !this.autoShooting
  }
 }
 load() {
  this.ship.classList.add('money-multipler')
  this.create()
 }
 create() {
  this.ship.classList.add('gray')
  game.grayShipContainer.appendChild(this.ship)
  this.entry()
 }
 entry() {
  this.ship.classList.add('shield')
  this.ship.style.transition = `.8s`
  this.ship.style.transform = `translate(${game.size[0] / 4}px, ${game.size[1] * 1.5}px)`
  setTimeout(() => {
   this.ship.style.transform = `translate(${game.size[0] / 4}px, ${game.size[1] * .8}px)`
   setTimeout(() => {
    this.ship.style.transition = `0s`
    this.move()
    this.shoot()
    window.addEventListener("wheel", this.changeWeapon)
    setTimeout(() => {
     this.ship.classList.remove('shield')
    }, 3500);
   }, 1000);
  }, 500);
 }
 move() {
  game.board.addEventListener('mousemove', this.moving)
 }
 shoot() {
  this.autoShooting = false
  window.addEventListener('mousedown', this.checkShootingAvaiability)
  window.addEventListener('mouseup', this.checkShootingAvaiability)
  this.shootingInterval = setInterval(() => {
   if (this.autoShooting == true) {
    if (this.activeWeapon == 0) {
     this.bullet = new Standard(this.position[0] + (this.size[0] / 2), this.position[1], '1')
    } else if (this.activeWeapon == 1) {
     this.bullet = new Spread(this.position[0] + (this.size[0] / 2), this.position[1], '1')
    } else if (this.activeWeapon == 2) {
     this.bullet = new Laser(this.position[0] + (this.size[0] / 2), this.position[1] - game.size[1], '1')
    } else if (this.activeWeapon == 3) {
     this.bullet = new Shotgun(this.position[0] + (this.size[0] / 2), this.position[1], '1')
    }
    this.bullet.load()
    this.checkBullets(this.activeWeapon - 1)
   }
  }, 200);
 }
 getPoints(money) {
  this.wallet += (money * this.moneyMultipler)
  this.moneyContainer.innerText = this.wallet
 }
 getLoot(loot) {
  if (loot.classList.contains('ammunition')) {
   if (loot.classList.contains('spread')) {
    game.playerOneAmmoContainers[1].innerText = (this.amunition[0] += 10)
    game.stats.playerOneAmmunitions[1].classList.remove('empty')
   } else if (loot.classList.contains('laser')) {
    game.playerOneAmmoContainers[2].innerText = (this.amunition[1] += 10)
    game.stats.playerOneAmmunitions[2].classList.remove('empty')
   } else if (loot.classList.contains('shotgun')) {
    game.playerOneAmmoContainers[3].innerText = (this.amunition[2] += 10)
    game.stats.playerOneAmmunitions[3].classList.remove('empty')
   }
  } else if (loot.classList.contains('bomb')) {
   this.bombs += 3
   game.bombsContainer[0].innerText = this.bombs
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
   game.livesContainer[0].innerText = this.health
  } else if (loot.classList.contains('multi-money')) {
   this.ship.classList.add('money-multipler')
   this.moneyMultiplerTime.remove
   let moneyMultiplerTime = 15
   this.moneyMultiplerTime.innerText = moneyMultiplerTime
   this.moneyMultipler = 2
   this.moneyMultiplerTime.innerHTML = `2x(<span>${moneyMultiplerTime}</span>sec)`
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
  game.board.addEventListener('mousemove', this.moving)
  window.addEventListener('mousedown', this.checkShootingAvaiability)
  window.addEventListener('mouseup', this.checkShootingAvaiability)
  window.addEventListener("wheel", this.changeWeapon)
  this.shootingInterval = setInterval(() => {
   if (this.autoShooting == true) {
    if (this.activeWeapon == 0) {
     this.bullet = new Standard(this.position[0] + (this.size[0] / 2), this.position[1], '1')
    } else if (this.activeWeapon == 1) {
     this.bullet = new Spread(this.position[0] + (this.size[0] / 2), this.position[1], '1')
    } else if (this.activeWeapon == 2) {
     this.bullet = new Laser(this.position[0] + (this.size[0] / 2), this.position[1] - game.size[1], '1')
    } else if (this.activeWeapon == 3) {
     this.bullet = new Shotgun(this.position[0] + (this.size[0] / 2), this.position[1], '1')
    }
    this.bullet.load()
    this.checkBullets(this.activeWeapon - 1)
   }
  }, 200);
  document.querySelectorAll('.game .stats .players-ammunition .player.one > div').forEach(e => e.classList.remove('inShop'))
  this.ship.style.transition = '0s'
  game.board.style.cursor = 'none'
 }
 destroy() {
  game.board.removeEventListener('mousemove', this.moving)
  window.removeEventListener('mousedown', this.checkShootingAvaiability)
  window.removeEventListener('mouseup', this.checkShootingAvaiability)
  window.removeEventListener("wheel", this.changeWeapon)
  clearInterval(this.shootingInterval)
  if (!this.inShop) {
   this.position = [-100, -100]
   this.ship.remove()
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