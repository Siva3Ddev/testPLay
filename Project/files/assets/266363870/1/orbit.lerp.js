OrbitCamera.prototype.update = function(dt) {


    // Add inertia, if any
    var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

    this.app.on("camera:transition", (target) => {
        this.startPosition = this.entity.getPosition();
        this.endPosition = new pc.Vec3(target.x, target.y, target.z);
        this.time = 0;
    });

    if (this.startPosition && this.endPosition) {
        this.time += (dt * 1.5) ;
        if (this.time > this.duration) {
            this.time -= this.duration;
        }

        var alpha = this.time / this.duration;
        this.entityPosition = this.entity.getPosition();
        this.entityPosition.lerp(this.startPosition, this.endPosition, alpha);
        if(Math.round(this.endPosition.x * 10)/10  === Math.round(this.entityPosition.x *10 )/10
            && Math.round(this.endPosition.y *10)/10 === Math.round( this.entityPosition.y *10)/10
            && Math.round(this.endPosition.z * 10 ) / 10 === Math.round(this.entityPosition.z * 10) / 10) {
            console.log('Transition Completed');
            this.endPosition = null;
        } else {
            this.resetAndLookAtPoint(this.entityPosition, this.pivotPoint);
        }
    } else {
        this._updatePosition();
    }

};