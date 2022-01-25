import { html, LitElement } from "lit";
import "@vaadin/charts";

export class PyramidChart extends LitElement {
  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  _handleDBLClick(event) {
    this.count++;
  }

  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        @dblclick="${this._handleDBLClick}"
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
        <vaadin-chart-series title="" values="[]"
          ><p>${this.count}</p>
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("pyramid-chart", PyramidChart);
