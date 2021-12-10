// tic-tac-toe

(function(){
    
    const Config ={
        init: function(){
            Config.cacheDom()
            Config.mainMenuButtonOnClick()
        },
        cacheDom: function(){
            this.buttonSound = document.querySelector("#select")
            this.mainContainer = document.querySelector(".mainContainer")
            this.mainMenuButton = document.querySelector("#newGameBut")
        },
       
        mainMenuButtonOnClick: function(){
            this.mainMenuButton.onclick = function(){
                Config.buttonSound.play()
                Config.mainContainer.style.backgroundColor = "black"
                Config.mainMenuBgMusic(0.1)
                setTimeout(function(){
                    Config.mainMenuButton.style.backgroundColor = "black"
                    Config.mainMenuButton.style.color = "black"
                },200)
                setTimeout(function(){
                    location.href = "./game/game.html";
                },700)
            }
        },
        
    };

    Config.init();
})()

