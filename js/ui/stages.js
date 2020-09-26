class Stages {
 constructor(stage) {
  this.map = []
  this.activeStage = [stage[0], stage[1]]

  this.enemy
  this.stageContainer = document.querySelector('.game .stats .stage')
 }
 stageLoad() {
  this.stageContainer.style.bottom = "-25px"
  this.stageContainer.lastElementChild.innerText = `${this.activeStage[0]} x ${this.activeStage[1]}`
  setTimeout(() => {
   this.stageContainer.style.bottom = "-125px"
  }, 3750);
  game.enemiesContainer.style.gridTemplateRows = `repeat(${this.map.length}, 1fr)`
  game.enemiesContainer.style.gridTemplateColumns = `repeat(${this.map[0].length}, 1fr)`
  for (let i = 0; i < this.map.length; i++) {
   for (let j = 0; j < this.map[0].length; j++) {
    if (this.map[i][j] == 0) {
     this.enemy = new EmptyEnemy()
    } else if (this.map[i][j] == 1) {
     this.enemy = new StandardEnemy()
    } else if (this.map[i][j] == 2) {
     this.enemy = ``
    } else if (this.map[i][j] == 'shop') {
     this.enemy = new Shop()
    } else if (this.map[i][j] == 'stage-1-boss') {
     this.enemy = new Stage1Boss()
    }
    if (this.enemy.ship && !this.enemy.ship.classList.contains('empty')) {
     game.enemies.push(this.enemy)
    }
    this.enemy.load(i, j)
   }
  }
 }
 clearStage() {
  document.querySelectorAll('.game .board .container .enemies > div').forEach(e => {
   if (e.classList == 'loots' || e.classList == 'bullets') {} else e.remove()
  })
  this.nextStage()
 }
 nextStage() {
  this.activeStage[1]++
  if (this.activeStage[1] == 10) {
   this.activeStage[0]++
   this.activeStage[1] = 1
  }
  if (this[`stage${this.activeStage[0]}x${this.activeStage[1]}`]) {
   this[`stage${this.activeStage[0]}x${this.activeStage[1]}`]()
  } else {
   console.log('end')
  }

 }
 stage1x1() {
  this.map = [
   [1, 1, 0, 1, 1, 0, 1, 1]
  ]
  this.stageLoad()
 }
 stage1x2() {
  this.map = [
   [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]
  ]
  this.stageLoad()
 }
 stage1x3() {
  this.map = [
   [1, 1, 0, 1, 1, 0, 1, 1],
   [1, 0, 1, 0, 0, 1, 0, 1]
  ]
  this.stageLoad()
 }
 stage1x4() {
  this.map = [
   [1, 1, 0, 1, 1, 0, 1, 1],
   [1, 0, 1, 0, 0, 1, 0, 1],
   [1, 1, 0, 1, 1, 0, 1, 1]
  ]
  this.stageLoad()
 }
 stage1x5() {
  this.map = [
   [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
   [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
   [1, 1, 0, 1, 0, 0, 1, 0, 1, 1]
  ]
  this.stageLoad()
 }
 stage1x6() {
  this.map = [
   ['shop']
  ]
  this.stageLoad()
 }
 stage1x7() {
  this.map = [
   [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
   [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
   [1, 1, 0, 1, 0, 0, 1, 0, 1, 1]
  ]
  this.stageLoad()
 }
 stage1x8() {
  this.map = [
   [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
   [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
   [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
   [1, 1, 0, 1, 0, 0, 1, 0, 1, 1]
  ]
  this.stageLoad()
 }
 stage1x9() {
  this.map = [
   ['stage-1-boss']
  ]
  this.stageLoad()
 }
 stage2x1() {
  this.map = [
   // [1, 1, 0, 1, 1, 0, 1, 1]
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  this.stageLoad()
 }
}