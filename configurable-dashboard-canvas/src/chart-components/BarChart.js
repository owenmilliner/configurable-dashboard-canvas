import { html, LitElement } from "lit";
import "@vaadin/charts";

export class BarChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        type="bar"
        title="Historic World Population by Region"
        subtitle='Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        categories='["Africa", "America", "Asia", "Europe", "Oceania"]'
        additional-options='{
      "yAxis": {
        "min": 0,
        "title": {
          "text": "Population (millions)",
          "align": "high"
        }
      },
      "tooltip": {
        "valueSuffix": " millions"
      },
      "plotOptions": {
        "bar": {
          "dataLabels": {
            "enabled": true
          }
        }
      }
    }'
      >
        <vaadin-chart-series title="Year 1800" values="[107, 31, 635, 203, 2]">
        </vaadin-chart-series>
        <vaadin-chart-series title="Year 1900" values="[133, 156, 947, 408, 6]">
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Year 2000"
          values="[814, 841, 3714, 727, 31]"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Year 2016"
          values="[1216, 1001, 4436, 738, 40]"
        >
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("bar-chart", BarChart);
