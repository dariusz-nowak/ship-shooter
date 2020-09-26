class EmptyEnemy {
 constructor() {
  this.size = [0, 0]
  this.position = []

  this.ship = document.createElement('div')
  this.ship.classList.add('empty')
 }
 load() {
  this.create()
 }
 create() {
  game.enemiesContainer.appendChild(this.ship)
 }
}