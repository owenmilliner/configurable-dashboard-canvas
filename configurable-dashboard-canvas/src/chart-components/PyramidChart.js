import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";

export class PyramidChart extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.title = "";
    this.setTitle = (value) => {
      this.title = value;
    };

    this.subtitle = "";
    this.setSubtitle = (value) => {
      this.subtitle = value;
    };

    this.values = [];
    this.setValues = (newValue) => {
      this.values = newValue;
    };

    this.popUp = true;
    this.setPopUp = (value) => {
      this.popUp = value;
    };

    this.formSelections = {};
    this.setFormSelections = (property, value, nestedProperty) => {
      if (nestedProperty) {
        this.formSelections[property][nestedProperty] = value;
      } else {
        this.formSelections[property] = value;
      }
    };
  }

  static get properties() {
    return {
      title: String,
      setTitle: Function,
      subtitle: String,
      setSubtitle: Function,
      values: Array,
      setValues: Function,
      popUp: Boolean,
      setPopUp: Function,
      formSelections: Object,
      setFormSelections: Function,
    };
  }

  static get provide() {
    return [
      "title",
      "setTitle",
      "subtitle",
      "setSubtitle",
      "values",
      "setValues",
      "popUp",
      "setPopUp",
      "formSelections",
      "setFormSelections",
    ];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<pyramid-form></pyramid-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            title="${this.title}"
            subtitle="${this.subtitle}"
            @dblclick="${this.formPopUp}"
            type="pyramid"
            class="chart"
            no-legend
            additional-options='{
        "plotOptions": {
          "series": {
            "dataLabels": {
              "enabled": true,
              "format": "<b>{point.name}</b> ({point.y:,.0f})",
              "softConnector": true
            },
            "center": ["40%","50%"],
            "width":"80%"
          }
        }
      }'
          >
            <vaadin-chart-series
              title="${this.title}"
              values="${JSON.stringify(this.values)}"
            >
            </vaadin-chart-series>
          </vaadin-chart>`;
  }
}

class PyramidForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      subtitle: String,
      setSubtitle: Function,
      values: Array,
      setValues: Function,
      popUp: Boolean,
      setPopUp: Function,
      formSelections: Object,
      setFormSelections: Function,
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
      "subtitle",
      "setSubtitle",
      "values",
      "setValues",
      "popUp",
      "setPopUp",
      "formSelections",
      "setFormSelections",
    ];
  }

  handleSubmit(event) {
    event.preventDefault();

    // Getting the form data.
    const dataSource = event.path[0].data.value;
    const dataHeading = event.path[0].dataHeading.value;
    this.setFormSelections("dataHeading", dataHeading);
    this.setFormSelections("dataSources", {
      dataSourceOne: "",
    });
    this.setFormSelections(`dataSourceOne`, dataSource);

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
    this.setSubtitle(event.path[0].subtitle.value);
    this.setValues(updatedValues);
    console.log(dataSource);

    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`<link rel="stylesheet" href="./chart.css" />
      <form class="chartInputForm" @submit=${this.handleSubmit}>
        <div class="formInputItem">
          <label>Title:</label>
          <input name="title" value=${this.title} />
        </div>

        <div class="formInputItem">
          <label>Subtitle:</label>
          <input name="subtitle" value=${this.subtitle} />
        </div>

        <div class="formInputItem">
          <label for="dataSource">Data:</label>
          <select id="dataSource" name="data">
            <option
              value="volumeOfTweets"
              ?selected=${this.formSelections.dataSourceOne ===
              "volumeOfTweets"}
            >
              Number of tweets
            </option>
            <option
              value="severityOne"
              ?selected=${this.formSelections.dataSourceOne === "severityOne"}
            >
              Severity 1
            </option>
            <option
              value="severityTwo"
              ?selected=${this.formSelections.dataSourceOne === "severityTwo"}
            >
              Severity 2
            </option>
            <option
              value="severityThree"
              ?selected=${this.formSelections.dataSourceOne === "severityThree"}
            >
              Severity 3
            </option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataHeading">Data Headings:</label>
          <select id="dataHeading" name="dataHeading">
            <option
              value="date"
              ?selected=${this.formSelections.dataSourceFour === "date"}
            >
              Date
            </option>
          </select>
        </div>

        <div class="formInputItem">
          <button type="submit">Update Chart</button>
        </div>
      </form> `;
  }
}

window.customElements.define("pyramid-chart", PyramidChart);
window.customElements.define("pyramid-form", PyramidForm);
