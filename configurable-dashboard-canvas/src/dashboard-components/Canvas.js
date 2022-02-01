import { html, LitElement } from "lit";
import {
  AreaChart,
  AreaSplineChart,
  BarChart,
  ColumnChart,
  FunnelChart,
  HeatMapChart,
  LineChart,
  PieChart,
  PolarChart,
  PyramidChart,
  TreeMapChart,
} from "../chart-components/ChartMiddleware.js";
import { ImageUpload } from "../additional-components/ImageUpload";

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
        #page {
          width: ${this._canvasWidth}mm;
          height: ${this._canvasHeight}mm;
          padding: 10mm;
          margin: ${this._margin}mm auto;
          border: 1px #d3d3d3 solid;
          background-color: white;
          border-radius: 5px;
          overflow: hidden;
        }
        #canvas {
          background-color: white;
          border: 2px solid RGB(6, 21, 44, 0.05);
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${this._columns}, 3mm);
          grid-template-rows: repeat(${this._rows}, 3mm);
        }
        .canvas__gridSlot {
          border: 0.5px solid RGB(6, 21, 44, 0.05);
          width: ${this._gridSlotWidth}mm;
          height: ${this._gridSlotHeight}mm;
          overflow: visible;
        }
        #display__bin {
          height: 7vh;
          position: absolute;
          right: 0.5%;
          bottom: 1%;
        }
      </style>
      <img
        id="display__bin"
        src="../src/images/blue-bin.png"
        alt="Recycle bin"
        ondragover="allowDrop(event)"
        ondrop="remove(event)"
      />
      <div id="page">
        <div id="canvas">
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
