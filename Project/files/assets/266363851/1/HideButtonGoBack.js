var HideButtonGoBack = pc.createScript('hideButtonGoBack');

HideButtonGoBack.prototype.initialize = function() {
    this.vec = new pc.Vec3();
    this.currentCamera = 'Main_Camera'; // Initial camera
    this.entity.lookAt(this.findCameraPosition(this.currentCamera));
    this.entity.rotateLocal(270, 0, 0);

    // Find ButtonA, ButtonB, and ButtonC in the scene
    var buttonAEntity = this.app.root.findByName('ButtonA');
    var buttonBEntity = this.app.root.findByName('ButtonB');
    var buttonCEntity = this.app.root.findByName('ButtonC');
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack'); // Add ButtonGoBack entity

    // Disable ButtonGoBack initially if Main_Camera is active
    if (this.currentCamera === 'Main_Camera' && buttonGoBackEntity) {
        buttonGoBackEntity.element.enabled = false;
    }

    // Listen for button clicks on ButtonA
    if (buttonAEntity) {
        buttonAEntity.element.on('click', function () {
            this.onButtonClick('ButtonA');
        }, this);
    }

    // Listen for button clicks on ButtonB
    if (buttonBEntity) {
        buttonBEntity.element.on('click', function () {
            this.onButtonClick('ButtonB');
        }, this);
    }

    // Listen for button clicks on ButtonC
    if (buttonCEntity) {
        buttonCEntity.element.on('click', function () {
            this.onButtonClick('ButtonC');
        }, this);
    }

    // Listen for button clicks on ButtonGoBack
    if (buttonGoBackEntity) {
        buttonGoBackEntity.element.on('click', function () {
            this.onButtonClick('ButtonGoBack');
        }, this);
    }
};

// Update function
HideButtonGoBack.prototype.update = function(dt) {
    this.vec.copy(this.findCameraPosition(this.currentCamera));
    this.vec.y = this.entity.getPosition().y;

    // Make the object face the current camera
    this.entity.lookAt(this.vec);

    // Adjust the object's rotation to align it properly
    this.entity.rotateLocal(270, 0, 0); // You may need to adjust these values
};

// Event handler for button click
HideButtonGoBack.prototype.onButtonClick = function(buttonName) {
    if (buttonName === 'ButtonGoBack') {
        // Switch to the movable_Camera when ButtonGoBack is clicked
        this.currentCamera = 'movable_Camera';
    } else {
        // Switch to the movable_Camera when any button is clicked
        this.currentCamera = 'movable_Camera';
    }

    // Toggle ButtonGoBack visibility based on the active camera
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');
    if (this.currentCamera === 'Main_Camera' && buttonGoBackEntity) {
        buttonGoBackEntity.element.enabled = false;
    } else if (buttonGoBackEntity) {
        buttonGoBackEntity.element.enabled = true;
    }
};

// Helper function to find camera position by name
HideButtonGoBack.prototype.findCameraPosition = function(cameraName) {
    var cameraEntity = this.app.root.findByName(cameraName);
    if (cameraEntity) {
        return cameraEntity.getPosition();
    } else {
        // If the camera with the given name is not found, return a default position
        return new pc.Vec3(0, 0, 0);
    }
};
