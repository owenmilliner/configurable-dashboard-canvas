import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import { formatDate } from "../demo-data/data-utils";
import "@vaadin/charts";

export class BarChart extends ProviderMixin(LitElement) {
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
      subtitle: String,
      setSubtitle: Function,
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
      "subtitle",
      "setSubtitle",
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
    return this.popUp
      ? html`<bar-form></bar-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            type="bar"
            title="${this.title}"
            @dblclick="${this.formPopUp}"
            class="chart"
            subtitle="${this.subtitle}"
            categories="${JSON.stringify(this.data.categories)}"
            additional-options='{
      "yAxis": {
        "min": 0,
        "title": {
          "text": "${this.data.unit}",
          "align": "high"
        }
      },
      "tooltip": {
        "valueSuffix": " tweets"
      },
      "plotOptions": {
        "bar": {
          "dataLabels": {
            "enabled": true
          }
        }
      }
    }'
          >
            <vaadin-chart-series
              title="${this.data.setOne.title}"
              values="${JSON.stringify(this.data.setOne.values)}"
            >
            </vaadin-chart-series>
            ${!!this.data.setTwo
              ? html`<vaadin-chart-series
                  title="${this.data.setTwo.title}"
                  values="${JSON.stringify(this.data.setTwo.values)}"
                >
                </vaadin-chart-series>`
              : null}
            ${!!this.data.setThree
              ? html`<vaadin-chart-series
                  title="${this.data.setThree.title}"
                  values="${JSON.stringify(this.data.setThree.values)}"
                >
                </vaadin-chart-series>`
              : null}
            ${!!this.data.setFour
              ? html`<vaadin-chart-series
                  title="${this.data.setFour.title}"
                  values="${JSON.stringify(this.data.setFour.values)}"
                >
                </vaadin-chart-series>`
              : null}
          </vaadin-chart>`;
  }
}

class BarForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      subtitle: String,
      setSubtitle: Function,
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
      "subtitle",
      "setSubtitle",
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
    const dataHeading = event.path[0].dataHeading.value;
    const numberTranslate = ["One", "Two", "Three", "Four"];
    const formData = [];
    formData.push(event.path[0].dataSourceOne.value);
    formData.push(event.path[0].dataSourceTwo.value);
    formData.push(event.path[0].dataSourceThree.value);
    formData.push(event.path[0].dataSourceFour.value);

    // Setting values for each dataSet
    for (let i = 0; i < formData.length; i++) {
      if (formData[i] !== "none") {
        this.setData(`set${numberTranslate[i]}`, { title: "", values: [] });
        this.setData(`set${numberTranslate[i]}`, formData[i], "title");
        this.setData(
          `set${numberTranslate[i]}`,
          demoTwitter2022Data.tweetData.map((tweet) => tweet[formData[i]]),
          "values"
        );
      }
    }

    // Setting Axis Data
    this.setData("unit", "Number of Tweets");
    this.setData(
      "categories",
      demoTwitter2022Data.tweetData.map((tweet) =>
        formatDate(tweet[dataHeading])
      )
    );
    this.setTitle(event.path[0].title.value);
    this.setSubtitle(event.path[0].subtitle.value);

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
          <label>Subtitle:</label>
          <input name="subtitle" />
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

window.customElements.define("bar-form", BarForm);
window.customElements.define("bar-chart", BarChart);
