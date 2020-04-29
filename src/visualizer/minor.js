const Util = require("./util");
const MovingPerson = require("./moving_person")


const DEFAULTS = {
    RADIUS: 3.85, COLOR: "#f59338", SPEED: .6, AGE: "minor", SICKCOLOR: "#32a850", MASS: 5, DICEASEDCOLOR: "#808080", RECOVERED: "#ff6161"
}

function Minor(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.mass = DEFAULTS.MASS
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED)
    MovingPerson.call(this, options)
}
Util.inherits(Minor, MovingPerson);

Minor.prototype.collideWith = function collideWith(otherPerson) {
    let newVel = Util.randomVec(.3)
    let newType = "infected";
    let newColor = DEFAULTS.SICKCOLOR;
    if (this.type === "well" && otherPerson.type === "infected") {
        this.Vel = newVel
        this.type = newType;
        this.color = newColor;
    }
    else if (this.type === "infected" && otherPerson.type === "well") {
        otherPerson.Vel = newVel
        otherPerson.type = newType;
        otherPerson.color = newColor;
    }

    // let newVel = Util.redirect(this.vel, otherPerson.vel);
    // this.vel = newVel[0];
    // otherPerson.vel = newVel[1]
}
Minor.prototype.progressDisease = function progressDisease() {
    let that = this;
    setTimeout(function () {
           if (Util.determineFate("minor")) {
            that.recover()
        } else {
            that.die()
        };
        // that.die()
    }, 2000)
}
Minor.prototype.die = function die() {
    setTimeout(function () {
        this.type = "diceased"
        this.color = DEFAULTS.DICEASEDCOLOR;
        this.vel = [0, 0]
    }, 6000)
}
Minor.prototype.recover = function recover() {
    setTimeout(function () {
        this.color = DEFAULTS.RECOVERED   
    }, 10000)
}

module.exports = Minor;