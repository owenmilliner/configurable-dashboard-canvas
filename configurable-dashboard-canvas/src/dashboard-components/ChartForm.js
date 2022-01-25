import { html, css, LitElement } from "lit";

export class ChartForm extends LitElement {
  static properties = {
    _chartType: { state: true },
    _chartTitle: { state: true },
    _chartValues: { state: true },
  };

  static get styles() {
    return css`
      #chartInputForm {
        position: absolute;
        padding: 10px;
        top: 50%;
        left: 50%;
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
        text-align: centre;
        opacity: 1;
      }
    `;
  }

  constructor() {
    super();
    this._chartType = "";
    this._chartTitle = "";
    this._chartValues = [];
  }

  updateChartProperties(chartProperties) {
    console.log(chartProperties);
  }

  handleSubmit(event) {
    event.preventDefault();
    const canvas = document.querySelector("canvas-component").shadowRoot;
    const page = canvas.getElementById("page");
    const chartForm = canvas.getElementById("chartInputForm");

    const title = event.path[0].title.value;
    const values = event.path[0].data.value;
    const headings = event.path[0].dataHeading.value;
    const chartId = chartForm.getAttribute("chartId");

    this.updateChartProperties({ title, values, headings, chartId });
    page.style.opacity = 1;
    console.log(event.path[1]);
    chartForm.remove();
  }

  render() {
    return html`<div id="chartInputForm">
      <h1>Choose Chart Data</h1>

      <p>Please complete the required data fields below:</p>

      <form id="inputForm" @submit=${this.handleSubmit}>
        <label for="chartTitle">Chart Title:</label>
        <input type="text" id="chartTitle" name="title" />

        <label for="dataSource">Data:</label>
        <select id="dataSource" name="data">
          <option value="Number of tweets">Number of tweets</option>
          <option value="Severity 1">Severity 1</option>
          <option value="Severity 2">Severity 2</option>
          <option value="Severity 3">Severity 3</option>
        </select>
        <label for="dataSource">Data Headings:</label>
        <select id="dataHeading" name="dataHeading">
          <option value="Date">Date</option>
        </select>
        <input type="submit" />
      </form>
    </div>`;
  }
}

window.customElements.define("chart-form", ChartForm);
