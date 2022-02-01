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
      @import url("http://fonts.cdnfonts.com/css/whitney-2");
      #nav {
        display: grid;
        grid-template-rows: auto;
        gap: 1vh;
        overflow-x: hidden;
      }

      #nav__generic {
        display: grid;
        grid-template-rows: 5vh;
      }

      #generic__button,
      #chart__button {
        width: 100%;
        text-decoration: none;
        border: 0.25vw solid rgb(75, 216, 212);
        background-color: rgb(75, 216, 212);
        color: rgb(6, 21, 44);
        font-family: "Whitney", sans-serif;
        font-weight: bold;
        font-size: 2vh;
        padding: 1vh 2vh;
      }

      #generic__button:hover,
      #chart__button:hover {
        color: white;
        background-color: #06152c;
      }

      .list__item {
        display: block;
        width: 90%;
        margin: auto;
        padding-top: 1vh;
      }

      .list__tag {
        /* width: 100%; */
        color: #06162c;
        font-family: "Whitney", sans-serif;
        font-weight: 300;
        font-size: 2vh;
        /* height: 5vh; */
        text-align: center;
        background-color: #4bd8d4;
        margin: auto;
        padding-top: 1.5vh;
        padding-bottom: 1.5vh;
      }

      img {
        width: 100%;
        /* margin-right: 10px;
        margin-left: 20px; */
        height: 10vh;
        /* padding-bottom: 1vh; */
      }
    `;
  }

  displayGeneric() {
    this.genericActive = !this.genericActive;
  }

  displayCharts() {
    this.chartsActive = !this.chartsActive;
  }

  render() {
    return html` <div id="nav">
      <div id="nav__generic">
        <button id="generic__button" @click="${this.displayGeneric}">
          Generic Items ⌄
        </button>
        <div id="generic__list">
          ${this.genericActive
            ? genericImgData.map((item) => {
                return html`
                  <div class="list__item">
                    <p class="list__tag">${item.name}</p>
                    <img
                      id="${item.id}"
                      src="${item.img}"
                      draggable="true"
                      ondragstart="drag(event, true)"
                    />
                  </div>
                `;
              })
            : null}
        </div>
      </div>
      <div id="chart__section">
        <button id="chart__button" @click="${this.displayCharts}">
          Charts ⌄
        </button>
        <div id="chart__list">
          ${this.chartsActive
            ? chartImgData.map((item) => {
                return html`
                  <div class="list__item">
                    <p class="list__tag">${item.name}</p>
                    <img
                      id="${item.id}"
                      src="${item.img}"
                      draggable="true"
                      ondragstart="drag(event, true)"
                    />
                  </div>
                `;
              })
            : null}
        </div>
      </div>
    </div>`;
  }
}

window.customElements.define("navigation-component", Navigation);
