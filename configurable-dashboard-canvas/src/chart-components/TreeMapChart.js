import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import { formatDate } from "../demo-data/data-utils";
import "@vaadin/charts";

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
              values="${JSON.stringify(this.data.parents + this.data.values)}"
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

    const parents = [];
    parents.push({
      id: event.path[0].dataSourceOne.value,
      name: event.path[0].dataSourceOne.value,
      colorIndex: 0,
    });
    parents.push({
      id: event.path[0].dataSourceTwo.value,
      name: event.path[0].dataSourceTwo.value,
      colorIndex: 1,
    });
    parents.push({
      id: event.path[0].dataSourceThree.value,
      name: event.path[0].dataSourceThree.value,
      colorIndex: 2,
    });
    parents.push({
      id: event.path[0].dataSourceFour.value,
      name: event.path[0].dataSourceFour.value,
      colorIndex: 3,
    });

    // Setting values for data
    const updatedData = [];
    const tweets = demoTwitter2022Data.tweetData.forEach((tweet) => [
      updatedData.push({
        name: tweet.date,
        parent: Object.keys(tweet)[1],
        value: tweet[parents[0].id],
      }),
      updatedData.push({
        name: tweet.date,
        parent: Object.keys(tweet)[2],
        value: tweet[parents[1].id],
      }),
      updatedData.push({
        name: tweet.date,
        parent: Object.keys(tweet)[3],
        value: tweet[parents[2].id],
      }),
      updatedData.push({
        name: tweet.date,
        parent: Object.keys(tweet)[4],
        value: tweet[parents[3].id],
      }),
    ]);

    for (let i = 0; i < tweets.length; i++) {
      for (let j = 0; j < parents.length; j++) {
        updatedData.push([i, j, tweets[i][j]]);
      }
    }

    this.setData("values", updatedData);
    this.setData("parents", parents);
    this.setTitle(event.path[0].title.value);

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
          <label for="dataSourceOne">Data Source One:</label>
          <select id="dataSourceOne" name="dataSourceOne">
            <option value="volumeOfTweets">Number of tweets</option>
            <option value="severityOne">Severity 1</option>
            <option value="severityTwo">Severity 2</option>
            <option value="severityThree">Severity 3</option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceTwo">Data Source Two:</label>
          <select id="dataSourceTwo" name="dataSourceTwo">
            <option value="none">None</option>
            <option value="volumeOfTweets">Number of tweets</option>
            <option value="severityOne">Severity 1</option>
            <option value="severityTwo">Severity 2</option>
            <option value="severityThree">Severity 3</option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceThree">Data Source Three:</label>
          <select id="dataSourceThree" name="dataSourceThree">
            <option value="none">None</option>
            <option value="volumeOfTweets">Number of tweets</option>
            <option value="severityOne">Severity 1</option>
            <option value="severityTwo">Severity 2</option>
            <option value="severityThree">Severity 3</option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceFour">Data Source Four:</label>
          <select id="dataSourceFour" name="dataSourceFour">
            <option value="none">None</option>
            <option value="volumeOfTweets">Number of tweets</option>
            <option value="severityOne">Severity 1</option>
            <option value="severityTwo">Severity 2</option>
            <option value="severityThree">Severity 3</option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataHeading">Data Headings:</label>
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

window.customElements.define("treemap-form", TreeMapForm);
window.customElements.define("treemap-chart", TreeMapChart);
