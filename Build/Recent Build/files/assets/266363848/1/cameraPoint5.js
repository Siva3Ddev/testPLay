var cameraPoint5 = pc.createScript('cameraPoint5');

cameraPoint5.attributes.add('moveCamera', { type: 'entity' });
cameraPoint5.attributes.add('moveTarget', { type: 'entity' });
cameraPoint5.attributes.add('pivotPoint', { type: 'entity' });

cameraPoint5.prototype.initialize = function () {
    var camera1 = this.app.root.findByName('movable_Camera');
    var camera2 = this.app.root.findByName('Main_Camera');
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');
    var activeCamera = camera1;

    var transitionDuration = 0.3; // Set to zero for instant transition
    var transitionTime = transitionDuration;
    var camera1Position = camera1.getPosition();
    var camera2Position = camera2.getPosition();

    if (buttonGoBackEntity && camera1 && camera2) {
        buttonGoBackEntity.element.on('click', function (event) {
            transitionTime = 0;
            if (activeCamera === camera1) {
                camera1.enabled = false;
                camera2.enabled = true;
                activeCamera = camera2;
            } else {
                camera2.enabled = true;
                camera1.enabled = false;
                activeCamera = camera2;
            }

            // Disable the ButtonGoBack entity
            buttonGoBackEntity.enabled = false;            
        }, this);

        this.app.on('update', function (dt) {
            if (transitionTime < transitionDuration) {
                transitionTime += dt;
                var t = pc.math.clamp(transitionTime / transitionDuration, 0, 1);
                var interpolatedPosition = new pc.Vec3();
                interpolatedPosition.lerp(camera1Position, camera2Position, t);
                activeCamera.setPosition(interpolatedPosition);
            }
        });
    } else {
        console.error('ButtonGoBack or Camera entities not found.');
    }

    this.entity.element.on('click', function (event) {
        const orbitCameraScript = this.moveCamera.script.orbitCamera;
        orbitCameraScript.resetAndLookAtPoint(this.moveTarget.getPosition(), this.pivotPoint.getPosition());
    }, this);
};
