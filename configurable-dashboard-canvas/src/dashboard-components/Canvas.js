import { html, LitElement, css } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";

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
import { TextBox } from "../additional-components/TextBox";

export class Canvas extends ProviderMixin(LitElement) {
  static get properties() {
    return {
      canvasHeight: Number,
      setCanvasHeight: Function,
      canvasWidth: Number,
      setCanvasWidth: Function,
      gridSlotWidth: Number,
      gridSlotHeight: Number,
      margin: Number,
      rows: Number,
      setRows: Function,
      columns: Number,
      setColumns: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  constructor() {
    super();

    this.canvasHeight = 297;
    this.setCanvasHeight = (newValue) => {
      this.canvasHeight = newValue;
    };

    this.canvasWidth = 210;
    this.setCanvasWidth = (newValue) => {
      this.canvasWidth = newValue;
    };

    this.gridSlotWidth = 3;
    this.gridSlotHeight = 3;
    this.margin = 19.05;

    this.rows = Math.floor(this.canvasHeight / this.gridSlotHeight);
    this.setRows = (newValue) => {
      this.rows = newValue;
    };

    this.columns = Math.floor(this.canvasWidth / this.gridSlotWidth);
    this.setColumns = (newValue) => {
      this.columns = newValue;
    };

    this.popUp = true;
    this.setPopUp = (newValue) => {
      this.popUp = newValue;
    };
  }

  makeArray() {
    const arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        arr.push(`column-${i + 1}-${j + 1}`);
      }
    }
    return arr;
  }

  static get provide() {
    return [
      "canvasHeight",
      "setCanvasHeight",
      "canvasWidth",
      "setCanvasWidth",
      "gridSlotWidth",
      "gridSlotHeight",
      "margin",
      "rows",
      "setRows",
      "columns",
      "setColumns",
      "popUp",
      "setPopUp",
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    const localStorage = window.localStorage;
    const keysPressed = {};

    window.addEventListener("keydown", (event) => {
      keysPressed[event.key] = true;

      const selectedComponentId = localStorage.getItem("selectedComponentId");

      if (
        (keysPressed["Backspace"] &&
          event.key == "Alt" &&
          selectedComponentId) ||
        (keysPressed["Alt"] && event.key == "Backspace" && selectedComponentId)
      ) {
        const target = document
          .querySelector("app-container")
          .shadowRoot.querySelector("cdc-page")
          .shadowRoot.getElementById("canvas")
          .shadowRoot.getElementById(selectedComponentId);

        target.remove();
        localStorage.removeItem("selectedComponentId");
      }
    });

    window.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<canvas-form></canvas-form>`
      : html`<style>
            #page {
              width: ${this.canvasWidth}mm;
              height: ${this.canvasHeight}mm;
              padding: 10mm;
              margin: ${this.margin}mm auto;
              border: 1px #d3d3d3 solid;
              background-color: white;
              border-radius: 5px;
            }
            #canvas {
              background-color: white;
              border: 2px solid RGB(6, 21, 44, 0.05);
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-columns: repeat(${this.columns}, 3mm);
              grid-template-rows: repeat(${this.rows}, 3mm);
              overflow: hidden;
            }
            .canvas__gridSlot {
              border: 0.5px solid RGB(6, 21, 44, 0.05);
              width: ${this.gridSlotWidth}mm;
              height: ${this.gridSlotHeight}mm;
              overflow: visible;
            }

            #display__bin--os-win {
              height: 7vh;
              position: absolute;
              right: 1.5%;
              bottom: 2.5%;
            }

            #display__bin--os-other {
              height: 7vh;
              position: absolute;
              right: 0.5%;
              bottom: 1%;
            }
          </style>
          <img
            id=${navigator.appVersion.indexOf("Win") != -1
              ? "display__bin--os-win"
              : "display__bin--os-other"}
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

class CanvasForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      canvasHeight: Number,
      setCanvasHeight: Function,
      canvasWidth: Number,
      setCanvasWidth: Function,
      gridSlotWidth: Number,
      gridSlotHeight: Number,
      margin: Number,
      rows: Number,
      setRows: Function,
      columns: Number,
      setColumns: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  static get inject() {
    return [
      "canvasHeight",
      "setCanvasHeight",
      "canvasWidth",
      "setCanvasWidth",
      "gridSlotWidth",
      "gridSlotHeight",
      "margin",
      "rows",
      "setRows",
      "columns",
      "setColumns",
      "popUp",
      "setPopUp",
    ];
  }

  handleSubmit(event) {
    event.preventDefault();

    const pageSize = event.path[0].pageSize.value;
    const pageOrientation = event.path[0].pageOrientation.value;

    if (pageSize === "A3" && pageOrientation === "Portrait") {
      this.setCanvasHeight(420);
      this.setRows(420 / 3);
      this.setCanvasWidth(297);
      this.setColumns(297 / 3);
      page = [320, 444, "portrait"];
    }
    if (pageSize === "A3" && pageOrientation === "Landscape") {
      this.setCanvasHeight(297);
      this.setRows(297 / 3);
      this.setCanvasWidth(420);
      this.setColumns(420 / 3);
      page = [444, 320, "landscape"];
    }
    if (pageSize === "A4" && pageOrientation === "Portrait") {
      this.setCanvasHeight(297);
      this.setRows(297 / 3);
      this.setCanvasWidth(210);
      this.setColumns(210 / 3);
      page = [231, 319, "portrait"];
    }
    if (pageSize === "A4" && pageOrientation === "Landscape") {
      this.setCanvasHeight(210);
      this.setRows(210 / 3);
      this.setCanvasWidth(297);
      this.setColumns(297 / 3);
      page = [319, 231, "landscape"];
    }

    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <link rel="stylesheet" href="./chart.css" />
      <form class="chartInputForm" @submit=${this.handleSubmit}>
        <div class="formINputItem">
          <h1>Create Canvas</h1>
        </div>
        <div class="formInputItem">
          <label for="pageSize">Page Size</label>
          <select id="pageSize" name="pageSize">
            <option value="A3">A3</option>
            <option value="A4">A4</option>
          </select>
        </div>
        <br />
        <div class="formInputItem">
          <label for="pageOrientation">Page Orientation</label>
          <select id="pageOrientation" name="pageOrientation">
            <option value="Portrait">Portrait</option>
            <option value="Landscape">Landscape</option>
          </select>
        </div>
        <div class="formInputItem">
          <button type="submit">Create</button>
        </div>
      </form>
    `;
  }
}

window.customElements.define("canvas-component", Canvas);
window.customElements.define("canvas-form", CanvasForm);
