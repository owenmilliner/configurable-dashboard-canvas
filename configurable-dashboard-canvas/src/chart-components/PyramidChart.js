import { html, LitElement } from "lit";
import "@vaadin/charts";

export class PyramidChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        type="pyramid"
        title="Sales pyramid"
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
        <vaadin-chart-series title="" values="[]"> </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("pyramid-chart", PyramidChart);
