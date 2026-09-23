var Transparent = pc.createScript('transparent');

// initialize code called once per entity
Transparent.prototype.initialize = function() {
    var bd = document.getElementsByTagName('body')[0];
    var ht = document.getElementsByTagName('html')[0];
    var cv = document.getElementsByTagName('canvas')[0];
    bd.style.backgroundColor="transparent";
    ht.style.backgroundColor="transparent";
    cv.style.backgroundColor="transparent";

    // var buttonGoBackEntity = this.app.root.findByName('ButtonGoBack');
    // buttonGoBackEntity.enabled = false;   

};

   

// update code called every frame
Transparent.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// Transparent.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/