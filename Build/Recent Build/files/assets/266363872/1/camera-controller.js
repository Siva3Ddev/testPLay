var CameraController = pc.createScript('cameraController');

CameraController.attributes.add('secsIdleAutoOrbit', {
    type: 'number', 
    default: 2, 
    title: 'Secs Idle Auto Orbit', 
});

CameraController.attributes.add('autoOrbitSpeed', {
    type: 'number', 
    default: 2, 
    title: 'Auto orbit speed', 
});

CameraController.attributes.add('autoOrbitPitch', {
    type: 'number', 
    default: 2, 
    title: 'Auto orbit pitch', 
});

CameraController.attributes.add('autoOrbitDistance', {
    type: 'number', 
    default: 2, 
    title: 'Auto orbit distance', 
});


Object.defineProperty(CameraController.prototype, "distance", {
    get: function() {
        return this.orbitCamera.distance;
    },

    set: function(value) {
        this.orbitCamera.distance = value;
        this.secsSinceUserInput = 0;
    }
});


Object.defineProperty(CameraController.prototype, "pitch", {
    get: function() {
        return this.orbitCamera.pitch;
    },

    set: function(value) {
        this.orbitCamera.pitch = value;
        this.secsSinceUserInput = 0;
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(CameraController.prototype, "yaw", {
    get: function() {
        return this.orbitCamera.yaw;
    },

    set: function(value) {
        this.orbitCamera.yaw = value;
        this.secsSinceUserInput = 0;
    }
});


CameraController.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    this.secsSinceUserInput = 0;
};


// update code called every frame
CameraController.prototype.update = function(dt) {
    this.secsSinceUserInput += dt;
    
    if (this.secsSinceUserInput > this.secsIdleAutoOrbit) {
        // this.orbitCamera.distance = pc.math.lerp(this.orbitCamera.distance, this.autoOrbitDistance, 0.05);
        // this.orbitCamera.pitch = pc.math.lerp(this.orbitCamera.pitch, this.autoOrbitPitch, 0.05);
        this.orbitCamera.yaw += this.autoOrbitSpeed * dt;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// CameraController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/