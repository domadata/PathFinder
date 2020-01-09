import React, { Component } from "react";
import Grid, { Options } from "../Grid/Grid";

const Speeds = ["Fast", "Average", "Slow", "VerySlow"];
const Algorithms = ["Dijkstra"];
const minGridSize = 1;
const maxGridSize = 3;
const defaultGridSize = 2;

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      speed: Speeds[0],
      algorithm: null,
      pickedAlgorithm: false,
      runningAlgorithm: false,
      gridSize: defaultGridSize
    };
  }

  onInput() {
    const input = document.getElementById("customRange1");
    const gridSize = input.value;
    this.setState({ gridSize });
  }

  setAlgorithm(chosenAlgorithm) {
    const algorithm = chosenAlgorithm.target.innerHTML;
    {
      !this.state.runningAlgorithm &&
        this.setState({ algorithm, pickedAlgorithm: true });
    }
  }

  setSpeed(chosenSpeed) {
    const speed = chosenSpeed.target.innerHTML;
    {
      !this.state.runningAlgorithm && this.setState({ speed });
    }
  }

  render() {
    const {
      speed,
      algorithm,
      pickedAlgorithm,
      runningAlgorithm,
      gridSize
    } = this.state;
    return (
      <>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#">
            Path Search
          </a>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  Algorithm : {algorithm}
                </a>
                <div className="dropdown-menu">
                  {Algorithms.map((algorithm, index) => {
                    return (
                      <a
                        className="dropdown-item"
                        href="#"
                        key={index}
                        onClick={chosenAlgorithm =>
                          this.setAlgorithm(chosenAlgorithm)
                        }
                        key={index}
                      >
                        {algorithm}
                      </a>
                    );
                  })}
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  Speed : {speed}{" "}
                  {speed === "VerySlow"
                    ? "| used for debugging not recommended"
                    : ""}
                </a>
                <div className="dropdown-menu">
                  {Speeds.map((type, index) => {
                    return (
                      <a
                        className="dropdown-item"
                        href="#"
                        key={index}
                        onClick={chosenSpeed => this.setSpeed(chosenSpeed)}
                        key={index}
                      >
                        {type}
                      </a>
                    );
                  })}
                </div>
              </li>
              <button
                type="button"
                className={
                  !runningAlgorithm ? `btn btn-success` : `btn btn-danger`
                }
                onClick={() => {
                  pickedAlgorithm &&
                    Options.createdGrid &&
                    this.setState({ algorithm, runningAlgorithm: true });
                }}
              >
                {!pickedAlgorithm
                  ? `Pick an Algorithm`
                  : `Visualize ${algorithm}`}
              </button>
              <fieldset className="form-group">
                <input
                  type="range"
                  className="custom-range"
                  id="customRange1"
                  min={minGridSize}
                  max={maxGridSize}
                  defaultValue={defaultGridSize}
                  step={!runningAlgorithm ? "1" : "0"}
                  onInput={!runningAlgorithm && this.onInput.bind(this)}
                />
              </fieldset>
            </ul>
          </div>
        </nav>
        <Grid
          speed={speed}
          gridSize={gridSize}
          algorithm={algorithm}
          runningAlgorithm={runningAlgorithm}
          pickedAlgorithm={pickedAlgorithm}
        ></Grid>
      </>
    );
  }
}
