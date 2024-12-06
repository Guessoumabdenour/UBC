export function createCamera(scene, canvas) {
    const camera = new BABYLON.ArcRotateCamera(
        "ArcRotateCamera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(60),
        200,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);
}
