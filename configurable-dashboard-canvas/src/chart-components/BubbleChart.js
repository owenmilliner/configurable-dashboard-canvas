import { html, LitElement } from "lit";
import "@vaadin/charts";

export class BubbleChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        type="bubble"
        style="height: 90%; width: 100%;"
        title="Vaadin Charts Bubbles"
        tooltip
      >
        <vaadin-chart-series
          title="All bubbles shown"
          values="[[9, 81, 13], [98, 5, 39], [51, 50, 23], [41, 22, -36], [58, 24, -30], [78, 37, -16], [55, 56, 3], [18, 45, 20], [42, 44, -22], [3, 52, 9], [31, 18, 47], [79, 91, 13], [93, 23, -27], [44, 83, -28]]"
          additional-options='{"maxSize": 120, "minSize": 3}'
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Negative bubbles hidden"
          values="[[13, 30, 10], [23, 20, -10], [23, 40, 10]]"
          additional-options='{"displayNegative": false}'
        >
        </vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("bubble-chart", BubbleChart);
