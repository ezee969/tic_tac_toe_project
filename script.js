// tic-tac-toe

(function(){
    
    const Config ={
        init: function(){
            Config.mainMenuBgMusic(0.3)
            Config.mainMenuButton()
        },
        mainMenuBgMusic: function(vol){
            var bgMusic = document.getElementById("bgMusic");
            bgMusic.volume = vol;
        },
        mainMenuButton: function(){
            let buttonSound = document.querySelector("#select")
            let mainContainer = document.querySelector(".mainContainer")
            let mainMenuButton = document.querySelector("#newGameBut")
            mainMenuButton.onclick = function(){
                buttonSound.play()
                mainContainer.style.backgroundColor = "black"
                Config.mainMenuBgMusic(0.1)
                setTimeout(function(){
                    mainMenuButton.style.backgroundColor = "black"
                    mainMenuButton.style.color = "black"
                },200)
                setTimeout(function(){
                    location.href = "./game/game.html";
                },700)
            }
        },
        
    };

    Config.init();
})()

