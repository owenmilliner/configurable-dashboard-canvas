import { html, LitElement } from "lit";
import {
  AreaChart,
  AreaSplineChart,
  BarChart,
  BoxPlotChart,
  BubbleChart,
  ColumnChart,
  FunnelChart,
  HeatMapChart,
  LineChart,
  PieChart,
  PolarChart,
  PyramidChart,
  TreeMapChart,
} from "../chart-components/ChartMiddleware.js";

export class Canvas extends LitElement {
  static properties = {
    _canvasWidth: { state: true },
    _canvasHeight: { state: true },
    _gridSlotWidth: { state: true },
    _gridSlotHeight: { state: true },
    _margin: { state: true },
    _rows: { state: true },
    _columns: { state: true },
  };

  constructor() {
    super();
    (this._canvasWidth = 210),
      (this._canvasHeight = 297),
      (this._gridSlotWidth = 3),
      (this._gridSlotHeight = 3),
      (this._margin = 19.05),
      (this._rows = Math.floor(this._canvasHeight / this._gridSlotHeight)),
      (this._columns = Math.floor(this._canvasWidth / this._gridSlotWidth));
  }

  makeArray() {
    console.log(this._rows, this._columns);
    const arr = [];
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._columns; j++) {
        arr.push(`column-${i + 1}-${j + 1}`);
      }
    }
    return arr;
  }

  render() {
    return html` <style>
        #canvas-background {
          width: ${this._canvasWidth}mm;
          height: ${this._canvasHeight}mm;
          padding: 10mm;
          margin: ${this._margin}mm auto;
          border: 1px #d3d3d3 solid;
          background-color: white;
          border-radius: 5px;
        }
        #page {
          background-color: white;
          border: 2px solid rgb(85, 179, 255);
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${this._columns}, 3mm);
          grid-template-rows: repeat(${this._rows}, 3mm);
          overflow: visible;
        }
        .canvas__gridSlot {
          border: 1px solid red;
          width: ${this._gridSlotWidth}mm;
          height: ${this._gridSlotHeight}mm;
          overflow: visible;
        }
      </style>

      <div id="canvas-background">
        <div id="page">
          ${this.makeArray().map((item) => {
            return html`<div
              class="canvas__gridSlot"
              id=${item}
              ondrop="drop(event)"
              ondragover="allowDrop(event)"
            ></div>`;
          })}
        </div>
      </div>`;
  }
}

window.customElements.define("canvas-component", Canvas);
