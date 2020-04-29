const Util = require("./util");
const MovingPerson = require("./moving_person")


const DEFAULTS = {
    RADIUS: 4.8, COLOR: "#60b4f8", SPEED: .8, AGE: "senior", SICKCOLOR: "#32a850", MASS: 8, DICEASEDCOLOR: "#808080", RECOVERED: "#ff6161"
}

function Senior(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.mass = DEFAULTS.MASS
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED)

    MovingPerson.call(this, options)
    // new MovingPerson(this, options)
}
Util.inherits(Senior, MovingPerson);

Senior.prototype.collideWith = function collideWith(otherPerson) {
        let newType = "infected";
        let newColor = DEFAULTS.SICKCOLOR;
        let newVel = Util.randomVec(.4)
    if (otherPerson.type === "infected" && this.type === "well") {
        this.vel = newVel;
        this.type = newType;
        this.color = newColor;
    }  
     else if (this.type === "infected" && otherPerson.type === "well") {
        otherPerson.Vel = newVel
        otherPerson.type = newType;
        otherPerson.color = newColor;
    }
}
Senior.prototype.progressDisease = function progressDisease() {
    let that = this;
    setTimeout(function () {
        if (Util.determineFate("senior")) {
            that.recover()
        } else {
            that.die()
        };
    }, 2000)
}
Senior.prototype.die = function die() {
    setTimeout(function () {
        this.type = "diceased"
        this.color = DEFAULTS.DICEASEDCOLOR;
        this.vel = [0, 0];
        
    }, 6000)
}
Senior.prototype.recover = function recover() {
         setTimeout(function () {
        this.color = DEFAULTS.RECOVERED   
    }, 12000)
}


module.exports = Senior;