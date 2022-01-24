import { html, LitElement } from "lit";
import "@vaadin/charts";

export class LineChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart type="line">
        <vaadin-chart-series
          values='[
        ["Firefox", 45.0],
        ["IE", 26.8],
        ["Chrome", 12.8],
        ["Safari", 8.5],
        ["Opera", 6.2],
        ["Others", 0.7]]'
        >
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("line-chart", LineChart);
