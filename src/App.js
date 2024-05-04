import React, {Component, createRef} from "react";
import Input from "./components/Input";
import SetUnits from "./components/SetUnits";
import SearchResults from "./components/SearchResults";
import WeatherReport from "./components/WeatherReport";
import debounce from "lodash.debounce";

class App extends Component {
    state = {
        searchResults: [],
        error: false,
        isLoading: true,
        selectedLocId: 0,
        tempUnits: 'C'
    }
    searchRef = createRef();
    componentDidMount() {
        this.searchRef.current.focus();
        this.getWeather();
    }
    componentDidUpdate(_, prevStat) {
        if(prevStat.selectedLocId !== this.state.selectedLocId || prevStat.tempUnits !== this.state.tempUnits) {
            this.getWeather(this.state.selectedLocId);
        }

    }

    searchLocations = debounce (keyword => {
        const url = `https://api.weatherserver.com/weather/cities/${keyword}`;
        fetch(url)
            .then(res => res.json())
            .then(({results}) =>
                this.setState({searchResults: results, error: false})
        ).catch(() => this.setState({error: true}));
    }, 200);
    getWeather = () => {
        this.setState({searchResults: [], isLoading: true, error: false});
        this.searchRef.current.value = "";
        fetch(
            `https://api.weatherserver.com/weather/current/${this.state.selectedLocId}/${this.state.tempUnits}`
        )
            .then(res => res.json())
            .then(results =>
                this.setState({weatherData: results, isLoading: false})
            )
            .catch(() => this.setState({error: true}));
    };
    render() {
    return (
      <div className="weather-app">
        <h1>WeatherWatch</h1>
        <Input  label="LOCATION"
                onInput={e => this.searchLocations(e.target.value)}
                inputRef={this.searchRef} />

          {this.state.searchResults.length > 0 && (
              <SearchResults
                  data={this.state.searchResults}
                  selectLocation={cityId => this.setState({selectedLocId: cityId})}
              />
          )}

        <SetUnits value={this.state.tempUnits} onSet={e => this.setState({tempUnits: e.target.value})} />

          {
              this.state.isLoading ? <div className="is-loading" /> :
                  <WeatherReport weatherData={this.state.weatherData} units={this.state.tempUnits}
              />
          }
          {this.state.error ? <div className="error-panel"/> : null}
      </div>
    );
  }
}

export default App;
