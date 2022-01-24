import { html, LitElement } from "lit";
import "@vaadin/charts";

export class AreaChart extends LitElement {
  static get styles() {
    return css`
      .chart {
        height: 60mm;
        width: 50mm;
        resize: both;
        overflow: auto;
      }
    `;
  }
  render() {
    return html`
      <vaadin-chart
        type="area"
        title="test"
        subtitle="Source: Wikipedia.org"
        categories="[1750, 1800, 1850, 1900, 1950, 1999, 2050]"
        stacking="normal"
        no-legend
        tooltip
      >
        <vaadin-chart-series
          title="Asia"
          values="[502, 635, 809, 947, 1402, 3634, 5268]"
          unit="Millions"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Africa"
          values="[106, 107, 111, 133, 221, 767, 1766]"
          unit="Millions"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Europe"
          values="[163, 203, 276, 408, 547, 729, 628]"
          unit="Millions"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="America"
          values="[18, 31, 54, 156, 339, 818, 1201]"
          unit="Millions"
        >
        </vaadin-chart-series>
        <vaadin-chart-series
          title="Oceania"
          values="[2, 2, 2, 6, 13, 30, 46]"
          unit="Millions"
        >
        </vaadin-chart-series>
      </vaadin-chart>
    `;
  }
}

window.customElements.define("area-chart", AreaChart);
