class Center {
    x = 0;
    y = 0;
    radius = 25;
    active = false;
    col = null;
    number = 0;

    constructor(xPoint, yPoint, color, number) {
        this.x = xPoint;
        this.y = yPoint;
        this.col = color;
        this.number = number;
    }

    display(){
        fill(this.col);
        ellipse(this.x, this.y, this.radius, this.radius);
        text(this.number, this.x-3, this.y+30);
    }

    centerPressed() {
        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.radius/2) 
            this.active = true;
        else
            this.active = false;
        return this.active;
    }
    
    mouseDragged() {
        if (this.active) {
            this.x = Math.round(mouseX);
            this.y = Math.round(mouseY);
        }
        return false;
    }
}

