const Util = require("./util");
const MovingPerson = require("./moving_person")


const DEFAULTS = {
    RADIUS: 4, COLOR: "#b21c1c", SPEED: 1, AGE: "teen", SICKCOLOR: "#32a850", MASS: 7, DICEASEDCOLOR: "#808080", RECOVERED: "#ff6161"
}

function Teen(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.mass = DEFAULTS.MASS
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED)

    MovingPerson.call(this, options)
    // new MovingPerson(this.options)
}
Util.inherits(Teen, MovingPerson);

Teen.prototype.collideWith = function collideWith(otherPerson) {
    let newType = "infected";
    let newColor = DEFAULTS.SICKCOLOR;
    let newVel = Util.randomVec(.5)
    if (this.type === "well" && otherPerson.type === "infected") {
        this.type = newType;
        this.color = newColor;
        this.vel = newVel;
    }  
     else if (this.type === "infected" && otherPerson.type === "well") {
        otherPerson.Vel = newVel
        otherPerson.type = newType;
        otherPerson.color = newColor;
    }
}
Teen.prototype.progressDisease = function progressDisease() {
    let that = this;
    setTimeout(function () {
        if (Util.determineFate("teen")) {
            that.recover()
        } else {
            that.die()
        };
    }, 4000)
}
Teen.prototype.recover = function recover() {
      setTimeout(function () {
        this.color = DEFAULTS.RECOVERED   
    }, 9000)
}

Teen.prototype.die = function die() {
    setTimeout(function () {
        this.type = "diceased"
        this.color = DEFAULTS.DICEASEDCOLOR;
        this.vel = [0, 0];
    }, 6000)
}




module.exports = Teen;