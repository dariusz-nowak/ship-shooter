class Game {
 constructor() {
  // Plansza
  this.game = document.querySelector('.game')
  this.board = document.querySelector('.game .board')
  this.size = [this.board.clientWidth, this.board.clientHeight]

  // Menu
  this.menu = new Menu()

  // Statystyki
  this.stats = new Stats()

  // Gracze
  this.ship1
  this.ship2

  // Pociski gracza
  this.playerBulletsContainer = document.querySelector('.game .board .container .players .bullets')

  // Kontenery statystyk gracza
  this.playerOneAmmoContainers = document.querySelectorAll('.game .stats .players-ammunition .player.one > div > p:first-of-type')
  this.playerTwoAmmoContainers = document.querySelectorAll('.game .stats .players-ammunition .player.two > div > p:first-of-type')
  this.livesContainer = document.querySelectorAll('.game .stats .player-stats .player .lives p:first-of-type')
  this.bombsContainer = document.querySelectorAll('.game .stats .player-stats .player .bombs p:first-of-type')

  // Kontenery statków graczy
  this.grayShipContainer = document.querySelector('.game .board .container .players .gray')
  this.redShipContainer = document.querySelector('.game .board .container .players .red')

  // Kontener przeciwników
  this.enemiesContainer = document.querySelector('.game .board .container .enemies')

  // Kontener pocisków przeciwników
  this.enemiesBulletsContainer = document.querySelector('.game .board .container .enemies .bullets')

  // Kontener znajdziek
  this.lootsContainer = document.querySelector('.game .board .container .enemies .loots')

  // Kontener życia bossów
  this.bosshealth = document.querySelector('.game .stats .boss-health')

  // Tablica przeciwników
  this.enemies = []

  // Funkcja ruchu tła
  this.backgroundMoving = () => {
   let backgroundShift = 402
   this.game.style.backgroundPosition = `0 ${backgroundShift}px`
   setInterval(() => {
    backgroundShift += 402
    this.game.style.backgroundPosition = `0 ${backgroundShift}px`
   }, 20000);
  }
 }

 // Wczytanie danych początkowych gry
 load() {
  this.menu.load()
  this.backgroundMoving()
 }

 // Rozpoczęcie gry
 start() {
  this.ship1 = new PlayerOneShip(this.menu.spreadAmmo, this.menu.laserAmmo, this.menu.shotgunAmmo)
  this.ship2 = new PlayerTwoShip(this.menu.spreadAmmo, this.menu.laserAmmo, this.menu.shotgunAmmo)
  this.stages = new Stages(game.menu.initialStage)
  if (this.menu.players == 1) {
   this.ship1.load()
  } else {
   this.ship1.load()
   this.ship2.load()
  }
  this.stats.load(this.menu.players)
  this.stages[`stage${this.stages.activeStage[0]}x${this.stages.activeStage[1]}`]()
 }
}