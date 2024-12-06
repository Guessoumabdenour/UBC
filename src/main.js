// Get the HTML canvas
const canvas = document.getElementById("renderCanvas");

// Create the Babylon engine
const engine = new BABYLON.Engine(canvas, true);



// Function to create the scene
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Enable physics in the scene
    const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);





    // Create ground with thickness
    const ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 150, depth: 200, height: 1 }, scene);
    ground.position.y = -0.5; // Lower the ground so its top is at y = 0

    // Apply simple color to the ground
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Grey color for the ground
    ground.material = groundMaterial;

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.5, friction: 0.5 },
        scene
    );
    ground.checkCollisions = true;


    // Create a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.9;

    // Create a camera
    const camera = new BABYLON.ArcRotateCamera(
        "ArcRotateCamera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(60),
        200,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);

    // Create players (basic spheres)
    const player1 = BABYLON.MeshBuilder.CreateSphere("player1", { diameter: 2 }, scene);
    player1.position = new BABYLON.Vector3(-10, 1, 0);
    const player1Material = new BABYLON.StandardMaterial("player1Material", scene);
    player1Material.diffuseColor = BABYLON.Color3.Blue();
    player1.material = player1Material;

    const player2 = BABYLON.MeshBuilder.CreateSphere("player2", { diameter: 2 }, scene);
    player2.position = new BABYLON.Vector3(10, 1, 0);
    const player2Material = new BABYLON.StandardMaterial("player2Material", scene);
    player2Material.diffuseColor = BABYLON.Color3.Red();
    player2.material = player2Material;

    // Apply physics to players
    [player1, player2].forEach(player => {
        player.physicsImpostor = new BABYLON.PhysicsImpostor(
            player,
            BABYLON.PhysicsImpostor.SphereImpostor,
            { mass: 1, restitution: 0.9, friction: 0.5 },
            scene
        );
    });

const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000}, scene);
const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("src/textures/skybox/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

camera.upperBetaLimit = Math.PI / 2.2;


    const R = 50; // Radius of the octagon
    const wallHeight = 5; // Height of the walls
    const wallThickness = 1; // Thickness of the walls
    const wallLength = 10; // Length of each straight wall
    const angleStep = Math.PI / 4; // 45 degrees for each side of the octagon
    
    // Create the walls for the octagon (8 sides)
    for (let i = 0; i < 8; i++) {
        // Calculate the center position for each wall (using polar coordinates)
        const angle = i * angleStep;
        const x = R * Math.cos(angle);  // Position in x
        const z = R * Math.sin(angle);  // Position in z
    
        // Create the wall mesh
        const wall = BABYLON.MeshBuilder.CreateBox(
            "wall" + i,
            { width: wallLength, height: wallHeight, depth: wallThickness },
            scene
        );
    
        // Position the wall correctly along the perimeter
        wall.position = new BABYLON.Vector3(x, wallHeight / 2, z);
    
        // Rotate the wall to align with the octagon edges
        wall.rotation.y = angle + Math.PI / 8;  // Rotate the wall to face the correct direction
    
        // Apply the material to the wall
        wall.material = groundMaterial;
    
        // Apply physics to the wall
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(
            wall,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.5, friction: 0.8 },
            scene
        );
    }
    
    

    

    return scene;
};

// Create the scene
const scene = createScene();
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

// Start the render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Resize the engine when the window is resized
window.addEventListener("resize", () => {
    engine.resize();
});
