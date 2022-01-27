import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";
import { formatDate } from "../demo-data/data-utils";

export class TreeMapChart extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.title = "";
    this.setTitle = (value) => {
      this.title = value;
    };

    this.popUp = true;
    this.setPopUp = (value) => {
      this.popUp = value;
    };

    this.data = {};
    this.setData = (property, value, nestedProperty) => {
      if (nestedProperty) {
        this.data[property][nestedProperty] = value;
      } else {
        this.data[property] = value;
      }
    };
    this.resetData = () => {
      this.data = {};
    };
  }

  static get properties() {
    return {
      title: String,
      setTitle: Function,

      popUp: Boolean,
      setPopUp: Function,
      data: Object,
      setData: Function,
      resetData: Function,
    };
  }

  static get provide() {
    return [
      "title",
      "setTitle",
      "popUp",
      "setPopUp",
      "data",
      "setData",
      "resetData",
    ];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    console.log(this.data);
    return this.popUp
      ? html`<treemap-form></treemap-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            id="treemap"
            type="treemap"
            title="${this.title}"
            @dblclick="${this.formPopUp}"
            class="chart"
            tooltip
          >
            <vaadin-chart-series
              values=${JSON.stringify(this.data.chartData).replace(",", ", ")}
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

class TreeMapForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      popUp: Boolean,
      setPopUp: Function,
      data: Object,
      setData: Function,
      resetData: Function,
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
      "popUp",
      "setPopUp",
      "data",
      "setData",
      "resetData",
    ];
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetData();

    // Getting the form data.

    const formData = [];
    formData.push(event.path[0].dataSourceOne.value);
    formData.push(event.path[0].dataSourceTwo.value);
    formData.push(event.path[0].dataSourceThree.value);
    formData.push(event.path[0].dataSourceFour.value);

    // Setting values for each dataSet

    let chartData = [];
    for (let i = 0; i < formData.length; i++) {
      if (formData[i] !== "none") {
        chartData.push({
          id: `${formData[i]}`,
          name: `${formData[i]}`,
          colorIndex: `${i}`,
        });
      }
    }

    for (let i = 0; i < demoTwitter2022Data.tweetData.length; i++) {
      chartData.push({
        name: `${demoTwitter2022Data.tweetData[i].date}`,
        parent: `${Object.keys(demoTwitter2022Data.tweetData[i])[1]}`,
        value: `${demoTwitter2022Data.tweetData[i].volumeOfTweets}`,
      });
      chartData.push({
        name: `${demoTwitter2022Data.tweetData[i].date}`,
        parent: `${Object.keys(demoTwitter2022Data.tweetData[i])[2]}`,
        value: `${demoTwitter2022Data.tweetData[i].severityOne}`,
      });
      chartData.push({
        name: `${demoTwitter2022Data.tweetData[i].date}`,
        parent: `${Object.keys(demoTwitter2022Data.tweetData[i])[3]}`,
        value: `${demoTwitter2022Data.tweetData[i].severityTwo}`,
      });
      chartData.push({
        name: `${demoTwitter2022Data.tweetData[i].date}`,
        parent: `${Object.keys(demoTwitter2022Data.tweetData[i])[4]}`,
        value: `${demoTwitter2022Data.tweetData[i].severityThree}`,
      });
    }

    // Setting Axis Data

    this.setData(chartData);
    this.setTitle(event.path[0].title.value);

    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <form id="chartInputForm" @submit=${this.handleSubmit}>
        <label>Title:</label>
        <input name="title" />

        <label for="dataSourceOne">Data Source One:</label>
        <select id="dataSourceOne" name="dataSourceOne">
          <option value="volumeOfTweets">Number of tweets</option>
          <option value="severityOne">Severity 1</option>
          <option value="severityTwo">Severity 2</option>
          <option value="severityThree">Severity 3</option>
        </select>

        <label for="dataSourceTwo">Data Source Two:</label>
        <select id="dataSourceTwo" name="dataSourceTwo">
          <option value="none">None</option>
          <option value="volumeOfTweets">Number of tweets</option>
          <option value="severityOne">Severity 1</option>
          <option value="severityTwo">Severity 2</option>
          <option value="severityThree">Severity 3</option>
        </select>

        <label for="dataSourceThree">Data Source Three:</label>
        <select id="dataSourceThree" name="dataSourceThree">
          <option value="none">None</option>
          <option value="volumeOfTweets">Number of tweets</option>
          <option value="severityOne">Severity 1</option>
          <option value="severityTwo">Severity 2</option>
          <option value="severityThree">Severity 3</option>
        </select>

        <label for="dataSourceFour">Data Source Four:</label>
        <select id="dataSourceFour" name="dataSourceFour">
          <option value="none">None</option>
          <option value="volumeOfTweets">Number of tweets</option>
          <option value="severityOne">Severity 1</option>
          <option value="severityTwo">Severity 2</option>
          <option value="severityThree">Severity 3</option>
        </select>

        <label for="dataHeading">Data Headings:</label>
        <select id="dataHeading" name="dataHeading">
          <option value="date">Date</option>
        </select>

        <button type="submit">Update Chart</button>
      </form>
    `;
  }
}

window.customElements.define("treemap-form", TreeMapForm);
window.customElements.define("treemap-chart", TreeMapChart);
