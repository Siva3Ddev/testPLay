var CameraPoint2 = pc.createScript('cameraPoint2');

CameraPoint2.prototype.initialize = function () {
    var camera1 = this.app.root.findByName('Main_Camera');
    var camera2 = this.app.root.findByName('movable_Camera');
    var buttonAEntity = this.app.root.findByName('ButtonA');
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');

    var activeCamera = camera1;
    camera2.enabled = false;

    var transitionDuration = 0.3; // Set to zero for instant transition
    var transitionTime = transitionDuration;
    var camera1Position = camera1.getPosition();
    var camera2Position = camera2.getPosition();

    if (buttonAEntity && camera1 && camera2) {
        buttonAEntity.element.on('click', function (event) {
            transitionTime = 0;
            if (activeCamera === camera1) {
                camera1.enabled = false;
                camera2.enabled = true;
                activeCamera = camera2;
                // Emit the 'camera:set' event to notify the camera change
                this.app.fire('camera:set', activeCamera);
            } else {
                camera2.enabled = true;
                camera1.enabled = false;
                activeCamera = camera2;

                // Emit the 'camera:set' event to notify the camera change
                this.app.fire('camera:set', activeCamera);
            }

            buttonGoBackEntity.enabled = true; 
        }, this);

        this.app.on('update', function (dt) {
            if (transitionTime < transitionDuration) {
                transitionTime += dt;
                var t = pc.math.clamp(transitionTime / transitionDuration, 0, 1);
                var interpolatedPosition = new pc.Vec3();
                interpolatedPosition.lerp(camera1Position, camera2Position, t);
                activeCamera.setPosition(interpolatedPosition);

                if (t === 1) {
                    transitionTime = transitionDuration;
                }
            }
        });
    } else {
        console.error('ButtonA or Camera entities not found.');
    }

    this.moveCamera = this.app.root.findByName('movable_Camera');
    this.moveTarget = this.app.root.findByName('Target_B');
    this.pivotPoint = this.app.root.findByName('PivotPoint_B');

    this.entity.button.on('click', function (event) {
        const orbitCameraScript = this.moveCamera.script.orbitCamera;
        orbitCameraScript.resetAndLookAtPoint(this.moveTarget.getPosition(), this.pivotPoint.getPosition());
    }, this);
};
