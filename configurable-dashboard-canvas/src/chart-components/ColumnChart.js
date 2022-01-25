import { html, LitElement } from "lit";
import "@vaadin/charts";

export class ColumnChart extends LitElement {
  render() {
    return html`
      <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        type="column"
        class="chart"
        title="Monthly Average Rainfall"
        subtitle="Source: WorldClimate.com"
        categories='["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]'
        additional-options='{
      "xAxis": {
        "crosshair": true
      },
      "yAxis": {
        "min": 0,
        "title": {
          "text": "Rainfall (mm)"
        }
      },
      "tooltip": {
        "shared": true
      }
    }'
      >
        <vaadin-chart-series
          title="Tokyo"
          values="[49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="New York"
          values="[83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="London"
          values="[48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Berlin"
          values="[42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]"
        >
        </vaadin-chart-series>
      </vaadin-chart>
    `;
  }
}

window.customElements.define("column-chart", ColumnChart);
