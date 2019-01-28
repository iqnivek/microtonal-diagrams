import React, { Component } from "react";
import { saveAs } from "file-saver";
import range from "lodash.range";
import "./App.css";

const TuningDiagram = React.forwardRef(
  (
    props: {
      count: number;
      color: string;
      radius: number;
      separation: number;
    },
    ref
  ) => {
    const { color, radius, separation } = props;
    const diameter = radius * 2;
    const height = diameter;
    const width = props.count * (diameter + separation) - separation;
    return (
      <div>
        <svg
          ref={ref}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {range(props.count).map(idx => {
            return (
              <circle
                cx={(diameter + separation) * idx + radius}
                cy={radius}
                r={radius}
                style={{ fill: color }}
              />
            );
          })}
          {range(props.count - 1).map(idx => {
            const x1 = (diameter + separation) * idx + radius;
            return (
              <line
                x1={x1}
                y1={radius}
                x2={x1 + diameter + separation}
                y2={radius}
                style={{
                  stroke: color,
                  strokeWidth: 1
                }}
              />
            );
          })}
        </svg>

        <button
          className="btn btn-secondary"
          onClick={() => {
            const svg: HTMLElement = document.getElementById("diagram")!;
            const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
            saveAs(blob, "diagram.svg");
          }}
        >
          Download
        </button>
      </div>
    );
  }
);

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Microtonal Diagrams</h1>
        <TuningDiagram count={12} color="blue" radius={5} separation={10} />
        <TuningDiagram count={24} color="blue" radius={5} separation={10} />
      </div>
    );
  }
}

export default App;
