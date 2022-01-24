import { html, css, LitElement } from "lit";
// import {
//   PieChart,
//   AreaChart,
//   LineChart,
//   ColumnChart,
// } from "../chart-components/ChartMiddleware";

const arr = [];
for (let i = 0; i < 27; i++) {
  for (let j = 0; j < 38; j++) {
    arr.push(`column-${i + 1}-${j + 1}`);
  }
}

export class Canvas extends LitElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    (this._width = 105), (this._height = 143.5);
  }

  static get styles() {
    return css`
      #canvas-background {
        width: 105mm;
        height: 143.5mm;
        padding: 10mm;
        margin: 15mm auto;
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
        grid-template-columns: repeat(27, 1fr);
        grid-template-rows: repeat(38, 1fr);
        overflow: visible;
      }
      .canvas__gridSlot {
        border: 1px solid red;
        width: 3.36mm;
        height: 3.25mm;
        overflow: visible;
      }
    `;
  }

  render() {
    return html` <div id="canvas-background">
      <div id="page">
        ${arr.map((item) => {
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
