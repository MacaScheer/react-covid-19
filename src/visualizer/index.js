console.log("webpack is working!")

const Scenario = require("./scenario.js");
const ScenarioView = require("./scenario_view");
const Menu = require("./menu.js")


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas-space");
    const ctx = canvas.getContext("2d");
    // const graphCanvas = document.getElementById("demo-graph")
    // const graphCtx = graphCanvas.getContext("2d")
    const menu = new Menu()
    // let [demObj, demSick] = await menu.requestParameters()
    let demoObj = {
        population: 170,
        percentMinors: .15,
        percentTeens: .20,
        percentAdults: .45,
        percentSeniors: .20
    }
    let demSick = {
        minors: 0,
        teens: 0,
        adults: 0,
        seniors: 1
    }
    const scen = new Scenario(ctx, demoObj, demSick);
    new ScenarioView(scen, ctx).start()
})