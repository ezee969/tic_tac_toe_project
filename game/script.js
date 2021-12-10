// tic-tac-toe

(function(){  
    const Config ={
        init: function() {
            Config.cacheDom()
            Config.pageColorTransition("white")
            Config.bindEvents()
        },
        cacheDom: function() {
            this.modal = document.querySelector(".game-modal");
            this.buttonSound = document.querySelector("#select");
            this.errorSound = document.querySelector("#error");
            this.victorySound = document.querySelector("#victory");
            this.keySelectButtons = document.querySelectorAll(".keyChooserBut");
            this.allBoxes = document.querySelectorAll(".box");
            this.box = document.querySelector(".box")
            this.mainCharSelectCont = document.querySelector(".mainCharSelectionContainer");
            this.startBut = document.querySelector(".startBut"); 
            this.inputBoxes = document.querySelectorAll(".textIn");
            this.gameHeader = document.querySelector(".header");
            this.victoryModal = document.querySelector(".victory-modal")
            this.victoryName = document.querySelector("#victoryName")
            this.victoryButs = document.querySelectorAll(".victoryBut")
            this.victoryCont = document.querySelector(".victory-cont")
            this.retryBut = document.querySelector("#retryBut")
            this.mainMenuBut = document.querySelector("#mainMenuBut")
            this.gameBox = document.querySelector(".gameBox")
        },
        gameCacheDom: function(){
            this.playerNames = document.querySelectorAll(".textIn")
            this.selectedButtons = document.querySelectorAll(".keyChooserButClicked")
        },
        newGameSetUp: function(){
            this.Player1 = createPlayer (this.playerNames[0].value,this.selectedButtons[0].innerHTML)
            this.Player2 = createPlayer (this.playerNames[1].value,this.selectedButtons[1].innerHTML)
            this.newGame = createGame (this.Player1,this.Player2)
        },
        bindEvents: function() {
            this.keySelectButtons.forEach(function (e){
                Config.keySelectButtonOnClick(e)
                })
            this.allBoxes.forEach(function (e){
                Config.boxesOnClick(e)
            })
            this.startBut.onclick = function(){
                Config.startButtonOnClick(Config.startBut)
            }
            this.retryBut.onclick = function(){
                Config.retryButtonOnClick()
            }
        },
        keySelectButtonOnClick: function(element) {
            element.onclick = function(){
                Config.buttonSound.play();
                if (element.id==0 || element.id==3){
                    Config.clickedStyle("clicked",Config.keySelectButtons[0])
                    Config.clickedStyle("unclicked",Config.keySelectButtons[1])
                    Config.clickedStyle("unclicked",Config.keySelectButtons[2])
                    Config.clickedStyle("clicked",Config.keySelectButtons[3])
                }
                else if (element.id==1 || element.id==2){
                    Config.clickedStyle("unclicked",Config.keySelectButtons[0])
                    Config.clickedStyle("clicked",Config.keySelectButtons[1])
                    Config.clickedStyle("clicked",Config.keySelectButtons[2])
                    Config.clickedStyle("unclicked",Config.keySelectButtons[3])
                }
            }
        },
        startButtonOnClick: function(element){
            if (document.querySelector(".keyChooserButClicked")){
                this.buttonSound.play();
                this.gameCacheDom()
                this.newGameSetUp()
                this.gameHeader.innerHTML = `Player ${this.newGame.findTurnPlayer().name} turn`
                Config.startNewGameTransition(element)
                }
            else{
                Config.errorSound.play();
                }
        },
        boxesOnClick: function(e){
            e.onclick = function(){
                if (e.innerHTML==""){
                    Config.newGame.board[e.id] = Config.newGame.findTurnPlayer().sign
                    Config.buttonSound.play()
                    e.innerHTML = Config.newGame.findTurnPlayer().sign
                    Config.newGame.updateGameState()
                    console.log(Config.newGame.winner)
                    if (Config.newGame.winner==true || Config.newGame.winner=="draw"){
                        if (Config.newGame.winner==true){
                            Config.victoryPageTransition(Config.newGame.findTurnPlayer().name)
                        }
                        else{
                            Config.victoryPageTransition("draw")
                        }
                    }
                    else{
                        Config.newGame.changeTurnsPlayers()
                        Config.gameHeader.innerHTML = `Player ${Config.newGame.findTurnPlayer().name} turn`
                    }
                }
                else{
                    Config.errorSound.play()
                }
            }
        },
        pageColorTransition: function(color) {
            (this.mainCharSelectCont).style.backgroundColor = color;
        },
        startNewGameTransition: function(element){
            element.style.backgroundColor = "black";
            element.style.color = "black";
            this.mainCharSelectCont.style.backgroundColor = "black";
            this.keySelectButtons.forEach(e => e.style.backgroundColor= "black")
            this.keySelectButtons.forEach(e => e.style.color= "black")
            this.inputBoxes.forEach(e => e.style.backgroundColor= "black")
            setTimeout(function(){(Config.modal).style.display ="flex"},800);
            setTimeout(function(){(Config.modal).style.backgroundColor = "white" },1550);   
        },
        clickedStyle: function(clicked,element) {
            element.className = ""
            if(clicked=="clicked"){
                element.classList.add('keyChooserButClicked');
            }
            else if(clicked=="unclicked"){
                element.classList.add('keyChooserButUnclicked');
            }
        },
        victoryPageTransition: function(winner){
            if(winner=="draw"){
                this.victoryName.innerHTML=`Its a draw!`
            }
            else{
                this.victoryName.innerHTML=`${winner} is the winner!`
            }
            this.hideGameTransition()
            this.showVictoryTransition("flex")
            this.victorySound.play()
            this.victorySound.volume = 0.1;
        },
        hideGameTransition: function(){
            this.gameHeader.classList.toggle("headerHide")
            this.gameBox.classList.toggle("gameBoxHide")
            this.allBoxes.forEach(function(e){
                e.classList.toggle("boxHide")
            })
        },
        showVictoryTransition: function(display){
            setTimeout(function(){
                Config.victoryCont.classList.toggle("showVictory-cont")
                Config.victoryButs.forEach(e => e.classList.toggle("showVictoryBut"))
                Config.victoryModal.style.display =display
            },700);
        },
        selectOnClickVictoryBut: function(){
            Config.victorySound.volume = 0.05
            Config.buttonSound.play()
        },
        retryButtonOnClick: function(){
            Config.victoryButsOnClick()
            Config.hideGameTransition()
            Config.gameReset()
            console.log(this.newGame.board)
        },
        victoryButsOnClick: function(){
            this.selectOnClickVictoryBut()
            this.showVictoryTransition("none")
            setTimeout(function(){
                Config.victorySound.pause()
                Config.victorySound.currentTime = 0
            },600);
        },
        gameReset: function(){
            this.newGame.board = ["","","","","","","","",""];
            this.newGame.winner = false;
            console.log(this.newGame.winner)
            this.allBoxes.forEach(e => e.innerHTML = "")
        }
    };

    const createGame = (p1,p2) => {
        players = [p1,p2];
        board = ["","","","","","","","",""];
        winner = false

        const updateGameState = () =>{
            for (var i=0; i<=3 ;i++){
                if (this.board[i]!="" && (this.board[i] == this.board[i+3] && this.board[i] == this.board[i+6])){
                    this.winner = true
                    console.log("WORKS")
                }
            }

            for (var i=0; i<=6 ;i+=3){
                if (this.board[i]!="" && (this.board[i] == this.board[i+1] && this.board[i] == this.board[i+2])){
                    this.winner = true
                    console.log("WORKS")

                }
            }

            if (this.board[0]!="" && (this.board[0] == this.board[4] && this.board[0] == this.board[8])){
                this.winner = true
                console.log("WORKS")
                }
            else if (this.board[2]!="" && (this.board[2] == this.board[4] && this.board[2] == this.board[6])){
                this.winner = true
                console.log("WORKS")
                }
            else if (this.board.includes("")==false){
                this.winner = "draw" 
                console.log("WORKS")
            }
        };

        const changeTurnsPlayers = () =>{
            players.forEach(function(player){
                if(player.plays==true){
                    player.plays=false
                }
                else{
                    player.plays=true
                }
            })
        }

        const findTurnPlayer = () =>{
            return players.find((player => player.plays==true))
        };

        const findNextTurnPlayer = () =>{ 
            return players.find((player => player.plays==false))
        };

        return {p1,p2,players,board,winner,updateGameState,findTurnPlayer,findNextTurnPlayer,changeTurnsPlayers}
    };

    var createPlayer = (name,sign) =>{
        if (sign=="X"){
            var plays = true
        }
        else {
            var plays = false
        };

        return {name,sign,plays}
    }

    Config.init();
})()
