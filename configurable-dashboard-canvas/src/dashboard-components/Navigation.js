import { html, css, LitElement } from "lit";
import { genericImgData, chartImgData } from "./navigation-data";

export class Navigation extends LitElement {
  static properties = {
    genericActive: Boolean,
    chartsActive: Boolean,
  };

  constructor() {
    super();
    this.genericActive = false;
    this.chartsActive = false;
  }

  static get styles() {
    return css`
      #nav {
        display: grid;
        grid-template-rows: auto;
        /* repeat(4, 1fr); */
        gap: 1vh;
      }

      #chart-section,
      #generic-section {
        display: grid;
      }

      #generic-button,
      #chart-button {
        height: 5vh;
        font-size: 1.5vw;
        width: 100%;
        padding: 0;
        margin: 0;
      }

      .tags {
        width: 100%;
        color:#06162c;
        font-family: whitney,sans-serif;
        font-weight:300;
        font-size: 1.5vw;
        padding: 0;
        margin: 0;
        height: 4vh;
        text-align: center;
        background-color: #4bd8d4;
        border-top-left-radius: 5px;
        border-top-right-radius:5px;
        margin-left:20px;
        margin-right:20px
      }

      img {
        width: 80%;
        margin-right:10px;
        margin-left:20px;
        height: 10vh;
        padding-bottom: 1vh;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius:5px;
      }
    `;
  }

  displayGeneric() {
    this.genericActive = !this.genericActive;
  }

  displayCharts() {
    this.chartsActive = !this.chartsActive;
    console.log(this.chartsActive);
  }

  render() {
    return html` <div id="nav" ondrop="drop(event)">
      <div id="generic-section">
        <button id="generic-button" @click="${this.displayGeneric}">
          Generic Items ⌄
        </button>
        <div id="generic-list">
          ${this.genericActive
            ? genericImgData.map((item) => {
                return html` <p class="tags">${item.name}</p>
                  <img
                    id="${item.id}"
                    src="${item.img}"
                    draggable="true"
                    ondragstart="drag(event, true)"
                  />`;
              })
            : null}
        </div>
      </div>
      <div id="chart-section">
        <button id="chart-button" @click="${this.displayCharts}">
          Chart Items ⌄
        </button>
        <div id="chart-list">
          ${this.chartsActive
            ? chartImgData.map((item) => {
                return html` <p class="tags">${item.name}</p>
                  <img
                    id="${item.id}"
                    src="${item.img}"
                    draggable="true"
                    ondragstart="drag(event, true)"
                  />`;
              })
            : null}
        </div>
      </div>
    </div>`;
  }
}

window.customElements.define("navigation-component", Navigation);
