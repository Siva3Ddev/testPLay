var ScaleByDistance = pc.createScript('scaleByDistance');

// Assign your target entities (array)
ScaleByDistance.attributes.add('targetEntities', {
    type: 'entity',
    array: true,
    title: 'Target Entities'
});

// Reference to the camera entity
ScaleByDistance.attributes.add('cameraEntity', {
    type: 'entity',
    title: 'Camera Entity'
});

// Set the minimum and maximum distances for scaling
ScaleByDistance.attributes.add('minDistance', {
    type: 'number',
    default: 0.5,
    title: 'Min Distance (scale=1)'
});
ScaleByDistance.attributes.add('maxDistance', {
    type: 'number',
    default: 4,
    title: 'Max Distance (scale=2)'
});

// Set the minimum and maximum scales
ScaleByDistance.attributes.add('minScale', {
    type: 'number',
    default: 1,
    title: 'Min Scale (near)'
});
ScaleByDistance.attributes.add('maxScale', {
    type: 'number',
    default: 2.5,
    title: 'Max Scale (far)'
});

ScaleByDistance.prototype.update = function(dt) {
    var cameraPos = this.cameraEntity.getPosition();

    for (var i = 0; i < this.targetEntities.length; i++) {
        var entity = this.targetEntities[i];
        if (!entity) continue;
        var entityPos = entity.getPosition();
        var distance = cameraPos.distance(entityPos);

        // Clamp distance between min and max
        var t = (distance - this.minDistance) / (this.maxDistance - this.minDistance);
        t = pc.math.clamp(t, 0, 1);

        // Interpolate scale
        var scale = pc.math.lerp(this.minScale, this.maxScale, t);

        // Apply the scale uniformly
        entity.setLocalScale(scale, scale, scale);
    }
};
