const Util = require("./util");
// const MovingPerson = require("./moving_person");
const Scenario = require("./scenario");

function ScenarioView(scenario, ctx) {
    this.ctx = ctx;
    this.scenario = scenario;
}

ScenarioView.prototype.bindKeyHandlers = function bindKeyHandlers() {
    // const 
    // Object.keys()
}

ScenarioView.prototype.start = function start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
};
ScenarioView.prototype.animate = function animate(time) {
    // console.log("time: ", time)
    // debugger
    const timeDelta = time - this.lastTime;
    this.scenario.step(timeDelta);
    this.scenario.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this))
}
module.exports = ScenarioView;