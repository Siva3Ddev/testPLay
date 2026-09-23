// Ui script
var Ui = pc.createScript('ui');

Ui.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Ui.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

// Button 1
Ui.attributes.add('lookAtEntity', { type: 'entity', title: 'lookAtPoint' });
Ui.attributes.add('camEntity', { type: 'entity', title: 'camEntity' });

// Button 2
Ui.attributes.add('lookAtEntity2', { type: 'entity', title: 'lookAtPoint 2' });
Ui.attributes.add('camEntity2', { type: 'entity', title: 'camEntity 2' });

// Button 3
Ui.attributes.add('lookAtEntity3', { type: 'entity', title: 'lookAtPoint 3' });
Ui.attributes.add('camEntity3', { type: 'entity', title: 'camEntity 3' });

// Button 4
Ui.attributes.add('lookAtEntity4', { type: 'entity', title: 'lookAtPoint 4' });
Ui.attributes.add('camEntity4', { type: 'entity', title: 'camEntity 4' });

Ui.prototype.initialize = function () {
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';
    document.body.appendChild(this.div);

    this.counter = 0;

    this.bindEvents();
};

Ui.prototype.bindEvents = function () {
    var self = this;

    // Button 1 click event
    var button1 = document.getElementById('btn1');
    if (button1) {
        button1.addEventListener('click', function () {
            console.log('button 1 clicked');
            self.fire('buttonClick1', self.camEntity.getPosition(), self.lookAtEntity.getPosition());
            self.resetOtherButtons(button1); // Reset classes for other buttons
            toggleButtonClass(button1); // Call toggle function for button1
        }, false);
    }

    // Button 2 click event
    var button2 = document.getElementById('btn2');
    if (button2) {
        button2.addEventListener('click', function () {
            console.log('button 2 clicked');
            self.fire('buttonClick2', self.camEntity2.getPosition(), self.lookAtEntity2.getPosition());
            self.resetOtherButtons(button2); // Reset classes for other buttons
            toggleButtonClass(button2); // Call toggle function for button2
        }, false);
    }

    // Button 3 click event
    var button3 = document.getElementById('btn3');
    if (button3) {
        button3.addEventListener('click', function () {
            console.log('button 3 clicked');
            self.fire('buttonClick3', self.camEntity3.getPosition(), self.lookAtEntity3.getPosition());
            self.resetOtherButtons(button3); // Reset classes for other buttons
            toggleButtonClass(button3); // Call toggle function for button3
        }, false);
    }

    // Button 4 click event
    var button4 = document.getElementById('btn4');
    if (button4) {
        button4.addEventListener('click', function () {
            console.log('button 4 clicked');
            self.fire('buttonClick4', self.camEntity4.getPosition(), self.lookAtEntity4.getPosition());
            self.resetOtherButtons(button4); // Reset classes for other buttons
            toggleButtonClass(button4); // Call toggle function for button4
        }, false);
    }
};

Ui.prototype.resetOtherButtons = function (currentButton) {
    // Reset classes for other buttons
    var buttons = document.querySelectorAll('.side-menu-li-active-mini');
    buttons.forEach(function (button) {
        if (button.id !== currentButton.id) {
            button.classList.remove('side-menu-li-active-mini');
            button.classList.remove('active');
        }
    });
};



function toggleButtonClass(button) {
    // Reset classes for all buttons
    var buttons = document.querySelectorAll('.side-menu-li-active-mini');
    buttons.forEach(function (btn) {
        btn.classList.remove('side-menu-li-active-mini');
        btn.classList.remove('active');
    });

    // Toggle the class for the clicked button
    button.classList.toggle('side-menu-li-active-mini');
    button.classList.toggle('active');
}

