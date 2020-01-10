import React, { Component } from "react";
import { dijkstra } from "../Algorithms/dijkstra";

const START_ROW = 2;
const START_COL = 10;
const FINISH_ROW = 10;
const FINISH_COL = 29;

const gridSizes = {
  1: {
    col: 30,
    row: 20
  },
  2: {
    col: 40,
    row: 20
  },
  3: {
    col: 40,
    row: 25
  }
};

const Speeds = {
  Fast: 10,
  Average: 40,
  Slow: 80,
  VerySlow: 1000
};

export const Options = {
  createdGrid: false,
  finishedAnimation: false
};

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      createGrid: false,
      enableWalls: false,
      finishedAnimation: false
    };
  }

  componentDidUpdate() {
    const { runningAlgorithm, algorithm } = this.props;
    if (runningAlgorithm) {
      Options.finishedAnimation = false;
      this.Visualize(algorithm);
    }
  }

  createGrid() {
    const { gridSize } = this.props;
    const rows = [];

    for (let row = 0; row < gridSizes[gridSize].row; row++) {
      const columns = [];
      for (let col = 0; col < gridSizes[gridSize].col; col++) {
        columns.push(createUnvisited(row, col));
      }
      rows.push(columns);
    }

    this.setState({ grid: rows, createGrid: true });
    Options.createdGrid = true;
  }

  Visualize(algorithm) {
    const algorithmFunctions = {
      Dijkstra: () => {
        this.prepareDijkstra();
      }
    };

    algorithmFunctions[algorithm]();
  }

  prepareDijkstra() {
    const { grid } = this.state;
    const startingPoint = grid[START_ROW][START_COL];
    const finishPoint = grid[FINISH_ROW][FINISH_COL];
    const path = dijkstra(grid, startingPoint, finishPoint);

    this.animateAlgorithm(path);
  }

  animateAlgorithm(path) {
    const { speed } = this.props;
    for (let i = 0; i <= path.length; i++) {
      setTimeout(() => {
        if (i === path.length) {
          this.setState({ finishedAnimation: true });
          return;
        }
        document.getElementById(`${path[i].row}-${path[i].col}`).className =
          path[i].row === START_ROW && path[i].col === START_COL
            ? "visited start"
            : path[i].row === FINISH_ROW && path[i].col === FINISH_COL
            ? "visited target"
            : "visited";
      }, i * Speeds[speed]);
    }
  }

  putWall(row, col) {
    const { grid, enableWalls } = this.state;
    const target = document.getElementById(`${row}-${col}`);
    if (!this.props.runningAlgorithm && enableWalls) {
      if (target.className === "unvisited") {
        target.className = "wall";
        grid[row][col].isWall = true;
      } else if (target.className === "wall") {
        target.className = "unvisited";
        grid[row][col].isWall = false;
      }
    }
  }

  render() {
    const { grid, createGrid, enableWalls, finishedAnimation } = this.state;
    const { gridSize, algorithm } = this.props;
    return (
      <>
        <div className="Grid">
          {!createGrid && (
            <div id="Info">
              <h4>
                Grid Size : {gridSizes[gridSize].row}x{gridSizes[gridSize].col},
                use the slidebar to change it
              </h4>
              <button
                className="btn btn-success"
                onClick={() => this.createGrid()}
              >
                Create Grid
              </button>
            </div>
          )}
          {createGrid && (
            <>
              <div id="Legend">
                <ul>
                  <li>
                    <div className="start"></div> Start
                  </li>
                  <li>
                    <div className="target"></div> Target
                  </li>
                  <li>
                    <div className="wall"></div> Wall
                  </li>
                  <li>
                    <div className="unvisited"></div> Unvisited
                  </li>
                  <li>
                    <div className="visited"></div> Visited
                  </li>
                </ul>
              </div>
              <table>
                <tbody>
                  {grid.map((row, rowIndex) => {
                    return (
                      <tr id={rowIndex} key={rowIndex}>
                        {row.map((object, colIndex) => {
                          return (
                            <td
                              id={`${object.row}-${object.col}`}
                              className={
                                object.isStart
                                  ? "start"
                                  : object.isFinish
                                  ? "target"
                                  : "unvisited"
                              }
                              onMouseOver={() =>
                                this.putWall(object.row, object.col)
                              }
                              onClick={() =>
                                this.setState({ enableWalls: !enableWalls })
                              }
                              key={colIndex}
                            ></td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {finishedAnimation && algorithm === "Dijkstra" && (
                <div id="PathDistance">
                  <h4>
                    Shortest distance from Start to Target :{" "}
                    {grid[FINISH_ROW][FINISH_COL].distance}
                  </h4>
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}

const createUnvisited = (row, col) => {
  return {
    row, //keep track of were we are
    col, // ^
    isStart: row === START_ROW && col === START_COL, // start pos
    isFinish: row === FINISH_ROW && col === FINISH_COL, // finish pos
    distance: Infinity, // 2. assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.
    isVisited: false, // 1. Mark all nodes unvisited.
    isWall: false // if its a wall we will need to skip it
  };
};
