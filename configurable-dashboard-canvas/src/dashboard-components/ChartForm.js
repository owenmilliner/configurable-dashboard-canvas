import { html, css, LitElement } from "lit";
import { updateData } from "../chart-components/PyramidChart";

export class ChartForm extends LitElement {
  static properties = {
    title: {
      hasChanged: (value, oldValue) => {
        return value;
      },
    },
    values: {
      hasChanged: (value, oldValue) => {
        return value;
      },
    },
    popUp: {
      hasChanged: (value, oldValue) => {
        return value;
      },
    },
  };

  static get styles() {
    return css`
      #chartInputForm {
        position: absolute;
        padding: 10px;
        top: 50%;
        left: 50%;
        width: 600px;
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
        text-align: centre;
        opacity: 1;
      }
    `;
  }

  handleSubmit(event) {
    event.preventDefault();
    const canvas = document.querySelector("canvas-component").shadowRoot;
    const page = canvas.getElementById("page");
    const chartForm = canvas.getElementById("chartInputForm");

    this.title = event.path[0].title.value;
    this.values = event.path[0].data.value;

    page.style.opacity = 1;
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
