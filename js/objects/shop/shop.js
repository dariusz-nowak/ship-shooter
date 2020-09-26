class Shop {
 constructor() {
  this.size = [250, 250]
  this.entryPosition = [0, -500]
  this.currentPosition = []

  this.entryInterval

  this.shop = document.createElement('div')
  this.offer = document.createElement('div')
  this.ammo = [document.createElement('div'), document.createElement('div'), document.createElement('div')]
  this.life = document.createElement('div')
  this.bomb = document.createElement('div')
  this.exit = document.createElement('div')



  this.playerOneMovingListener = (e) => {
   game.ship1.position[1] = e.clientY - (game.ship1.size[1] / 2)
   if (game.ship1.position[1] < 380) {
    game.ship1.ship.style.transform = `translate(${game.ship1.position[0]}px, 330px) rotate(90deg)`
   } else if (game.ship1.position[1] > 380 && game.ship1.position[1] < 480) {
    game.ship1.ship.style.transform = `translate(${game.ship1.position[0]}px, 430px) rotate(90deg)`
   } else if (game.ship1.position[1] > 480 && game.ship1.position[1] < 580) {
    game.ship1.ship.style.transform = `translate(${game.ship1.position[0]}px, 530px) rotate(90deg)`
   } else if (game.ship1.position[1] > 580 && game.ship1.position[1] < 680) {
    game.ship1.ship.style.transform = `translate(${game.ship1.position[0]}px, 630px) rotate(90deg)`
   } else if (game.ship1.position[1] > 680 && game.ship1.position[1] < 780) {
    game.ship1.ship.style.transform = `translate(${game.ship1.position[0]}px, 730px) rotate(90deg)`
   } else if (game.ship1.position[1] > 780) {
    game.ship1.ship.style.transform = `translate(${game.ship1.position[0]}px, 830px) rotate(90deg)`
   }
  }
  this.playerOneBuyListener = () => {
   if (game.ship1.position[1] < 380) {
    if (game.ship1.wallet >= 500) {
     game.ship1.wallet -= 500
     game.ship1.amunition[0] += 15
     game.playerOneAmmoContainers[1].innerText = `${game.ship1.amunition[0]}`
    }
   } else if (game.ship1.position[1] > 380 && game.ship1.position[1] < 480) {
    if (game.ship1.wallet >= 2500) {
     game.ship1.wallet -= 2500
     game.ship1.amunition[1] += 15
     game.playerOneAmmoContainers[2].innerText = `${game.ship1.amunition[1]}`
    }
   } else if (game.ship1.position[1] > 480 && game.ship1.position[1] < 580) {
    if (game.ship1.wallet >= 1000) {
     game.ship1.wallet -= 1000
     game.ship1.amunition[2] += 15
     game.playerOneAmmoContainers[3].innerText = `${game.ship1.amunition[2]}`
    }
   } else if (game.ship1.position[1] > 580 && game.ship1.position[1] < 680) {
    if (game.ship1.wallet >= 5000) {
     game.ship1.wallet -= 5000
     game.ship1.health += 5
     game.livesContainer[0].innerText = game.ship1.health
    }
   } else if (game.ship1.position[1] > 680 && game.ship1.position[1] < 780) {
    if (game.ship1.wallet >= 10000) {
     game.ship1.wallet -= 5000
     game.ship1.bombs += 3
     game.bombsContainer[0].innerText = game.ship1.bombs
    }
   } else if (game.ship1.position[1] > 780) {
    game.ship1.inShop = false
    this.clearPlayerOneListeners()
    if (game.ship1.inShop == false && game.ship2.inShop == false) {
     this.exitShop()
     game.ship1.exitShop()
     if (game.menu.players == 2) game.ship2.exitShop()
    }
   }
   game.ship1.moneyContainer.innerText = game.ship1.wallet
  }
  this.playerTwoCurrentPosition
  this.playerTwoListener = (e) => {
   if (e.keyCode == 87 && this.playerTwoCurrentPosition > 0) {
    this.playerTwoCurrentPosition--
   } else if (e.keyCode == 83 && this.playerTwoCurrentPosition < 5) {
    this.playerTwoCurrentPosition++
   } else if (e.keyCode == 32) {
    if (this.playerTwoCurrentPosition == 0) {
     if (game.ship2.wallet >= 500) {
      game.ship2.wallet -= 500
      game.ship2.amunition[0] += 15
      game.playerTwoAmmoContainers[1].innerText = `${game.ship2.amunition[0]}`
     }
    } else if (this.playerTwoCurrentPosition == 1) {
     if (game.ship2.wallet >= 2500) {
      game.ship2.wallet -= 2500
      game.ship2.amunition[1] += 15
      game.playerTwoAmmoContainers[2].innerText = `${game.ship2.amunition[1]}`
     }
    } else if (this.playerTwoCurrentPosition == 2) {
     if (game.ship2.wallet >= 1000) {
      game.ship2.wallet -= 1000
      game.ship2.amunition[2] += 15
      game.playerTwoAmmoContainers[3].innerText = `${game.ship2.amunition[2]}`
     }
    } else if (this.playerTwoCurrentPosition == 3) {
     if (game.ship2.wallet >= 5000) {
      game.ship2.wallet -= 5000
      game.ship2.health += 5
      game.livesContainer[1].innerText = game.ship2.health
     }
    } else if (this.playerTwoCurrentPosition == 4) {
     if (game.ship2.wallet >= 10000) {
      game.ship2.wallet -= 5000
      game.ship2.bombs += 3
      game.bombsContainer[1].innerText = game.ship2.bombs
     }
    } else if (this.playerTwoCurrentPosition == 5) {
     game.ship2.inShop = false
     this.clearPlayerTwoListeners()
     if (game.ship1.inShop == false && game.ship2.inShop == false) {
      this.exitShop()
      game.ship1.exitShop()
      if (game.menu.players == 2) game.ship2.exitShop()
     }
    }
    game.ship2.moneyContainer.innerText = game.ship2.wallet
   }
   if (this.playerTwoCurrentPosition == 0) {
    game.ship2.ship.style.transform = `translate(${game.ship2.position[0]}px, 330px) rotate(-90deg)`
   } else if (this.playerTwoCurrentPosition == 1) {
    game.ship2.ship.style.transform = `translate(${game.ship2.position[0]}px, 430px) rotate(-90deg)`
   } else if (this.playerTwoCurrentPosition == 2) {
    game.ship2.ship.style.transform = `translate(${game.ship2.position[0]}px, 530px) rotate(-90deg)`
   } else if (this.playerTwoCurrentPosition == 3) {
    game.ship2.ship.style.transform = `translate(${game.ship2.position[0]}px, 630px) rotate(-90deg)`
   } else if (this.playerTwoCurrentPosition == 4) {
    game.ship2.ship.style.transform = `translate(${game.ship2.position[0]}px, 730px) rotate(-90deg)`
   } else if (this.playerTwoCurrentPosition == 5) {
    game.ship2.ship.style.transform = `translate(${game.ship2.position[0]}px, 830px) rotate(-90deg)`
   }
  }
 }
 load() {
  this.create()
 }
 create() {
  this.shop.classList.add('shop')
  this.shop.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px)`
  game.enemiesContainer.appendChild(this.shop)
  this.entry()
 }
 entry() {
  this.fivePercentPosition = [this.entryPosition[0] / 20, this.entryPosition[1] / 20]
  this.entryInterval = setInterval(() => {
   this.currentPosition = [this.entryPosition[0] + this.shop.offsetLeft, this.entryPosition[1] + this.shop.offsetTop]
   this.entryPosition[0] -= this.fivePercentPosition[0]
   this.entryPosition[1] -= this.fivePercentPosition[1]
   this.shop.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px)`
   if (this.entryPosition[0].toFixed(0) == 0 && this.entryPosition[1].toFixed(0) == 0) {
    this.entryPosition[0] = Number(this.entryPosition[0].toFixed(0))
    this.entryPosition[1] = Number(this.entryPosition[1].toFixed(0))
    this.currentPosition = [this.entryPosition[0] + this.shop.offsetLeft, this.entryPosition[1] + this.shop.offsetTop]
    this.shop.style.transform = `translate(${this.entryPosition[0]}px, ${this.entryPosition[1]}px)`
    clearInterval(this.entryInterval)
    setTimeout(() => {
     this.showOffer()
    }, 200);
   }
  }, 200);
 }
 showOffer() {
  this.offer.classList.add('offer')
  this.shop.appendChild(this.offer)
  this.ammo.forEach(e => this.offer.appendChild(e))
  this.offer.appendChild(this.life)
  this.offer.appendChild(this.bomb)
  this.offer.appendChild(this.exit)
  this.ammo[0].innerHTML = `<p>Spread x15 || <span>500</span></p>`
  this.ammo[1].innerHTML = `<p>Laser x15 || <span>2500</span></p>`
  this.ammo[2].innerHTML = `<p>Shotgun x15 || <span>1000</span></p>`
  this.life.innerHTML = `<p>Life x5 || <span>5000</span></p>`
  this.bomb.innerHTML = `<p>Bomb x3 || <span>10000</span></p>`
  this.exit.innerHTML = `<p>Exit</p>`
  document.querySelectorAll('.game .stats .players-ammunition .player.one > div').forEach(e => e.classList.add('inShop'))
  if (game.menu.players == 2) {
   document.querySelectorAll('.game .stats .players-ammunition .player.two > div').forEach(e => e.classList.add('inShop'))
  }
  setTimeout(() => {
   this.offer.style.height = '600px'
   this.offer.style.border = '0px solid white'
  }, 100);
  setTimeout(() => {
   this.offer.style.width = '600px'
   this.moveShips()
  }, 900);
 }
 moveShips() {
  game.ship1.inShop = true
  game.ship1.destroy()
  game.ship1.ship.style.transition = `.4s linear`
  game.ship1.position[0] = (game.size[0] / 2) - 350
  game.board.style.cursor = 'default'
  window.addEventListener('mousemove', this.playerOneMovingListener)
  window.addEventListener('click', this.playerOneBuyListener)
  if (game.menu.players == 2) {
   game.ship2.inShop = true
   game.ship2.destroy()
   game.ship2.ship.style.transition = `.4s linear`
   game.ship2.position[0] = (game.size[0] / 2) + 300
   game.board.style.cursor = 'default'
   this.playerTwoCurrentPosition = 0
   window.addEventListener('keydown', this.playerTwoListener)
  }
 }
 clearPlayerOneListeners() {
  window.removeEventListener('mousemove', this.playerOneMovingListener)
  window.removeEventListener('click', this.playerOneBuyListener)
 }
 clearPlayerTwoListeners() {
  window.removeEventListener('keydown', this.playerTwoListener)
 }
 exitShop() {
  setTimeout(() => {
   this.offer.style.width = '0px'
  }, 100);
  setTimeout(() => {
   this.offer.style.height = '0px'
  }, 900);
  setTimeout(() => {
   this.currentPosition[1] = game.size[1] * 2
   this.shop.style.transition = '15s linear'
   this.shop.style.transform = `translate(${this.currentPosition[0]}px, ${this.currentPosition[1]}px)`
  }, 1000);
  setTimeout(() => {
   this.shop.remove()
   game.stages.clearStage()
  }, 8000);
 }
}