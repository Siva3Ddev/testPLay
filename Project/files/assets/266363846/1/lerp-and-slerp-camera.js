var LerpAndSlerpCamera = pc.createScript('lerpAndSlerpCamera');

// Have references to two points with positional and rotational data
LerpAndSlerpCamera.attributes.add("pointA", {type: "entity", title: "Point A"});
LerpAndSlerpCamera.attributes.add("pointB", {type: "entity", title: "Point B"});

LerpAndSlerpCamera.attributes.add("duration", {type: "number", default: 5, title: "Duration (Secs)"});

// initialize code called once per entity
LerpAndSlerpCamera.prototype.initialize = function() {
    this.time = 0;
};

// update code called every frame
LerpAndSlerpCamera.prototype.update = function(dt) {
    this.time += dt; 
    if (this.time > this.duration) {
        this.time -= this.duration;
    }    
    
    var percent = this.time / this.duration;
    
    var angle = this.entity.getRotation();
    var position = this.entity.getPosition();
    
    // Use slerp to smoothly interpolate between two angles
    // http://developer.playcanvas.com/en/api/pc.Quat.html#slerp
    angle.slerp(this.pointA.getRotation(), this.pointB.getRotation(), percent);
    
    // Use lerp to smoothly interpolate between two positions
    // http://developer.playcanvas.com/en/api/pc.Vec3.html#lerp
    position.lerp(this.pointA.getPosition(), this.pointB.getPosition(), percent);
    
    this.entity.setRotation(angle);
    this.entity.setPosition(position);
};
