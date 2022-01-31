import { html, LitElement } from "lit";
import { unsafeHTML } from "https://unpkg.com/lit-html@latest/directives/unsafe-html.js?module";
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
const localStorage = window.localStorage;

export class Canvas extends LitElement {
  static properties = {
    _canvasWidth: { state: true },
    _canvasHeight: { state: true },
    _gridSlotWidth: { state: true },
    _gridSlotHeight: { state: true },
    _margin: { state: true },
    _rows: { state: true },
    _columns: { state: true },
    _populatedGrids: { type: Array, state: true },
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
    this._populatedGrids = [];
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

  handleStringToHTML(save) {
    return document.createRange().createContextualFragment(`${save}`);
  }

  connectedCallback() {
    // localStorage.clear();
    super.connectedCallback();
    localStorage.setItem("count", 1);

    //On Disconnect
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();

      const canvas = document.querySelector("canvas-component");
      const canvasGridSlots =
        canvas.shadowRoot.children[1].children[0].children;
      const gridSlotKeys = Object.keys(canvasGridSlots);

      gridSlotKeys.forEach((gridSlot) => {
        if (canvasGridSlots[gridSlot].children.length !== 0) {
          this._populatedGrids.push(canvasGridSlots[gridSlot].outerHTML);

          // [[chart, shadowdom], [chart, shadowdom]...]
          // [chart, chart]
        }
      });

      localStorage.setItem("previouslyPopulatedGrids", this._populatedGrids);
    });
  }

  // Add previous components to canvas '(straight after render)
  firstUpdated() {
    const canvas = document.querySelector("canvas-component");

    const previouslyPopulatedGrids = localStorage
      .getItem("previouslyPopulatedGrids")
      .split(",");

    console.log(previouslyPopulatedGrids);

    if (!previouslyPopulatedGrids.includes("")) {
      previouslyPopulatedGrids.forEach((previousGridSlot, index) => {
        console.log(
          "---------------------------------------------------------"
        );

        // Getting id of component grid
        const componentGridId =
          this.handleStringToHTML(previousGridSlot).querySelector("div").id;
        console.log("componentGridId:", componentGridId);

        // Getting contents of the component
        const componentToPlace =
          this.handleStringToHTML(previousGridSlot).querySelector("div")
            .children[0];
        componentToPlace.id = `web-component-${index + 1}`;
        console.log("componentToPlace:", componentToPlace);

        // Getting target grid id
        const targetGridSlot =
          canvas.shadowRoot.getElementById(componentGridId);
        console.log("Target grid Id:", componentGridId);

        // Appending the component to the Grid
        targetGridSlot.appendChild(componentToPlace);
        console.log("Target after placement:", targetGridSlot);

        console.log(
          "---------------------------------------------------------"
        );
        localStorage.setItem("count", index + 1);
      });
    }
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
        }
        #canvas {
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
