var GoBackButtonScript = pc.createScript('goBackButton');

GoBackButtonScript.prototype.initialize = function () {
    var camera1 = this.app.root.findByName('Main_Camera');
    var camera2 = this.app.root.findByName('movable_Camera');
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');
    var activeCamera = camera1;
    camera2.enabled = false;

    var transitionDuration = 0; // Set to zero for instant transition
    var transitionTime = transitionDuration;
    var camera1Position = camera1.getPosition();
    var camera2Position = camera2.getPosition();

    if (buttonGoBackEntity && camera1 && camera2) {
        buttonGoBackEntity.element.on('click', function (event) {
            transitionTime = 0;
            if (activeCamera === camera2) { // Check if the active camera is 'movable_Camera'
                camera2.enabled = false;
                camera1.enabled = true;
                activeCamera = camera1;
            }
        }, this);

        this.app.on('update', function (dt) {
            if (transitionTime < transitionDuration) {
                transitionTime += dt;
                var t = pc.math.clamp(transitionTime / transitionDuration, 0, 1);
                var interpolatedPosition = new pc.Vec3();
                interpolatedPosition.lerp(camera2Position, camera1Position, t); // Interpolate from camera2 to camera1
                activeCamera.setPosition(interpolatedPosition);

                if (t === 1) {
                    transitionTime = transitionDuration;
                }
            }
        });
    } else {
        console.error('ButtonGoBack or Camera entities not found.');
    }
};
