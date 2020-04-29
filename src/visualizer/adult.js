const Util = require("./util");
const MovingPerson = require("./moving_person")


const DEFAULTS = {
    RADIUS: 6, COLOR: "#6666e8", SPEED: 1.5, AGE: "adult", SICKCOLOR: "#32a850", MASS: 10, DICEASEDCOLOR: "#808080", RECOVERED: "#ff6161" //, SICK: false
}

function Adult(options) {
    options = options || {};
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    options.type = options.type;
    options.mass = DEFAULTS.MASS;
    options.color = options.type === "well" ? DEFAULTS.COLOR : DEFAULTS.SICKCOLOR;
    MovingPerson.call(this, options);
    // new MovingPerson(this, option
}
Util.inherits(Adult, MovingPerson);

Adult.prototype.collideWith = function collideWith(otherPerson) {
    let newType = "infected";
    let newColor = DEFAULTS.SICKCOLOR;
    let newVel = Util.randomVec(.75);
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
Adult.prototype.progressDisease = function progressDisease() {
    let that = this;
   
    setTimeout(function () {
          if (Util.determineFate("adult")) {
            that.recover()
        } else {
            that.die()
        };
    }, 6000)
}
Adult.prototype.die = function die() {
    setTimeout(function () {
        this.type = "diceased"
        this.color = DEFAULTS.DICEASEDCOLOR;
        this.vel = [0, 0];
    }, 6000)
}
Adult.prototype.recover = function recover() {
      setTimeout(function () {
        this.color = DEFAULTS.RECOVERED   
    }, 9000)
}

module.exports = Adult;