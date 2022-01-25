import { html, LitElement } from "lit";
import "@vaadin/charts";

export class PyramidChart extends LitElement {
  static properties = {
    title: { type: String },
    values: { type: Array },
  };

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
  }

  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        ondblclick="formPopUp(event, true)"
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
          values='[
      ["Website visits", 15654],
      ["Downloads", 4064],
      ["Requested price list", 1987],
      ["Invoice sent", 976],
      ["Finalized", 846]
    ]'
        >
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("pyramid-chart", PyramidChart);
