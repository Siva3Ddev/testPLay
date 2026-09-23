var CameraControl = pc.createScript('cameraControl');

// initialize code called once per entity
CameraControl.prototype.initialize = function() {
    // Find the camera entity in your scene by name or other means
    this.cameraEntity = this.app.root.findByName('movable_Camera');

    // Find the button entity to trigger the camera change
    var buttonAEntity = this.app.root.findByName('ButtonA');

    if (buttonAEntity && this.cameraEntity) {
        // Add a click event listener to ButtonA
        buttonAEntity.element.on('click', this.changeCamera, this);
    } else {
        console.error('ButtonA or Camera entity not found.');
    }
};

CameraControl.prototype.changeCamera = function() {
    // Set the new camera as the active camera
    this.app.root.camera = this.cameraEntity.camera;
};

// swap method called for script hot-reloading
// inherit your script state here
// CameraControl.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/