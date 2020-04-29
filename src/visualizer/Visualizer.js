import React from "react";
import "./keystyle.css"
// import { render } from "react-dom";
// import Konva from "konva";
const Scenario = require("./scenario");
const ScenarioView = require("./scenario_view");

// const graphCanvas = document.getElementById("demo-graph")
// const graphCtx = graphCanvas.getContext("2d")
// let [demObj, demSick] = await menu.requestParameters()

class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            demoObj: {
                population: 170,
                percentMinors: 0.15,
                percentTeens: 0.2,
                percentAdults: 0.45,
                percentSeniors: 0.2
            },
            demSick: {
                minors: 0,
                teens: 0,
                adults: 0,
                seniors: 1
            },
            numPositive: this.props.data.numPositive,
            negative: this.props.data.negative,
            numDeaths: this.props.numDeaths,
            totalTested: this.props.data.totalTested

        };
    }
    componentDidMount() {
        const canvas = document.getElementById("canvas-space");
        const ctx = canvas.getContext("2d");
        const scen = new Scenario(ctx, this.state.demoObj, this.state.demSick);
        new ScenarioView(scen, ctx).start();
    }
    render() {
        return (
            <div>
                <canvas id="canvas-space" width={1000} height={600} />
                <div id="population-key">
                    <ul id="key-list">
                        <li id="minor">Minor</li>
                        <li id="teen">Teen</li>
                        <li id="adult">Adult</li>
                        <li id="senior">Senior</li>
                        <li id="infected">Infected</li>
                        <li id="recovered">Recovered</li>
                        <li id="diceased">Diceased</li>

                    </ul>
                </div>
            </div>
        );
    }
}
export default Visualizer;