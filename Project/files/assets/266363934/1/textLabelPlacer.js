

var TextLabelPlacer = pc.createScript('textLabelPlacer');


// Initialize the script
TextLabelPlacer.prototype.initialize = function () {

    // Check if we have enough children
    if (this.entity.children.length < 3) {
        // Avoid console.error and simply return if children are insufficient
        return;
    }

    // Accessing child entities directly by their indices
    this.startPoint = this.entity.children[0]; // First Child for StartPoint
    this.endPoint = this.entity.children[1];   // Second Child for EndPoint
    this.textBox = this.entity.children[2];    // Third Child for TextBox Image

    // Ensure textBox has an element and available texture
    if (this.textBox && this.textBox.element && this.textBox.texture) {
        this.textBox.element.texture = this.textBox.texture;
    }
};

TextLabelPlacer.prototype.update = function () {
    this.setupLine(); // Setup line between start and end points
};

// Setup line between startPoint and endPoint
TextLabelPlacer.prototype.setupLine = function () {
    // Check for startPoint and endPoint, and proceed only if defined
    if (this.startPoint && this.endPoint) {
        var startPointPos = this.startPoint.getPosition();
        var endPointPos = this.endPoint.getPosition();

        this.app.drawLine(startPointPos, endPointPos, new pc.Color(255, 255, 0)); // Pure red

        // Set the text box position
        var textBoxPos = endPointPos.clone();
        textBoxPos.y += 0; // Adjust Y position as needed
        this.textBox.setPosition(textBoxPos);
        this.textBox.enabled = true;
    }
    // Remove error logging to avoid flooding the console
};

// Additional considerations can be added as needed.
