import { html, LitElement } from "lit";
import "@vaadin/charts";

export class TreeMapChart extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="./chart.css" />
      <vaadin-chart
        id="treemap"
        type="treemap"
        class="chart"
        title="Fruit consumption"
        tooltip
      >
        <vaadin-chart-series
          values='[
        {
          "id": "A",
          "name": "Apples",
          "colorIndex": "0"
        }, {
          "id": "B",
          "name": "Bananas",
          "colorIndex": "2"
        }, {
          "id": "O",
          "name": "Oranges",
          "colorIndex": "3"
        }, {
          "name": "Anne",
          "parent": "A",
          "value": 5
        }, {
          "name": "Rick",
          "parent": "A",
          "value":3
        }, {
          "name": "Peter",
          "parent": "A",
          "value": 4
        }, {
          "name": "Anne",
          "parent": "B",
          "value":4
        }, {
          "name": "Rick",
          "parent": "B",
          "value": 10
        }, {
          "name": "Peter",
          "parent": "B",
          "value": 1
        }, {
          "name": "Anne",
          "parent": "O",
          "value": 1
        }, {
          "name": "Rick",
          "parent": "O",
          "value": 3
        }, {
          "name": "Peter",
          "parent": "O",
          "value": 3
        }, {
          "name": "Susanne",
          "parent": "Kiwi",
          "value": 2,
          "colorIndex": "4"
        }
      ]'
          additional-options='{
        "levels": [{
          "level": 1,
          "dataLabels": {
            "enabled": true,
            "align": "left",
            "verticalAlign": "top"
          }
        }]
      }'
        ></vaadin-chart-series>
      </vaadin-chart>`;
  }
}

window.customElements.define("treemap-chart", TreeMapChart);
