import { html, LitElement } from "lit";
import "@vaadin/charts";

export class FunnelChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        type="funnel"
        style="height: 90%; width: 100%;"
        title="Sales funnel"
        no-legend
        tooltip
        additional-options='{
      "plotOptions": {
        "series": {
          "dataLabels": {
            "enabled": true,
            "format": "<b>{point.name}</b> ({point.y:,.0f})",
            "softConnector": true
          },
          "center": ["40%", "50%"],
          "neckWidth": "30%",
          "neckHeight": "25%",
          "width": "80%"
        }
      }
    }'
      >
        <vaadin-chart-series
          title="Unique users"
          values='[
      ["Website visits", 8524],
      ["Downloads", 5327],
      ["Requested price list", 3722],
      ["Invoice sent", 2578],
      ["Finalized", 136]
    ]'
        >
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("funnel-chart", FunnelChart);
