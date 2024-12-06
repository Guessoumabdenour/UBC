// Get the HTML canvas
const canvas = document.getElementById("renderCanvas");

// Create the Babylon engine
const engine = new BABYLON.Engine(canvas, true);

// Function to create the scene
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Enable physics in the scene with a lower gravity vector
    const gravityVector = new BABYLON.Vector3(0, -4, 0);  // Reduced gravity
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    // =======================
    // Création de ground2 Octogonal
    // =======================
    const octagonSides = 8;
    const octagonRadius = 80; // Rayon de l'octogone
    const ground2Thickness = 2; // Épaisseur de ground2
    
    // Créer ground2 en utilisant CreateCylinder avec 8 côtés pour un octogone parfait
    const ground2 = BABYLON.MeshBuilder.CreateCylinder("ground2", {
        diameter: 2 * octagonRadius * 1.08, // Diamètre basé sur le rayon
        height: ground2Thickness,
        tessellation: octagonSides, // 8 côtés pour un octogone
        sideOrientation: BABYLON.Mesh.DOUBLESIDE // Pour que les deux faces soient visibles
    }, scene);

    // Positionner ground2 légèrement au-dessus du sol existant
    ground2.position.y = ground2Thickness / 2 + 0.1;

    // Appliquer une rotation de 45 degrés autour de l'axe Y
    ground2.rotation.y = BABYLON.Tools.ToRadians(22.5);

    // Créer un matériau pour ground2
    const ground2Material = new BABYLON.StandardMaterial("ground2Material", scene);
    ground2Material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Couleur grise, ajustez selon vos besoins
    ground2.material = ground2Material;

    // Appliquer l'imposteur de physique à ground2 avec moins de restitution et de friction
    ground2.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground2,
        BABYLON.PhysicsImpostor.CylinderImpostor,
        { mass: 0, restitution: 0.3, friction: 0.2 },  // Lower restitution and friction
        scene,
    );
    ground2.checkCollisions = true;

    // =======================
    // Création des Murs Autour de ground2 Octogonal
    // =======================
    const wallHeight = 5; // Hauteur des murs
    const wallThickness = 1; // Épaisseur des murs

    // Calculer la longueur d'un côté de l'octogone
    const sideLength = 2 * octagonRadius * Math.sin(Math.PI / octagonSides) + 5; // s = 2r sin(π/n)

    // Paramètres de l'octogone
    const wallAngleIncrement = (2 * Math.PI) / octagonSides; // 45 degrés pour un octogone

    // Créer les 8 murs autour de ground2
    for (let i = 0; i < octagonSides; i++) {
        const angle = i * wallAngleIncrement; // Rotation de 45 degrés pour chaque côté
        const x = octagonRadius * Math.sin(angle); // Calculer la position x
        const z = octagonRadius * Math.cos(angle); // Calculer la position z
        const rotation = 0 + angle + Math.PI; // Ajuster la rotation pour le mur

        const wall = BABYLON.MeshBuilder.CreateBox(
            `wall2_${i}`,
            { width: sideLength, height: wallHeight, depth: wallThickness },
            scene
        );

        // Positionner le mur
        wall.position = new BABYLON.Vector3(x, wallHeight / 2, z);

        // Rotation du mur
        wall.rotation.y = rotation ;

        // Appliquer le matériau au mur
        wall.material = ground2Material;

        // Appliquer la physique au mur avec moins de restitution et de friction
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(
            wall,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.3, friction: 0.2 },  // Lower restitution and friction
            scene
        );
        wall.checkCollisions = true;
    }

    // =======================
    // Création de la Lumière
    // =======================
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.9;

    // =======================
    // Création de la Caméra
    // =======================
    const camera = new BABYLON.ArcRotateCamera(
        "ArcRotateCamera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(60),
        300, // Augmenté pour voir les deux grounds
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);

    // =======================
    // Création des Joueurs (Sphères de Base)
    // =======================
    const createPlayer = (name, position, color) => {
        const player = BABYLON.MeshBuilder.CreateSphere(name, { diameter: 2 }, scene);
        player.position = position;
        const playerMaterial = new BABYLON.StandardMaterial(`${name}Material`, scene);
        playerMaterial.diffuseColor = color;
        player.material = playerMaterial;

        // Appliquer la physique au joueur avec moins de restitution et de friction
        player.physicsImpostor = new BABYLON.PhysicsImpostor(
            player,
            BABYLON.PhysicsImpostor.SphereImpostor,
            { mass: 1, restitution: 0.3, friction: 0.2 },  // Lower restitution and friction
            scene
        );

        player.checkCollisions = true;  // Assure that the player can collide with other objects

        return player;
    };

    // Positionner les joueurs **au-dessus** de l'octogone
    const player1 = createPlayer("player1", new BABYLON.Vector3(-10, ground2.position.y + 2, 0), BABYLON.Color3.Blue());
    const player2 = createPlayer("player2", new BABYLON.Vector3(10, ground2.position.y + 2, 0), BABYLON.Color3.Red());

    // =======================
    // Création du Skybox
    // =======================
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("src/textures/skybox/skybox", scene); // Assurez-vous que le chemin est correct
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Limiter l'angle de la caméra
    camera.upperBetaLimit = Math.PI / 2.2;

    // =======================
    // Retour de la Scène
    // =======================
    return scene;
};

// Créer la scène
const scene = createScene();
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

// Démarrer la boucle de rendu
engine.runRenderLoop(() => {
    scene.render();
});

// Redimensionner le moteur lorsque la fenêtre est redimensionnée
window.addEventListener("resize", () => {
    engine.resize();
});
