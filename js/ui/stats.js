class Stats {
 constructor() {
  this.playerOneAmmunitions = document.querySelectorAll('.game .stats .players-ammunition .player.one > div')
  this.playerTwoAmmunitions = document.querySelectorAll('.game .stats .players-ammunition .player.two > div')

  this.playerOneAmunitionContainer = document.querySelector('.game .stats .players-ammunition .player.one')
  this.playerTwoAmunitionContainer = document.querySelector('.game .stats .players-ammunition .player.two')

  this.playersStatsContainers = document.querySelectorAll('.game .stats .player-stats .player')

  this.showPlayersAmunition = (players) => {
   if (players == 2) {
    this.playerOneAmunitionContainer.style.left = '0'
    this.playerTwoAmunitionContainer.style.right = '0'
    this.playersStatsContainers.forEach(e => e.style.bottom = '0')
   } else {
    this.playerOneAmunitionContainer.style.left = '0'
    this.playersStatsContainers[0].style.bottom = '0'
   }
  }
 }
 load(players) {
  this.showPlayersAmunition(players)
 }
}