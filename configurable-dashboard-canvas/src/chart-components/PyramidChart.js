import { html, LitElement } from "lit";
import "@vaadin/charts";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";

export const updateData = (chartData) => {
  globalThis.title = chartData.title;
};

const dataSources = {
  NUMBER_OF_TWEETS: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
  SEVERITY1: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
  SEVERITY2: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
  SEVERITY3: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
};

export class PyramidChart extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      values: { type: Array },
      popUp: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.title = "TEST";
    this.values = [
      ["Website visits", 15654],
      ["Downloads", 4064],
      ["Requested price list", 1987],
      ["Invoice sent", 976],
      ["Finalized", 846],
    ];
    this.popUp = false;
  }

  formPopUp() {
    this.popUp = true;
  }

  render() {
    return this.popUp
      ? html`
          <div class="input-layout" @keyup="${this.shortcutListener}">
            <vaadin-text-field
              placeholder="Title"
              value="${this.title}"
              @change="${this.updateTitle}"
            ></vaadin-text-field>
            <p>test: ${this.title}</p>
            <vaadin-radio-group
              class="source-options"
              value="${JSON.stringify(this.values)}"
              @value-changed="${this.updateValues}"
            >
              ${Object.keys(dataSources).map(
                (filter) =>
                  html`<vaadin-radio-button value="${filter}"
                    >${filter}</vaadin-radio-button
                  >`
              )}
            </vaadin-radio-group>

            <vaadin-button theme="primary" @click="${this.updateChart}"
              >Update Chart</vaadin-button
            >
          </div>
        `
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            @dblclick="${this.formPopUp}"
            type="pyramid"
            title="${this.title}"
            no-legend
            additional-options='{
        "plotOptions": {
          "series": {
            "dataLabels": {
              "enabled": true,
              "format": "<b>{point.name}</b> ({point.y:,.0f})",
              "softConnector": true
            },
            "center": ["40%","50%"],
            "width":"80%"
          }
        }
      }'
          >
            <vaadin-chart-series
              title="${this.title}"
              values="${JSON.stringify(this.values)}"
            >
            </vaadin-chart-series>
          </vaadin-chart>`;
  }
  shortcutListener(e) {
    if (e.key === "Enter") {
      this.updateTitle();
    }
  }

  updateTitle(e) {
    this.title = e.target.value;
    this.popUp = false;
  }

  createRenderRoot() {
    return this;
  }
}

window.customElements.define("pyramid-chart", PyramidChart);
