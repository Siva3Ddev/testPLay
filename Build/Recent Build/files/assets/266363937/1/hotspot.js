var Hotspot = pc.createScript('hotspot');

// Attributes to define the camera and control parameters.
Hotspot.attributes.add("radius", { type: "number", default:0.03, title: "Radius" });
Hotspot.attributes.add("fadeDropOff", {
    type: "number",
    default: 0.4,
    title: "Fade Drop Off",
    description: "When to start fading out hotspot relative to the camera direction. 1 for when hotspot is directly inline with the camera. 0 for never."
});

// Initialize function called once per entity
Hotspot.prototype.initialize = function() {
    this.cameraEntity = this.app.root.findByName("Camera");
    this.currentAudio = null;
    this.hitArea = new pc.BoundingSphere(this.entity.getPosition(), this.radius);
    this.ray = new pc.Ray();
    this.defaultForwardDirection = this.entity.forward.clone();
    this.directionToCamera = new pc.Vec3();
    this.sprite = this.entity.children[0];
    this.meshInstances = this.collectMeshInstances();
  
    // Register mouse and touch events
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
    }

    this.on('destroy', this.onDestroy.bind(this));
};

// Collect mesh instances from children
Hotspot.prototype.collectMeshInstances = function() {
    let instances = [];
    const renders = this.sprite.findComponents('render');
    for (const render of renders) {
        instances.push(...render.meshInstances);
    }
    return instances;
};

// Update function called every frame
Hotspot.prototype.update = function(dt) {
    const cameraPosition = this.cameraEntity.getPosition();
    this.entity.lookAt(cameraPosition);
    
    this.directionToCamera.sub2(cameraPosition, this.entity.getPosition()).normalize();
  
    const dot = this.directionToCamera.dot(this.defaultForwardDirection);
    this.handleVisibilityAndFading(dot);
};

// Handle visibility and fading based on the dot product
Hotspot.prototype.handleVisibilityAndFading = function(dot) {
    if (dot < 0) {
        if (this.sprite.enabled) {
            this.sprite.enabled = true;
        }
    } else {
        if (!this.sprite.enabled) {
            this.sprite.enabled = true;
        }

        const alpha = pc.math.clamp(dot / this.fadeDropOff, 0, 1);
        for (const meshInstance of this.meshInstances) {
            meshInstance.setParameter("material_opacity", alpha);
        }
    }
};

Hotspot.prototype.doRayCast = function(screenPosition) {
    if (this.sprite.enabled) {
        this.cameraEntity.camera.screenToWorld(screenPosition.x, screenPosition.y, this.cameraEntity.camera.farClip, this.ray.direction);
        this.ray.origin.copy(this.cameraEntity.getPosition());
        this.ray.direction.sub(this.ray.origin).normalize();

        if (this.hitArea.intersectsRay(this.ray)) {
            this.entity.fire("pulse:start");
        }
    }
};

Hotspot.prototype.onMouseDown = function(event) {
    if (event.button === pc.MOUSEBUTTON_LEFT) {
        this.doRayCast(event);
    }
};

Hotspot.prototype.onTouchStart = function(event) {
    if (event.touches.length === 1) {
        this.doRayCast(event.touches[0]);
        event.event.preventDefault(); // Prevent default behavior
    }
};

Hotspot.prototype.onDestroy = function() {
    this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    if (this.app.touch) {
        this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
    }
};
