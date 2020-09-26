class Menu {
 constructor() {
  // Menu główne
  this.menu = document.querySelector('.game .menu')

  // Przyciski opcji listy głównej
  this.mainStart = document.querySelector('.game .menu .container ul.main li.start')
  this.mainOptions = document.querySelector('.game .menu .container ul.main li.options')
  this.mainHelp = document.querySelector('.game .menu .container ul.main li.help')
  this.mainExit = document.querySelector('.game .menu .container ul.main li.exit')

  // Kontenery wszystkich list
  this.unorderedLists = document.querySelectorAll('.game .menu .container > ul')
  this.listMain = document.querySelector('.game .menu .container > ul.main')
  this.listOptions = document.querySelector('.game .menu .container > ul.options')
  this.listHelp = document.querySelector('.game .menu .container > ul.help')

  // Przyciski wyboru ilości graczy
  this.playersList = document.querySelectorAll('.game .menu .container ul.options .players > p')

  // Przyciski wyboru poziomu trudności
  this.difficultiesList = document.querySelectorAll('.game .menu .container ul.options .difficulty > p')

  // Opisy poziomów trudności
  this.difficultiesDescriptionList = document.querySelectorAll('.game .menu .container ul.options .difficulty .chosen-difficulties > div')

  // Przycisk zapisy opcji
  this.saveButton = document.querySelector('.game .menu .container ul button.save')

  // Zmienne dla wyboru opcji
  this.choosenDifficulty = 'Easy'
  this.players = 1
  this.initialStage = [1, 1]
  this.spreadAmmo = 100
  this.laserAmmo = 100
  this.shotgunAmmo = 100
  this.bombs = 25
  this.lives = 25
  this.prices = 0

  // Przyciski powrotu do listy głównej
  this.backButtons = document.querySelectorAll('.game .menu .container ul button')

  // Funkcja rozpoczęcia gry
  this.mainStartFunction = () => {
   this.clickEffect(this.mainStart)
   this.unorderedLists.forEach(e => e.classList.remove('active'))
   this.menu.classList.add('hide')

   game.start()
   setTimeout(() => {
    this.removeEventListeners()
   }, 250);
  }

  // Funkcja otwarcia opcji
  this.mainOptionsFunction = () => {
   this.clickEffect(this.mainOptions)
   this.unorderedLists.forEach(e => e.classList.remove('active'))
   this.listOptions.classList.add('active')
   this.choosenDifficulty = document.querySelector('.game .menu .container ul.options .difficulty p.active').innerHTML
   document.querySelector(`.game .menu .container ul.options .difficulty .chosen-difficulties > div.${this.choosenDifficulty.toLowerCase()}`).classList.add('active')
  }

  // Funkcja wyboru ilości graczy
  this.changePlayersFunction = (choose) => {
   this.playersList.forEach(e => e.classList.remove('active'))
   choose.target.classList.add('active')
  }

  // Funkcja wyboru poziomu trudności
  this.changeDifficultiesFunction = (choose) => {
   this.difficultiesList.forEach(e => e.classList.remove('active'))
   this.difficultiesDescriptionList.forEach(e => e.classList.remove('active'))
   document.querySelector(`.game .menu .container ul.options .difficulty .chosen-difficulties > div.${choose.target.classList}`).classList.add('active')
   choose.target.classList.add('active')
  }

  // Funkcja zapisu opcji
  this.saveFunction = () => {
   this.initialStage = [document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .initial-stage p:last-of-type').innerText.charAt(0), document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active p:last-of-type').innerText.charAt(4)]
   this.spreadAmmo = document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .spread-ammo p:last-of-type').innerText
   this.laserAmmo = document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .laser-ammo p:last-of-type').innerText
   this.shotgunAmmo = document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .shotgun-ammo p:last-of-type').innerText
   this.bombs = document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .bombs p:last-of-type').innerText
   this.lives = document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .lives p:last-of-type').innerText
   if (document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .prices p:last-of-type').innerText == 'Cheap') {
    this.prices = 0
   } else if (document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .prices p:last-of-type').innerText == 'Moderate') {
    this.prices = 1
   } else if (document.querySelector('.game .menu .container ul.options .difficulty .chosen-difficulties > div.active .prices p:last-of-type').innerText == 'Expensive') {
    this.prices = 2
   }
   if (document.querySelector('.game .menu .container ul.options .players p.active').classList.contains('one')) {
    this.players = 1
   } else {
    this.players = 2
   }
   this.difficultiesDescriptionList.forEach(e => e.classList.remove('active'))
   document.querySelectorAll('.game .stats .players-ammunition .player > .spread > p:first-of-type').forEach(e => e.innerText = this.spreadAmmo)
   document.querySelectorAll('.game .stats .players-ammunition .player > .laser > p:first-of-type').forEach(e => e.innerText = this.laserAmmo)
   document.querySelectorAll('.game .stats .players-ammunition .player > .shotgun > p:first-of-type').forEach(e => e.innerText = this.shotgunAmmo)
   document.querySelectorAll('.game .stats .player-stats .player .lives p:first-of-type').forEach(e => e.innerText = this.lives)
   document.querySelectorAll('.game .stats .player-stats .player .bombs p:first-of-type').forEach(e => e.innerText = this.bombs)
   document.querySelector('.game .stats .stage p:last-of-type').innerText = `${this.initialStage[0]} x ${this.initialStage[1]}`
  }

  // Funkcja otwarcia pomocy
  this.mainHelpFunction = () => {
   this.clickEffect(this.mainHelp)
   this.unorderedLists.forEach(e => e.classList.remove('active'))
   this.listHelp.classList.add('active')
  }

  // Funkcja wyjścia z gry
  this.mainExitFunction = () => {
   this.clickEffect(this.mainExit)
   setTimeout(() => {
    this.mainExit.innerText = "Try again later..."
    setTimeout(() => {
     this.mainExit.innerText = "Exit"
    }, 1250);
   }, 250);
  }

  // Funkcja powrotu do listy głównej
  this.backButtonFunction = () => {
   this.unorderedLists.forEach(e => e.classList.remove('active'))
   this.listMain.classList.add('active')
  }
 }

 // Wczytanie menu
 load() {
  this.addEventListeners()
 }

 // Włączenie nasłuchiwania przycisków listy głównej
 addEventListeners() {
  this.mainStart.addEventListener('click', this.mainStartFunction)
  this.mainOptions.addEventListener('click', this.mainOptionsFunction)
  this.mainHelp.addEventListener('click', this.mainHelpFunction)
  this.mainExit.addEventListener('click', this.mainExitFunction)
  this.saveButton.addEventListener('click', this.saveFunction)
  this.playersList.forEach(e => e.addEventListener('click', this.changePlayersFunction))
  this.difficultiesList.forEach(e => e.addEventListener('click', this.changeDifficultiesFunction))
  this.backButtons.forEach(e => e.addEventListener('click', this.backButtonFunction))
 }

 // Wyłączenie nasłuchiwania przycisków listy głównej
 removeEventListeners() {
  this.mainStart.removeEventListener('click', this.mainStartFunction)
  this.mainOptions.removeEventListener('click', this.mainOptionsFunction)
  this.mainHelp.removeEventListener('click', this.mainHelpFunction)
  this.mainExit.removeEventListener('click', this.mainExitFunction)
  this.saveButton.removeEventListener('click', this.saveFunction)
  this.playersList.forEach(e => e.removeEventListener('click', this.changePlayersFunction))
  this.difficultiesList.forEach(e => e.removeEventListener('click', this.changePlayersFunction))
  this.backButtons.forEach(e => e.removeEventListener('click', this.backButtonFunction))
 }

 // Efekt kliknięcia w przyciski listy głównej
 clickEffect(option) {
  this.removeEventListeners()
  const optionClone = option.cloneNode(true)
  optionClone.classList.add('shadow')
  optionClone.style.width = "540px"
  optionClone.style.height = "90px"
  optionClone.style.opacity = ".5"
  setTimeout(() => {
   optionClone.innerText = ""
   optionClone.style.width = "648px"
   optionClone.style.height = "108px"
   optionClone.style.opacity = "0"
   setTimeout(() => {
    if (option !== this.mainStart) {
     this.load()
    }
    optionClone.remove()
   }, 200);
  }, 50);
  option.appendChild(optionClone)
 }
}