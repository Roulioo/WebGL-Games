// -- Fonction pour la création des objets de notre scène 

forest.game = {

    // -- tableau contenant nos arbres
    trees : [],

    // -- la pause
    pause : true,

    // -- nombre d'arbre
    nb_tree : 0,

    // -- déplacements
    moveForward : false,
    moveBackward : false,
    moveLeft : false,
    moveRight : false,

    // -- taille du plane 
    field : {
        width : 500, // -- largeur 
        height : 2500, // -- hauteur
    },

    life_bool : false,

    // -- vaisseau
    ship : 0,

    // -- vie du joueur
    life : 3,

    // -- score du joueur
    score : 0,

    // -- rayon de nos planètes
    meteore_radius : 5,

    player : null, // -- caméra
    speed : null, // -- rapidité 

    // -- function random aléatoire 
    entierAleatoire : function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    init : function(config){ // Config ici permettra de gérer les configurations voulu dès le début pour le joueur

        config = config || {}; // Si il y'a rien dans config c'est un objet vide donc aucune erreur

        // -- player soit la caméra
        this.player = forest.gfx_engine.camera;

        // -- speed de la caméra
        this.speed = config.speed || 0;

        // -- Nombre d'arbres
        this.nb_tree = config.nb_tree || 50;

        // -- Constante qui fait le lien avec notre forest 
        // const scene = forest.gfx_engine.scene; Possible d'utiliser pour plus de clarté

        // -- load background texture de l'espace 
        const loader_texture = new THREE.TextureLoader();
        loader_texture.load('img/espace.jpg',function(texture){
            forest.gfx_engine.scene.background = texture;  
        });

        // -- creation du ship / vaisseau 
        const loader_ship = new THREE.FBXLoader();

        loader_ship.load('./ship/ship_ok.fbx', function (object) {

            console.log(object);
            //forest.game.ship = object.children[0];
            forest.game.ship = object;
            forest.game.ship.position.set(0,-2, -9);
            forest.game.ship.rotateY(THREE.Math.degToRad(-180))
            forest.game.ship.scale.set(0.004, 0.004, 0.004);
            console.log("avant");
            
            // forest.gfx_engine.scene.add(light);*/
            forest.gfx_engine.camera.add(forest.game.ship);
            console.log("ajout scene"); 
            //gfx_engine.camera.add(forest.game.ship);

            console.log("ship added !");

            forest.game.ship.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

        });

        /*

        const onKeyDown = function(event) {
            switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                forest.game.ship.position.y += 1;
                console.log("Up");
                break;
            case 37: // left
            case 65: // a
                moveLeft = true;
                forest.game.ship.position.x -= 1;   
                console.log("Left");
                break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                forest.game.ship.position.y -= 1;
                console.log("Down");
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                forest.game.ship.position.x += 1;
                console.log("Right");
                break;
            }
        };

        document.addEventListener("keydown", onKeyDown, false);

        */

        const onKeyDown = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    forest.game.moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    forest.game.moveLeft = true;
                    break;
                case 40: // down
                case 83: // s
                    forest.game.moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                    forest.game.moveRight = true;
                    break;
            }
        };

        const onKeyUp = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    forst.game.moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    forest.gamemoveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                    forest.game.moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                    forest.game.moveRight = false;
                    break;
            }
        };

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        // -- boucle de nos sphères
        console.log(this.nb_tree)
        for (let j = 0; j < this.nb_tree; j++) {

            // -- création sphère et texture

            const textureLoader = new THREE.TextureLoader();
            const geometry = new THREE.SphereGeometry( 5, 32, 32 );

            const texture = textureLoader.load('./texture/texture.jpg');
            const texture2 = textureLoader.load('./texture/jupiter.jpeg');
            const texture3 = textureLoader.load('./texture/saturne.jpeg');
            const texture4 = textureLoader.load('./texture/uranus.jpg');
            const texture5 = textureLoader.load('./texture/venus.jpeg');
            const texture6 = textureLoader.load('./texture/terre.jpg');

            const material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
            const material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture2 } );
            const material3 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture3 } );
            const material4 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture4 } );
            const material5 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture5 } );
            const material6 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture6 } );
            
            const mesh = new THREE.Mesh( geometry, material );
            mesh.collision = false;
            const mesh2 = new THREE.Mesh( geometry, material2 );
            mesh2.collision = false;
            const mesh3 = new THREE.Mesh( geometry, material3 );
            mesh3.collision = false;
            const mesh4 = new THREE.Mesh( geometry, material4 );
            mesh4.collision = false;
            const mesh5 = new THREE.Mesh( geometry, material5 );
            mesh5.collision = false;
            const mesh6 = new THREE.Mesh( geometry, material6 );
            mesh6.collision = false;

            let tab_mesh = [mesh,mesh2,mesh3,mesh4,mesh5,mesh6];
            let random = this.entierAleatoire(0,5);
            
            //tab_mesh[random].scale.set(0.02,0.02,0.02);
            tab_mesh[random].position.set(
                this.entierAleatoire(-19,22),
                this.entierAleatoire(-18,14),
                this.entierAleatoire(-30,-2500)
            );

            forest.gfx_engine.scene.add(tab_mesh[random]);
            this.trees.push(tab_mesh[random]);

        }

        // -- Light 
        let light = new THREE.AmbientLight(0x404040, 2);
        forest.gfx_engine.scene.add(light);
        
        // -- renderer (rendu de la scène)
        forest.gfx_engine.renderer.render(forest.gfx_engine.scene, forest.gfx_engine.camera);
        
        // -- initialisation
        console.log("Game is ready");
    },
    
    // -- cette fonction update est importante car utiliser dans gfx_engine pour update le jeux
    update : function(){

        const radius = 5;

        if(forest.game.pause == false){
            const gfx = forest.gfx_engine;
            //forest.game.ship.position.z -= 1;
            gfx.camera.translateZ(-this.speed);
            // -- déplacement caméra 
            //forest.game.player.translateZ(-this.speed); // -- vitesse de la caméra 
            //forest.game.ship.translateZ(0.001); // -- vitesse du ship
           // gfx.scene.translateZ(forest.game.speed); // -- vitesse du ship
            // -- respawn 
            if(this.trees.length > 0){
                for(let i = 0; i < this.nb_tree; i ++){
                    if(this.trees[i].position.z > this.player.position.z){
                        this.trees[i].translateZ(-this.field.height - 50);
                        this.trees[i].position.x =
                        this.entierAleatoire(-19,22),this.entierAleatoire(-18,14),this.entierAleatoire(0,-2500) 
                        // pas nécessaire car respawn est mal fait sur le plane
                        //Math.floor(Math.random() * this.field.width) - this.field.width * 0.5; 
                    }
                };
            }

            // -- incrémentation du score
            forest.game.score += 1;
            
            // -- gestion des déplacements
            if(forest.game.moveForward == true){
                forest.game.ship.translateY(1);
                forest.game.moveForward = false;
            } 
            if(forest.game.moveBackward == true){
                forest.game.ship.translateY(-1);
                forest.game.moveBackward = false;
            } 
            if(forest.game.moveLeft == true){
                forest.game.ship.translateX(1);
                forest.game.moveLeft = false;
            } 
            if(forest.game.moveRight == true){
                forest.game.ship.translateX(-1);
                forest.game.moveRight = false;
            } 
            
        }else{
            console.log("mode pause actived");
        }

        // -- utile pour gérer les collisions 
        const ship_position = forest.gfx_engine.camera.position.clone();
        console.log(ship_position.add(forest.game.ship.position));

        // -- position du vaisseau dans l'espace en locale
        //console.log(forest.gfx_engine.camera.localToWorld(forest.game.ship.position));
        //console.log(forest.game.ship.position);
        // -- collision
        if(forest.game.ship.position.x <= -7){
            forest.game.ship.position.x += 1;
        }

        if(forest.game.ship.position.x >= 7){
            forest.game.ship.position.x -= 1;
        }

        if(forest.game.ship.position.y <= -4){
            forest.game.ship.position.y += 1;
        }

        if(forest.game.ship.position.y >= 4){
            forest.game.ship.position.y -= 1;
        }

        // -- on appelle nos id de notre index html 
        const life_div = document.getElementById("life");
        const score_div = document.getElementById("score");

        let life_string = "Life : " + forest.game.life;
        let score_string = "Score : " + forest.game.score;

        for(let i = 0; i < this.trees.length; i ++){

            if (ship_position.z >= forest.game.trees[i].position.z - radius  
                &&
                ship_position.z <= forest.game.trees[i].position.z + radius 
                && 
                ship_position.x >= forest.game.trees[i].position.x - radius
                &&
                ship_position.x <= forest.game.trees[i].position.x + radius
                &&
                ship_position.y >= forest.game.trees[i].position.y - radius
                &&
                ship_position.y <= forest.game.trees[i].position.y + radius
                && 
                forest.game.trees[i].collision == false){
                    forest.game.life -= 1;
                    forest.game.trees[i].collision = true;
                }

            if(forest.game.life <= 0){
                window.location = "gameover.html";
            }

        }
        
        life_div.innerText = life_string ;
        score_div.innerText = score_string ;

    }
};