import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import { formatDate } from "../demo-data/data-utils";
import "@vaadin/charts";

export class PolarChart extends ProviderMixin(LitElement) {
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
      ? html`<polar-form></polar-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            title="${this.title}"
            @dblclick="${this.formPopUp}"
            class="chart"
            subtitle="${this.subtitle}"
            polar
            additional-options='{
      "xAxis": {
        "tickInterval": 45,
        "min": 0,
        "max": 360,
        "labels": {}
      },
      "yAxis": {
        "min":0
      },
      "tooltip": {
        "valueSuffix": " tweets"
      },
      "plotOptions": {
        "series": {
          "pointStart": 0,
          "pointInterval":45
        },
        "column": {
          "pointPadding": 0,
          "groupPadding": 0
        }
      }
    }'
          >
            <vaadin-chart-series
              type="column"
              title="Column"
              values="${JSON.stringify(this.data.setOne)}"
              additional-options='{
        "pointPlacement": "between"
      }'
            ></vaadin-chart-series>
            <vaadin-chart-series
              type="line"
              title="Line"
              values="${JSON.stringify(this.data.setTwo)}"
            >
            </vaadin-chart-series>
            <vaadin-chart-series
              type="area"
              title="Area"
              values="${JSON.stringify(this.data.setThree)}"
            >
            </vaadin-chart-series>
          </vaadin-chart>`;
  }
}

class PolarForm extends ConsumerMixin(LitElement) {
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
    const dataSource = event.path[0].data.value;
    const chosenDataSource = demoTwitter2022Data.tweetData.map(
      (tweet) => tweet[dataSource]
    );

    const setOne = [...chosenDataSource];
    const setTwo = [...chosenDataSource];
    const setThree = [...chosenDataSource];

    // Setting values for each dataSet
    // Sort in descending
    // [8, 7, 6, 5, 4, 3, 2, 1]
    this.setData(
      "setOne",
      setOne.sort((valueOne, valueTwo) => {
        return valueTwo - valueOne;
      })
    );

    // Sort in ascending
    // // [1, 2, 3, 4, 5, 6, 7, 8]
    this.setData(
      "setTwo",
      setTwo.sort((valueOne, valueTwo) => {
        return valueOne - valueTwo;
      })
    );

    // // [1, 8, 2, 7, 3, 6, 4, 5]
    // Sort in 1st asc, 1st desc, 2nd asc, 2nd desc...
    setThree.sort((valueOne, valueTwo) => {
      return valueOne - valueTwo;
    });

    let arrayCount = 0;
    const sortedArray = [];
    for (
      let i = 0, j = setThree.length - 1;
      i <= setThree.length / 2, j >= setThree.length / 2;
      i++, j--
    ) {
      if (arrayCount < setThree.length) {
        sortedArray.push(setThree[i]);
        arrayCount++;
      }

      if (arrayCount < setThree.length) {
        sortedArray.push(setThree[j]);
        arrayCount++;
      }
    }
    this.setData(`setThree`, sortedArray);

    // Setting ChartHeadings
    this.setTitle(event.path[0].title.value);
    this.setSubtitle(event.path[0].subtitle.value);

    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <form id="chartInputForm" @submit=${this.handleSubmit}>
        <label>Title:</label>
        <input name="title" />

        <label>Subtitle:</label>
        <input name="subtitle" />

        <label for="data">Data Source One:</label>
        <select id="data" name="data">
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

window.customElements.define("polar-form", PolarForm);
window.customElements.define("polar-chart", PolarChart);
