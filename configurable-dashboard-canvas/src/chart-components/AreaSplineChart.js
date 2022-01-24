import { html, LitElement } from "lit";
import "@vaadin/charts";

export class AreaSplineChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        type="areaspline"
        title="Average fruit consumption during one week"
        categories='["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]'
        additional-options='{
      "legend": {
        "layout": "vertical",
        "align": "left",
        "verticalAlign": "top",
        "x": 150,
        "y": 100,
        "floating": true
      },
      "xAxis": {
        "plotBands": [{
          "from": 4.5,
          "to": 6.5
        }]
      },
      "tooltip": {
        "shared": true,
        "valueSuffix": " units"
      }
    }'
      >
        <vaadin-chart-series
          title="John"
          values="[3, 4, 3, 5, 4, 10, 12]"
          unit="Fruit units"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Jane"
          values="[1, 3, 4, 3, 3, 5, 4]"
          unit="Fruit units"
        >
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("areaspline-chart", AreaSplineChart);
