var CameraPoint3 = pc.createScript('cameraPoint3');

CameraPoint3.attributes.add('moveCamera', {type: 'entity'});

// initialize code called once per entity
CameraPoint3.prototype.initialize = function () {
    var camera1 = this.app.root.findByName('Main_Camera');
    var camera2 = this.app.root.findByName('movable_Camera');
    var buttonBEntity = this.app.root.findByName('ButtonB');
    var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');
    
    var activeCamera = camera1;
    camera2.enabled = false;

    var transitionDuration = 0.3; // Set to zero for instant transition
    var transitionTime = transitionDuration;
    var camera1Position = camera1.getPosition();
    var camera2Position = camera2.getPosition();

    if (buttonBEntity && camera1 && camera2) {
        buttonBEntity.element.on('click', function (event) {
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
        console.error('buttonB or Camera entities not found.');
    }

    this.moveCamera = this.app.root.findByName('movable_Camera');
    this.moveTarget = this.app.root.findByName('Target_C');
    this.pivotPoint = this.app.root.findByName('PivotPoint_C');

    this.entity.button.on('click', function (event) {
        const orbitCameraScript = this.moveCamera.script.orbitCamera;
        orbitCameraScript.resetAndLookAtPoint(this.moveTarget.getPosition(), this.pivotPoint.getPosition());
    }, this);
};

// update code called every frame
CameraPoint3.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// CameraPoint3.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/