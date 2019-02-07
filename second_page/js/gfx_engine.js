forest.gfx_engine = {
    init : function(config){ // -- config sera notre objet littéral qui permettra la configuration 

        // -- scène
        this.scene = new THREE.Scene(); 
        // -- this est utilisé pour permettre que les éléments soit utiliser en dehors de la fonction
        // -- on les attaches à notre objet littéral

        // -- fog (brouillard)
        this.scene.background = new THREE.Color("/img/espace.png");
        //this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
        
        // -- éviter une erreur
        config = config || {}; // -- important car si notre objet littéral est vide cela fonctionnera tout de même

        // -- permet d'avoir une valeur par défaut
        const fov = config.camera_fov || 75;
        // -- il prendra la valeur de config.camera_fov sinon il prendra 75

        // -- camera
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, 5000);
        //this.camera.position.set(0,0,50);
        this.scene.add(this.camera); // -- important si on veut ajouter quelque chose au parent camera
        // -- this.camera.add(forest.game.plane);

        // -- On créer une constante pour la performance
        
        const perf = forest.configuration.high_performance || true ; 

        // -- renderer
        
        this.renderer = new THREE.WebGLRenderer({ antialias: perf }); // permet une meilleur image 
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // -- dire au moteur l'hauteur du pixel car tous ne sont pas pareil
        // -- certains ne sont pas carrés et dans ce cas le rendu ne sera pas deformé
        this.renderer.setSize(window.innerWidth, window.innerHeight); // -- taille de l'écran en full screen dans notre cas 
        document.body.appendChild(this.renderer.domElement); // -- important pour attacher le renderer au document body

        // -- si on est en mode high performance alors on active le mode antilizing et les ombres sinon non

        if(perf){ // -- si perf existe 
            this.renderer.shadowMap.enabled = true; // -- gérer des shadow map, va gérer des images afficher ensuite
            this.renderer.shadowMap.type = THREE.BasicShadowMap; // -- type basic map
            console.log("Mode high performance actived");
        }else{
            console.log("Mode high performance not actived");
        }

        // -- RAF polyfill

        window.requestAnimFrame = (function() {
            return (
            window.requestAnimationFrame || // selon les navigateurs il appelera un des 3
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            }
            );
        })();

        // -- gérer le debug mod / si notre debug mod est true alors on affiche les stats

        if(forest.configuration.debug_mode && Stats ){ // si on est en debug mode et que la classe existe
            (function() {
                var script = document.createElement("script");
                script.onload = function() {
                  var stats = new Stats();
                  document.body.appendChild(stats.dom);
                  requestAnimationFrame(function loop() {
                    stats.update();
                    requestAnimationFrame(loop);
                  });
                };
                script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
                document.head.appendChild(script);
              })();
              console.log("Mode debug actived");              
        }else{
            console.log("Mode debug not actived");
        }

        // -- initialisation 
        console.log("Gfx engine is ready to start");

    }, // -- fonction qui va permettre d'initialiser le moteur graphique    

    // -- update de la scene et de la camera

    update(){
        this.renderer.render(this.scene, this.camera);
    },
     
};