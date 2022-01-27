import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";

export class AreaChart extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.title = "";
    this.setTitle = (value) => {
      this.title = value;
    };
    this.subTitle = "";
    this.setSubTitle = (value) => {
      this.subTitle = value;
    };

    this.values = [];
    this.setValues = (newValue) => {
      this.values = newValue;
    };
    this.categories = [];
    this.setCategories = (newValue) => {
      this.categories = newValue;
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
      subTitle: String,
      setSubTitle: Function,
      values: Array,
      setValues: Function,
      categories: Array,
      setCategories: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  static get provide() {
    return [
      "title",
      "setTitle",
      "subTitle",
      "setSubTitle",
      "values",
      "setValues",
      "categories",
      "setCategories",
      "popUp",
      "setPopUp",
    ];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<area-form></area-form>`
      : html`
          <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            @dblclick="${this.formPopUp}"
            type="area"
            class="chart"
            title="${this.title}"
            subtitle="${this.subTitle}"
            categories="${JSON.stringify(this.categories)}"
            stacking="normal"
            no-legend
            tooltip
          >
            // need to produce a series for length fo categories
            <vaadin-chart-series
              title="${this.values[0].title}"
              values="${this.values[0].values}"
              unit="Millions"
            >
            </vaadin-chart-series>
          </vaadin-chart>
        `;
  }
}

class AreaForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      subTitle: String,
      setSubTitle: Function,
      values: Array,
      setValues: Function,
      categories: Array,
      setCategories: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

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

  static get inject() {
    return [
      "title",
      "setTitle",
      "subTitle",
      "setSubTitle",
      "values",
      "setValues",
      "categories",
      "setCategories",
      "popUp",
      "setPopUp",
    ];
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

    const sortedByDate = demoTwitter2022Data.tweetData
      .sort((valueOne, valueTwo) => {
        return valueOne.date - valueTwo.date;
      })
      .map((tweet) => {
        let heading = String(tweet[dataHeading]);
        return [
          `${heading.substring(0, 2)}.${heading.substring(
            2,
            4
          )}.${heading.substring(4)}`,
        ];
      })
      .flat();

    // Setting Data
    this.setTitle(event.path[0].title.value);
    this.setValues(updatedValues);
    this.setCategories(sortedByDate);

    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <form id="chartInputForm" @submit=${this.handleSubmit}>
        <label>Title:</label>
        <input name="title" />
        <label for="dataSource">Data:</label>
        <select id="dataSource" name="data">
          <option value="volumeOfTweets">Number of tweets</option>
          <option value="severityOne">Severity 1</option>
          <option value="severityTwo">Severity 2</option>
          <option value="severityThree">Severity 3</option>
        </select>
        <label for="dataSource">Data Headings:</label>
        <select id="dataHeading" name="dataHeading">
          <option value="date">Date</option>
        </select>
        <button type="submit">Update Chart</button>
      </form>
    `;
  }
}

window.customElements.define("area-chart", AreaChart);
window.customElements.define("area-form", AreaForm);
