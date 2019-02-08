const forest = {
    configuration : null, 
    start : function(config){ // -- Lancera notre jeux 

        const blocker = document.getElementById("blocker");
        const instructions = document.getElementById("instructions");
        const audio = document.getElementById("audio");
        const audio_muted = document.getElementById("audio_muted");
        const audio_gameover = document.getElementById("audio_gameover");

        // -- dès qu'on clique on affiche le jeux
        instructions.addEventListener(
            "click",
            //-- quand on click alors on affiche pas nos instructions et notre blocker
            function(){
                    instructions.style.display = "none";
                    blocker.style.display = "none";
                    audio;
                    audio_gameover;
                    forest.game.pause = false;
            });

        const onKeyDown = function(event) {
            switch (event.keyCode) {
            case 80: // p
                instructions.style.display = "";
                blocker.style.display = "";
                forest.game.pause = true;
                audio_muted;
                console.log("pause");
                break;
            }
        };

        document.addEventListener("keydown", onKeyDown, false);

        // -- Debug mod 
        // -- Utiliser quand nous le mettons en production 
        if(config.debug_mode == true){
            console.log = function() {} ;
        }

        this.configuration = config; // -- On l'attache a forest dans configuration
        this.gfx_engine.init(config.gfx_engine); // -- On lance notre init avec notre configuration déclarée
        
        this.game.init(config.game);

        // -- Constante pour notre renderer
        const gfx = this.gfx_engine;
        gfx.renderer.render(gfx.scene, gfx.camera);

        // -- On appelle l'update 
        this.update();

        // -- Initialisation de la foret
        console.log("FOREST IS STARTED");
    },

    update : function(){
        requestAnimFrame(forest.update);
        forest.game.update(); // on update le jeux 
        forest.gfx_engine.update(); // on update l'écran 
    }

};