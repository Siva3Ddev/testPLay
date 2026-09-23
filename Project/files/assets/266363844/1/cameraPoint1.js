var CameraPoint1 = pc.createScript('cameraPoint1');

CameraPoint1.attributes.add('moveCamera', {type: 'entity'});
CameraPoint1.attributes.add('moveTarget', {type: 'entity'});
CameraPoint1.attributes.add('pivotPoint', {type: 'entity'});

// initialize code called once per entity
CameraPoint1.prototype.initialize = function() {
    var camera1 = this.app.root.findByName('Main_Camera');
    var camera2 = this.app.root.findByName('movable_Camera');
    var buttonCEntity = this.app.root.findByName('ButtonC');
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');

    var activeCamera = camera1;
    camera2.enabled = false;

    var transitionDuration = 0.3; // Set to zero for instant transition
    var transitionTime = transitionDuration;
    var camera1Position = camera1.getPosition();
    var camera2Position = camera2.getPosition();

    if (buttonCEntity && camera1 && camera2) {
        buttonCEntity.element.on('click', function (event) {
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
        console.error('buttonC or Camera entities not found.');
    }

    
    this.entity.button.on('click', function(event) {
        const orbitCameraScript = this.moveCamera.script.orbitCamera;
        orbitCameraScript.resetAndLookAtPoint(this.moveTarget.getPosition(), this.pivotPoint.getPosition());
    }, this);
};

// update code called every frame
//CameraPoint1.prototype.update = function(dt) {

//};

// swap method called for script hot-reloading
// inherit your script state here
// CameraPoint1.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/