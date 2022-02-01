import { html, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";

export class PieChart extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.title = "";
    this.setTitle = (value) => {
      this.title = value;
    };

    this.values = [];
    this.setValues = (newValue) => {
      this.values = newValue;
    };

    this.popUp = true;
    this.setPopUp = (value) => {
      this.popUp = value;
    };
  }

  static get properties() {
    return {
      title: String,
      setTitle: Function,
      values: Array,
      setValues: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  static get provide() {
    return ["title", "setTitle", "values", "setValues", "popUp", "setPopUp"];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<pie-form></pie-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            @dblclick="${this.formPopUp}"
            type="pie"
            class="chart"
            title="${this.title}"
            no-legend
          >
            <vaadin-chart-series
              title="${this.title}"
              values="${JSON.stringify(this.values)}"
            >
            </vaadin-chart-series>
          </vaadin-chart>`;
  }
}

class PieForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      values: Array,
      setValues: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  static get inject() {
    return ["title", "setTitle", "values", "setValues", "popUp", "setPopUp"];
  }

  handleSubmit(event) {
    event.preventDefault();

    // Getting the form data.
    const dataSource = event.path[0].data.value;
    const dataHeading = event.path[0].dataHeading.value;

    // Formatting of data to the *specific* chart.
    const updatedValues = demoTwitter2022Data.tweetData
      .sort((valueOne, valueTwo) => {
        return valueTwo[dataSource] - valueOne[dataSource];
      })
      .map((tweet) => {
        let heading = String(tweet[dataHeading]);
        return [
          `${heading.substring(0, 2)}.${heading.substring(
            2,
            4
          )}.${heading.substring(4)}`,
          tweet[dataSource],
        ];
      });

    // Setting Data
    this.setTitle(event.path[0].title.value);
    this.setValues(updatedValues);

    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`<link rel="stylesheet" href="./chart.css" />
      <form class="chartInputForm" @submit=${this.handleSubmit}>
        <div class="formInputItem">
          <label>Title:</label>
          <input name="title" />
        </div>
        <div class="formInputItem">
          <label for="dataSource">Data:</label>
          <select id="dataSource" name="data">
            <option value="volumeOfTweets">Number of tweets</option>
            <option value="severityOne">Severity 1</option>
            <option value="severityTwo">Severity 2</option>
            <option value="severityThree">Severity 3</option>
          </select>
        </div>
        <div class="formInputItem">
          <label for="dataSource">Data Headings:</label>
          <select id="dataHeading" name="dataHeading">
            <option value="date">Date</option>
          </select>
        </div>
        <div class="formInputItem">
          <button type="submit">Update Chart</button>
        </div>
      </form> `;
  }
}

window.customElements.define("pie-chart", PieChart);
window.customElements.define("pie-form", PieForm);
