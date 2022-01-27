import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";

export class ColumnChart extends ProviderMixin(LitElement) {
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
      data: Object,
      setData: Function,
      resetData: Function,
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
      "data",
      "setData",
      "resetData",
      "popUp",
      "setPopUp",
    ];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<column-form></column-form>`
      : html`
          <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            type="column"
            class="chart"
            title="${this.title}"
            @dblclick="${this.formPopUp}"
            subtitle="${this.subTitle}"
            categories="${JSON.stringify(this.data.categories)}"
            additional-options='{
      "xAxis": {
        "crosshair": true
      },
      "yAxis": {
        "min": 0,
        "title": {
          "text": "Number of Tweets"
        }
      },
      "tooltip": {
        "shared": true
      }
    }'
          >
            <vaadin-chart-series
              title="${this.data.setOne.title}"
              values="${JSON.stringify(this.data.setOne.values)}"
            ></vaadin-chart-series>
            ${!!this.data.setTwo
              ? html`<vaadin-chart-series
                  title="${this.data.setTwo.title}"
                  values="${JSON.stringify(this.data.setTwo.values)}"
                ></vaadin-chart-series>`
              : ""}
            ${!!this.data.setThree
              ? html`<vaadin-chart-series
                  title="${this.data.setThree.title}"
                  values="${JSON.stringify(this.data.setThree.values)}"
                ></vaadin-chart-series>`
              : null}
            ${!!this.data.setFour
              ? html`<vaadin-chart-series
                  title="${this.data.setFour.title}"
                  values="${JSON.stringify(this.data.setFour.values)}"
                ></vaadin-chart-series>`
              : null}
            >
          </vaadin-chart>
        `;
  }
}

class ColumnForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      title: String,
      setTitle: Function,
      subTitle: String,
      setSubTitle: Function,
      data: Object,
      setData: Function,
      resetData: Function,
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
      "data",
      "setData",
      "resetData",
      "popUp",
      "setPopUp",
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
          demoTwitter2022Data.tweetData.map((tweet) => {
            return tweet[formData[i]];
          }),
          "values"
        );
      }
    }

    // Setting Axis Data
    this.setData("unit", "Number of Tweets");
    this.setData(
      "categories",
      demoTwitter2022Data.tweetData.map((tweet) => {
        let heading = String(tweet[dataHeading]);
        return `${heading.substring(0, 2)}.${heading.substring(
          2,
          4
        )}.${heading.substring(4)}`;
      })
    );
    this.setTitle(event.path[0].title.value);
    this.setSubTitle(event.path[0].subTitle.value);

    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <form id="chartInputForm" @submit=${this.handleSubmit}>
        <label>Title:</label>
        <input name="title" />
        <label>Sub Title:</label>
        <input name="subTitle" />

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

window.customElements.define("column-chart", ColumnChart);
window.customElements.define("column-form", ColumnForm);
