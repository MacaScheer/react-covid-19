// const MovingPerson = require("./moving_person.js");
const Minor = require("./minor.js");
const Teen = require("./teen.js");
const Adult = require("./adult.js");
const Senior = require("./senior.js");
const Util = require("./util");
// const Locale = require("./locale.js")

function Scenario(ctx, demoObj, demSick) {
    
    this.population = demoObj.population;
    this.ctx = ctx;
    this.sickMinors = demSick.minors;
    this.sickTeens = demSick.teens;
    this.sickAdults = demSick.adults;
    this.sickSeniors = demSick.seniors;
    this.numMinors = Math.floor(demoObj.population * demoObj.percentMinors);
    this.numTeens = Math.floor(demoObj.population * demoObj.percentTeens);
    this.numAdults = Math.floor(demoObj.population * demoObj.percentAdults);
    this.numSeniors = Math.floor(demoObj.population * demoObj.percentSeniors);
    this.popDensity = Math.floor(this.area / this.population);
    this.infectedMinors = [];
    this.infectedTeens = [];
    this.infectedAdults = [];
    this.infectedSeniors = [];
    this.minors = [];
    this.teens = [];
    this.adults = [];
    this.seniors = [];
    this.infected = [];
    this.addPersons()
    // this.city = obj.city;
    // this.censusObject = {};
    // this.area = demoObj.area;
    // this.numRelig = demoObj.numrelig;
    // this.ageDemo = demoObj.ageDemo;
    // this.size
    
}

Scenario.MORT_RATE_SENIOR = 47.7;
Scenario.MORT_RATE_ADULT = 52.2;
Scenario.MORT_RATE_TEEN = .02;
Scenario.MORT_RATE_MINOR = .02;

Scenario.BG_COLOR = "#ededed";
Scenario.DIM_X = 1000;
Scenario.DIM_Y = 600;
Scenario.FPS = 32;
Scenario.NUM_PPL = this.population ||20;
// Scenario.NUM_MINORS = this.numMinors || 3;
// Scenario.NUM_TEENS = this.numTeens || 4;
// Scenario.NUM_ADULTS = this.numAdults || 8;
// Scenario.NUM_SENIORS = 5;
// Scenario.NUM_SICK = (this.sickMinors + this.sickTeens + this.sickAdults + this.sickSeniors) || 3;
Scenario.prototype.randomPosition = function randomPosition() {
    return [
        Scenario.DIM_X * Math.random(),
        Scenario.DIM_Y * Math.random()
    ];
};
Scenario.prototype.add = function add(object) {
    if (object instanceof Minor) {
        this.minors.push(object)
        if (object.type === "infected") this.infectedMinors.push(object)
    } else if (object instanceof Teen) {
        this.teens.push(object)
        if (object.type === "infected") this.infectedTeens.push(object)
    } else if (object instanceof Adult) {
        this.adults.push(object)
        if (object.type === "infected") this.infectedAdults.push(object)
    } else if (object instanceof Senior) {
        this.seniors.push(object)
        if (object.type === "infected") this.infectedSeniors.push(object)
    } else {
        throw new Error("unknown type of object")
    }
}

Scenario.prototype.addPersons = function addPersons() {
    // iterate through each of the age groups, first instantiating the healthy ones from 
    // NUM_MINORS - sickMinors as healthy, then the sickMinors, as infected
    // 
    this.createLoop("minor", this.numMinors, this.sickMinors)
    this.createLoop("teen", this.numTeens, this.sickTeens);
    this.createLoop("adult", this.numAdults, this.sickAdults);
    this.createLoop("senior", this.numSeniors, this.sickSeniors);
}


Scenario.prototype.allObjects = function allObjects() {
    return [].concat(this.minors, this.teens, this.adults, this.seniors);
};

Scenario.prototype.draw = function draw(ctx) {
    ctx.clearRect(0, 0, Scenario.DIM_X, Scenario.DIM_Y);
    ctx.fillStyle = Scenario.BG_COLOR;
    ctx.fillRect(0, 0, Scenario.DIM_X, Scenario.DIM_Y);
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
};
Scenario.prototype.logSick = function logSick(object) {
    if (object instanceof Minor) {
        this.infectedMinors.push(object)
    } else if (object instanceof Teen) {
        this.infectedTeens.push(object)
    } else if (object instanceof Adult) {
        this.infectedAdults.push(object)
    } else if (object instanceof Senior) {
        this.infectedSeniors.push(object)
    }
}
Scenario.prototype.notLogged = function notLogged(object) {
    if (object instanceof Minor) {
        return this.infectedMinors.includes(object)
    } else if (object instanceof Teen) {
        return this.infectedTeens.includes(object)
    } else if (object instanceof Adult) {
        return this.infectedAdults.includes(object)
    } else if (object instanceof Senior) {
        return this.infectedSeniors.includes(object)
    }
}
// Scenario.prototype.progressDisease = function progressDisease()
Scenario.prototype.movePersons = function movePersons(delta) {
    let allObjs = this.allObjects();
    for (let i = 0; i < allObjs.length; i++){
        let obj = allObjs[i]
        if (obj.type=== "infected" && this.notLogged(obj))this.logSick(obj)
        obj.move(delta, Scenario.DIM_X, Scenario.DIM_Y);
    }
    // this.allObjects().forEach(function (object) {
    //     if (object.type === "infected" && notLogged(object)) {
    //         logSick(object)
    //     }
    //     object.move(delta, Scenario.DIM_X, Scenario.DIM_Y);
    // });
};
Scenario.prototype.checkCollisions = function checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
        for (let j = i + 1; j < allObjects.length; j++) {
            const obj1 = allObjects[i];
            const obj2 = allObjects[j];
            if (obj1.isCollidedWith(obj2)) {
                const collision = obj1.collideWith(obj2);
                if (collision) return;
            }
        }
    }
};
Scenario.prototype.step = function step(delta) {
    this.movePersons(delta);
    this.checkCollisions();
};

Scenario.prototype.wrap = function wrap(pos) {
    return [
        Util.wrap(pos[0], Scenario.DIM_X), Util.wrap(pos[1], Scenario.DIM_Y)
    ];
};

Scenario.prototype.createLoop = function (ageGroup, n, s) {
    console.log("params: ", ageGroup, n, s)
    let obj;
    switch (ageGroup) {
        case "minor":
            obj = Minor;
            break;
        case "teen":
            obj = Teen;
            break;
        case "adult":
            obj = Adult;
            break;
        case "senior":
            obj = Senior;
            break;
        default:
            break;
    }
    let scenario = this;
    for (let i = 0; i < n-s; i++) {
        let pos = this.randomPosition();
        let type = "well"
        let person = new obj({ type, pos, scenario })
        this.add(person)
    }
    for (let i = 0; i < s; i++){
        let pos = this.randomPosition();
        let type = "infected"
        let person = new obj({ type, pos, scenario })
        this.add(person);
        this.infected.push(person)

    }
}


Scenario.prototype.isOutOfBounds = function isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Scenario.DIM_X) || (pos[1] > Scenario.DIM_Y);
};

Scenario.prototype.requestData = function () {
    
}

module.exports = Scenario;

