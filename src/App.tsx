import React from "react";
import { saveAs } from "file-saver";
import { saveSvgAsPng } from "save-svg-as-png";

import "./App.css";
import Diagram from "./Diagram";
import { DiagramConfig } from "./types";

// TODO: be able to specify text for each dot (put input above them?)
// TODO: specify width/height
// TODO: rename project to be more general, not specific to microtones

class DiagramContainer extends React.Component<any> {
  svgRef = React.createRef();

  render() {
    return (
      <div>
        <Diagram diagramConfig={this.props.diagramConfig} ref={this.svgRef} />
        <div className="text-center mt-5">
          <button
            className="btn btn-lg btn-secondary"
            onClick={() => {
              const svgElement: HTMLElement = this.svgRef
                .current as HTMLElement;
              const svgBlob = new Blob([svgElement.outerHTML], {
                type: "image/svg+xml"
              });
              saveAs(svgBlob, "diagram.svg");
            }}
          >
            Download .svg
          </button>
          <button
            className="btn btn-lg btn-secondary ml-3"
            onClick={() => {
              const svgElement: HTMLElement = this.svgRef
                .current as HTMLElement;
              saveSvgAsPng(svgElement, "diagram.png", { scale: 4 });
            }}
          >
            Download .png
          </button>
        </div>
      </div>
    );
  }
}

function ConfigForm({
  diagramConfig,
  setDiagramConfig
}: {
  diagramConfig: DiagramConfig;
  setDiagramConfig: (conf: DiagramConfig) => void;
}) {
  return (
    <form>
      <div className="row">
        <div className="col-12 col-md-3">
          <label>Count</label>
          <input
            className="form-control"
            type="number"
            value={diagramConfig.count}
            min={1}
            max={1000}
            onChange={event => {
              setDiagramConfig({
                ...diagramConfig,
                count: parseInt(event.target.value)
              });
            }}
          />
        </div>
        <div className="col-12 col-md-3">
          <label>Radius</label>
          <input
            className="form-control"
            type="number"
            value={diagramConfig.radius}
            min={1}
            max={1000}
            onChange={event => {
              setDiagramConfig({
                ...diagramConfig,
                radius: parseInt(event.target.value)
              });
            }}
          />
        </div>
        <div className="col-12 col-md-3">
          <label>Separation</label>
          <input
            className="form-control"
            type="number"
            value={diagramConfig.separation}
            min={1}
            max={1000}
            onChange={event => {
              setDiagramConfig({
                ...diagramConfig,
                separation: parseInt(event.target.value)
              });
            }}
          />
        </div>
        <div className="col-12 col-md-3">
          <label>Color</label>
          <input
            className="form-control"
            type="text"
            value={diagramConfig.color}
            onChange={event => {
              setDiagramConfig({ ...diagramConfig, color: event.target.value });
            }}
          />
        </div>
      </div>
    </form>
  );
}

export default function App() {
  const [diagramConfig, setDiagramConfig] = React.useState({
    count: 12,
    color: "white",
    radius: 5,
    separation: 20
  });

  return (
    <div className="container my-5">
      <h1 className="text-center">Microtone Scale Diagrams</h1>
      <div className="mt-5">
        <ConfigForm
          diagramConfig={diagramConfig}
          setDiagramConfig={setDiagramConfig}
        />
      </div>
      <div className="mt-5">
        <DiagramContainer diagramConfig={diagramConfig} />
      </div>
    </div>
  );
}
