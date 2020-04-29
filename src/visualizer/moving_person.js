const Scenario = require("./scenario.js");
const Util = require("./util")

function MovingPerson(obj) {
        this.type = obj.type;
        this.radius = obj.radius;
        this.pos = obj.pos;
        this.vel = obj.vel;
        this.color = obj.color;
        this.age = obj.age;
        this.ctx = obj.ctx;
        this.scenario = obj.scenario;
        this.stage = 0;
        // type will determine color and velocity, will represent age
}
MovingPerson.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.strokeStyle = "#000000";
}


MovingPerson.prototype.collideWith = function collideWith(otherPerson) {
        
};
MovingPerson.prototype.isCollidedWith = function isCollidedWith(otherPerson) {
        const centerDist = Util.dist(this.pos, otherPerson.pos);
        return centerDist < (this.radius + 6 + otherPerson.radius);
};

MovingPerson.prototype.reflect = function reflect(pos, vel, DIM_X, DIM_Y) {
        // debugger
        if (pos[0] >= DIM_X || pos[0] <= 0) {
                vel[0] *= -1
        }
       
        if (pos[1] >= DIM_Y || pos[1] <= 0) {
                vel[1] *= -1
        }
}

MovingPerson.prototype.isWrappable = true;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
MovingPerson.prototype.move = function move(timeDelta, DIM_X, DIM_Y) {
        //timeDelta is number of milliseconds since late move
        // if computer is busy the time delta will be larger
        // in this case the MovingPerson should move farther in this frame
        // velocity of person is how far it should move in 1/60th of a second
        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;
        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        this.reflect(this.pos, this.vel, DIM_X, DIM_Y)

        if (this.type === "infected") {
                // advance the stage of disease until either recovered or dead
                // console.log("stage: ", this.stage)
                // if (this.stage < 10) {
                //         this.stage++
                // } else {
                        this.progressDisease();
                // }
        }
        // if (this.scenario.isOutOfBounds(this.pos)) {
        //         // this.reflect(this.pos, this.vel);
        //         if (this.isWrappable) {
        //                 this.pos = this.scenario.wrap(this.pos)
        //         } else {
        //                 this.remove()
        //         }
        // }
};
MovingPerson.prototype.remove = function remove() {
        this.scenario.remove(this);
};

module.exports = MovingPerson;
