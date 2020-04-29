import React from 'react';
import './App.css';
import Visualizer from "./visualizer/Visualizer.js"
import Graph from "./Graph";
const axios = require("axios");
const { API_KEY } = require("./config/API_KEY");
// import DropDown from "./dropDown.js";
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wholeData: "",
      defaultState: "CA",
      population:""
    };
    this.stateBinder = this.stateBinder.bind(this);
    this.updateFromRequest = this.updateFromRequest.bind(this)
    this.updateFromRequest = this.updateFromRequest.bind(this)
  }
  componentDidMount() {
    // axios.get("https://covidtracking.com/api/v1/states/current.json", res => {
    //   this.setState({ wholeData: res });
    // });
    let that = this;
    axios.get("https://covidtracking.com/api/v1/states/current.json")
      .then(function (res) {
      that.updateFromRequest(res, "cov")
      })
  
    // axios.get("")
    //   .then(function (res1) {
    //   that.updateFromRequest(res1, "pop")
    // })
  }

  pickState(allStates) {
    for (let i = 0; i < allStates.length; i++) {
      let state = allStates[i];
      if (state.state === this.state.defaultState) return state;
    }
  }

  updateFromRequest(data, type) {
    if (type === "cov") {
      let allStates = data.data;
      let pickedState = this.pickState(allStates);
      let numsObj = {
        "numPositive": pickedState.positive,
        "negative": pickedState.negative,
        "numDeaths": pickedState.death,
        "totalTested": pickedState.totalTestResults
      }
      this.setState({ wholeData: numsObj })
    } else if (type === "pop") {
      let demObj = {};
      this.setState({ population: demObj })
    }
  }

  stateBinder(state) {
    this.setState({
      defaultState: state
    });
  }


  render() {
    let item = this.state.wholeData === "" ? <div></div> : <Visualizer data={this.state.wholeData} pop={this.state.population}/>
    return (
      <div className="App">
        {/* <DropDown currentState={this.state.defaultState} binder={this.stateBinder}/> */}
        {item}
        <Graph numbers={this.state.numsObj}/>
      </div>
    );
  }
}

export default App;
