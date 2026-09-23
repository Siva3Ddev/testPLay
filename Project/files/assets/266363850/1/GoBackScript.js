var GoBackScript = pc.createScript('goBackScript');

GoBackScript.attributes.add('mainCameraEntity', { type: 'entity' });
GoBackScript.attributes.add('movableCameraEntity', { type: 'entity' });

GoBackScript.prototype.initialize = function () {
    this.transitionDuration = 1; // Adjust the transition duration as needed
    this.transitionTime = 0;
    this.camera1Position = this.mainCameraEntity.getPosition().clone();
    this.camera2Position = this.movableCameraEntity.getPosition().clone();
    this.activeCamera = this.mainCameraEntity;

    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');

    if (buttonGoBackEntity) {
        buttonGoBackEntity.element.on('click', this.onGoBackButtonClick, this);
    } else {
        console.error('ButtonGoBack entity not found.');
    }
};

GoBackScript.prototype.onGoBackButtonClick = function (event) {
    this.transitionTime = 0;
    this.activeCamera = this.mainCameraEntity;
};

GoBackScript.prototype.update = function (dt) {
    if (this.transitionTime < this.transitionDuration) {
        this.transitionTime += dt;
        var t = pc.math.clamp(this.transitionTime / this.transitionDuration, 0, 1);
        var interpolatedPosition = new pc.Vec3();
        interpolatedPosition.lerp(this.camera2Position, this.camera1Position, t);
        this.activeCamera.setPosition(interpolatedPosition);
    }
};
