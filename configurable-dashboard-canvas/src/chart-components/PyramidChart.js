import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";

export class PyramidChart extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.title = "TEST";
    this.setTitle = (value) => {
      this.title = value;
    };

    this.popUp = false;
    this.setPopUp = (value) => {
      this.popUp = value;
    };

    this.values = [
      ["Website visits", 15654],
      ["Downloads", 4064],
      ["Requested price list", 1987],
      ["Invoice sent", 976],
      ["Finalized", 846],
    ];
    this.setValues = (newValue) => {
      this.values = newValue;
    };

    this.oldValues = [
      ["Website visits", 15654],
      ["Downloads", 4064],
      ["Requested price list", 1987],
      ["Invoice sent", 976],
      ["Finalized", 846],
    ];
  }
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      oldValues: Array,
      popUp: Boolean,
      setPopUp: Function,
      values: Array,
      setValues: Function,
    };
  }

  static get provide() {
    return ["title", "setTitle", "popUp", "setPopUp", "values", "setValues"];
  }

  formPopUp() {
    this.popUp = true;
  }

  render() {
    return this.popUp
      ? html`<test-form></test-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            @dblclick="${this.formPopUp}"
            type="pyramid"
            title="${this.title}"
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

class TestForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      popUp: Boolean,
      setPopUp: Function,
      values: Array,
      setValues: Function,
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
    return ["title", "setTitle", "popUp", "setPopUp", "values", "setValues"];
  }

  handleSubmit(event) {
    event.preventDefault();

    const dataSource = event.path[0].data.value;
    const dataHeading = event.path[0].dataHeading.value;
    console.log(dataSource);
    console.log(dataHeading);

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
      </form>
    `;
  }
}

window.customElements.define("pyramid-chart", PyramidChart);
window.customElements.define("test-form", TestForm);
