class City {
    x = 0;
    y = 0;
    radius = 25;
    active = false;
    col = color(0,0,255);

    constructor(xPoint, yPoint) {
        this.x = xPoint;
        this.y = yPoint;
    }

    display(){
        fill(this.col);
        ellipse(this.x, this.y, this.radius, this.radius);
        let coordinatesText = '('+this.x+','+this.y+')';
        fill(0)
        text(coordinatesText, this.x-this.radius, this.y-this.radius);
    }

    cityPressed() {
        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.radius/2) 
            this.active = true;
        else
            this.active = false;
        return this.active;
    }
    
    mouseDragged() {
        if (this.active) {
            if((width*0.001 < mouseX && mouseX < (width - width*0.001)) && (height*0.001 < mouseY && mouseY < (height - height*0.001))){
                this.x = Math.round(mouseX);
                this.y = Math.round(mouseY);
            }
        }
        return false;
    }
}

