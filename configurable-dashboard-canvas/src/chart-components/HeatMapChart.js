import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import { formatDate } from "../demo-data/data-utils";
import "@vaadin/charts";

export class HeatMapChart extends ProviderMixin(LitElement) {
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
    console.log(this.data);
    return this.popUp
      ? html`<heatmap-form></heatmap-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            type="heatmap"
            title="${this.title}"
            @dblclick="${this.formPopUp}"
            class="chart"
            subtitle="${this.subtitle}"
            tooltip
            additional-options='{
      "xAxis": {
        "categories": ${JSON.stringify(this.data.xCategories)}
      },

      "yAxis": {
        "categories": ${JSON.stringify(this.data.yCategories)},
        "title": null
      },

      "colorAxis": {
        "min": 0,
        "minColor": "#FFFFFF",
        "maxColor": "#1676f3"
      },

      "legend": {
        "align": "right",
        "layout": "vertical",
        "margin": 0,
        "verticalAlign": "top",
        "y": 25,
        "symbolHeight": 280
      }
    }'
          >
            <vaadin-chart-series
              title="${this.data.title}"
              values="${JSON.stringify(this.data.values)}"
              additional-options='{
      "dataLabels": {
        "enabled": "true"
      },
      "tooltip": {
        "pointFormat": "Tweets: {point.value}"
      }
    }'
            ></vaadin-chart-series>
          </vaadin-chart>`;
  }
}

class HeatMapForm extends ConsumerMixin(LitElement) {
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
    const formData = [];
    formData.push(event.path[0].dataSourceOne.value);
    formData.push(event.path[0].dataSourceTwo.value);
    formData.push(event.path[0].dataSourceThree.value);
    formData.push(event.path[0].dataSourceFour.value);

    // Setting values for data
    const updatedData = [];
    const tweets = demoTwitter2022Data.tweetData.map((tweet) => [
      tweet[formData[0]],
      tweet[formData[1]],
      tweet[formData[2]],
      tweet[formData[3]],
    ]);

    for (let i = 0; i < tweets.length; i++) {
      for (let j = 0; j < formData.length; j++) {
        updatedData.push([i, j, tweets[i][j]]);
      }
    }

    this.setData("values", updatedData);

    // Setting Axis Data
    this.setData(
      "xCategories",
      demoTwitter2022Data.tweetData.map((tweet) =>
        formatDate(tweet[dataHeading])
      )
    );
    this.setData("yCategories", formData);
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
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceTwo">Data Source Two:</label>
          <select id="dataSourceTwo" name="dataSourceTwo">
            <option value="severityOne">Severity 1</option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceThree">Data Source Three:</label>
          <select id="dataSourceThree" name="dataSourceThree">
            <option value="severityTwo">Severity 2</option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceFour">Data Source Four:</label>
          <select id="dataSourceFour" name="dataSourceFour">
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

window.customElements.define("heatmap-form", HeatMapForm);
window.customElements.define("heatmap-chart", HeatMapChart);
