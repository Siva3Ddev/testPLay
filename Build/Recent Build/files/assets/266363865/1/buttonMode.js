var ButtonMode = pc.createScript('buttonMode');

// initialize code called once per entity
ButtonMode.prototype.initialize = function() {
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mouseleave', this.onLeave, this);
};

ButtonMode.prototype.onEnter = function (event)
{
    document.body.style.cursor = 'pointer';
};

ButtonMode.prototype.onLeave = function (event)
{
    document.body.style.cursor = 'default'; 
};

// update code called every frame
ButtonMode.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// ButtonMode.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/