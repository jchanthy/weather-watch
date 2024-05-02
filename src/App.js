import React, { Component } from "react";
import Input from "./components/Input";
import SetUnits from "./components/SetUnits";
import SearchResults from "./components/SearchResults";
import WeatherReport from "./components/WeatherReport";
class App extends Component {
  render() {
    return (
      <div className="weather-app">
        <h1>WeatherWatch</h1>
        <Input />
        <SetUnits />
      <SearchResults />
        <WeatherReport />
      </div>
    );
  }
}

export default App;
