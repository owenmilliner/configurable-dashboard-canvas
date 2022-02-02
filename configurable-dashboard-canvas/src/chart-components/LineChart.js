import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";
import { demoTwitter2022Data } from "../demo-data/demo-bad-tweets-2022";
import "@vaadin/charts";
import { formatDate } from "../demo-data/data-utils";

export class LineChart extends ProviderMixin(LitElement) {
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
      popUp: Boolean,
      setPopUp: Function,
      data: Object,
      setData: Function,
      resetData: Function,
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
      "popUp",
      "setPopUp",
      "data",
      "setData",
      "resetData",
      "formSelections",
      "setFormSelections",
    ];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<line-form></line-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <vaadin-chart
            title="${this.title}"
            subtitle="${this.subtitle}"
            @dblclick="${this.formPopUp}"
            class="chart"
            categories="${JSON.stringify(this.data.categories)}"
            additional-options='{
            "legend": {
              "layout": "vertical",
              "align": "right",
              "verticalAlign": "middle"
            }
          }'
          >
            <vaadin-chart-series
              title="${this.data.setOne.title}"
              unit="${this.data.unit}"
              values="${JSON.stringify(this.data.setOne.values)}"
            ></vaadin-chart-series>
            ${!!this.data.setTwo
              ? html`<vaadin-chart-series
                  title="${this.data.setTwo.title}"
                  unit="${this.data.unit}"
                  values="${JSON.stringify(this.data.setTwo.values)}"
                ></vaadin-chart-series>`
              : null}
            ${!!this.data.setThree
              ? html`<vaadin-chart-series
                  title="${this.data.setThree.title}"
                  unit="${this.data.unit}"
                  values="${JSON.stringify(this.data.setThree.values)}"
                ></vaadin-chart-series>`
              : null}
            ${!!this.data.setFour
              ? html`<vaadin-chart-series
                  title="${this.data.setFour.title}"
                  unit="${this.data.unit}"
                  values="${JSON.stringify(this.data.setFour.values)}"
                ></vaadin-chart-series>`
              : null}
          </vaadin-chart>`;
  }
}

class LineForm extends ConsumerMixin(LitElement) {
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
      "popUp",
      "setPopUp",
      "data",
      "setData",
      "resetData",
      "formSelections",
      "setFormSelections",
    ];
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetData();

    // Getting the form data.
    const dataHeading = event.path[0].dataHeading.value;
    this.setFormSelections("dataHeading", dataHeading);

    const numberTranslate = ["One", "Two", "Three", "Four"];
    const formData = [];
    formData.push(event.path[0].dataSourceOne.value);
    formData.push(event.path[0].dataSourceTwo.value);
    formData.push(event.path[0].dataSourceThree.value);
    formData.push(event.path[0].dataSourceFour.value);

    // Setting values for each dataSet
    this.setFormSelections("dataSources", {
      dataSourceOne: "",
      dataSourceTwo: "",
      dataSourceThree: "",
      dataSourceFour: "",
    });

    for (let i = 0; i < formData.length; i++) {
      this.setFormSelections(`dataSource${numberTranslate[i]}`, formData[i]);
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
          <input name="title" value=${this.title} />
        </div>

        <div class="formInputItem">
          <label>Subtitle:</label>
          <input name="subtitle" value=${this.subtitle} />
        </div>

        <div class="formInputItem">
          <label for="dataSourceOne">Data Source One:</label>
          <select id="dataSourceOne" name="dataSourceOne">
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
          <label for="dataSourceTwo">Data Source Two:</label>
          <select id="dataSourceTwo" name="dataSourceTwo">
            <option
              value="none"
              ?selected=${this.formSelections.dataSourceTwo === "none"}
            >
              None
            </option>
            <option
              value="volumeOfTweets"
              ?selected=${this.formSelections.dataSourceTwo ===
              "volumeOfTweets"}
            >
              Number of tweets
            </option>
            <option
              value="severityOne"
              ?selected=${this.formSelections.dataSourceTwo === "severityOne"}
            >
              Severity 1
            </option>
            <option
              value="severityTwo"
              ?selected=${this.formSelections.dataSourceTwo === "severityTwo"}
            >
              Severity 2
            </option>
            <option
              value="severityThree"
              ?selected=${this.formSelections.dataSourceTwo === "severityThree"}
            >
              Severity 3
            </option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceThree">Data Source Three:</label>
          <select id="dataSourceThree" name="dataSourceThree">
            <option
              value="none"
              ?selected=${this.formSelections.dataSourceThree === "none"}
            >
              None
            </option>
            <option
              value="volumeOfTweets"
              ?selected=${this.formSelections.dataSourceThree ===
              "volumeOfTweets"}
            >
              Number of tweets
            </option>
            <option
              value="severityOne"
              ?selected=${this.formSelections.dataSourceThree === "severityOne"}
            >
              Severity 1
            </option>
            <option
              value="severityTwo"
              ?selected=${this.formSelections.dataSourceThree === "severityTwo"}
            >
              Severity 2
            </option>
            <option
              value="severityThree"
              ?selected=${this.formSelections.dataSourceThree ===
              "severityThree"}
            >
              Severity 3
            </option>
          </select>
        </div>

        <div class="formInputItem">
          <label for="dataSourceFour">Data Source Four:</label>
          <select id="dataSourceFour" name="dataSourceFour">
            <option
              value="none"
              ?selected=${this.formSelections.dataSourceFour === "none"}
            >
              None
            </option>
            <option
              value="volumeOfTweets"
              ?selected=${this.formSelections.dataSourceFour ===
              "volumeOfTweets"}
            >
              Number of tweets
            </option>
            <option
              value="severityOne"
              ?selected=${this.formSelections.dataSourceFour === "severityOne"}
            >
              Severity 1
            </option>
            <option
              value="severityTwo"
              ?selected=${this.formSelections.dataSourceFour === "severityTwo"}
            >
              Severity 2
            </option>
            <option
              value="severityThree"
              ?selected=${this.formSelections.dataSourceFour ===
              "severityThree"}
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

window.customElements.define("line-chart", LineChart);
window.customElements.define("line-form", LineForm);
