import { html, css, LitElement } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";

export class TextBox extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.textContent = "insert text";
    this.setTextContent = (newValue) => {
      this.textContent = newValue;
    };

    this.size = "12px";
    this.setSize = (newValue) => {
      this.size = newValue;
    };

    this.bold = "none";
    this.setBold = (newValue) => {
      this.bold = newValue;
    };

    this.italic = "none";
    this.setItalic = (newValue) => {
      this.italic = newValue;
    };

    this.underline = "none";
    this.setUnderline = (newValue) => {
      this.underline = newValue;
    };

    this.backgroundColor = "#FFFFFF";
    this.setBackgroundColor = (newValue) => {
      this.backgroundColor = newValue;
    };

    this.textColor = "#000000";
    this.setTextColor = (newValue) => {
      this.textColor = newValue;
    };

    this.popUp = true;
    this.setPopUp = (value) => {
      this.popUp = value;
    };
  }

  static get properties() {
    return {
      textContent: String,
      setTextContent: Function,
      size: String,
      setSize: Function,
      bold: String,
      setBold: Function,
      italic: String,
      setItalic: Function,
      underline: String,
      setUnderline: Function,
      backgroundColor: String,
      setBackgroundColor: Function,
      textColor: String,
      setTextColor: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  static get provide() {
    return [
      "textContent",
      "setTextContent",
      "size",
      "setSize",
      "bold",
      "setBold",
      "italic",
      "setItalic",
      "underline",
      "setUnderline",
      "backgroundColor",
      "setBackgroundColor",
      "textColor",
      "setTextColor",
      "popUp",
      "setPopUp",
    ];
  }

  formPopUp(ev) {
    this.setTextContent(ev.target.value);
    this.popUp = !this.popUp;
  }

  render() {
    return this.popUp
      ? html`<text-form></text-form>`
      : html` <link rel="stylesheet" href="./chart.css" />
          <textarea
            @dblclick="${this.formPopUp}"
            style="border:none;
            font-size:${this.size};
            color: ${this.textColor};
            font-weight: ${this.bold};
            font-style: ${this.italic};
            text-decoration: ${this.underline};
            background-color: ${this.backgroundColor};
            "
          >
${this.textContent}</textarea
          >`;
  }
}

class TextForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      textContent: String,
      setTextContent: Function,
      size: String,
      setSize: Function,
      bold: String,
      setBold: Function,
      italic: String,
      setItalic: Function,
      underline: String,
      setUnderline: Function,
      backgroundColor: String,
      setBackgroundColor: Function,
      textColor: String,
      setTextColor: Function,
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
        width: auto;
        padding: 1vh;
        background-color: #06152c;
        color: white;
        border: 0.25vw solid rgb(75, 216, 212);
        border-radius: 1px;
        text-align: centre;
        font-family: "Whitney", sans-serif;
      }

      .formInputItem {
        display: block;
        padding: 0.5vh;
      }

      button {
        width: 100%;
        background-color: rgb(75, 216, 212);
        border: 0.25vw solid rgb(75, 216, 212);
        padding: 0.25vh;
        color: white;
      }

      button:hover {
        background-color: #06152c;
        border: 0.25vw solid rgb(75, 216, 212);
        color: white;
        cursor: pointer;
      }
    `;
  }

  static get inject() {
    return [
      "textContent",
      "setTextContent",
      "size",
      "setSize",
      "bold",
      "setBold",
      "italic",
      "setItalic",
      "underline",
      "setUnderline",
      "backgroundColor",
      "setBackgroundColor",
      "textColor",
      "setTextColor",
      "popUp",
      "setPopUp",
    ];
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setTextColor(event.path[0].fontColor.value);
    this.setBackgroundColor(event.path[0].backColor.value);
    this.setSize(event.path[0].fontSize.value);

    if (event.path[0].bold.checked) {
      this.setBold("bold");
    } else {
      this.setBold("");
    }

    if (event.path[0].italic.checked) {
      this.setItalic("italic");
    } else {
      this.setItalic("");
    }

    if (event.path[0].underline.checked) {
      this.setUnderline("underline");
    } else {
      this.setUnderline("");
    }
    console.log(event.path[0].italic.checked);
    console.log(this.italic);
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <form id="chartInputForm" @submit=${this.handleSubmit}>
        <div class="formInputItem">
          <label for="fontSize">Font Size:</label>
          <select id="fontSize" name="fontSize">
            <option value="10px">Small</option>
            <option value="20px">Medium</option>
            <option value="30px">Large</option>
            <option value="40px">Extra-Large</option>
          </select>
        </div>
        <div class="formInputItem">
          <label for="fontColor">Font Color</label>
          <input
            value=${this.textColor}
            id="fontColor"
            name="fontColor"
            type="color"
          />
        </div>
        <div class="formInputItem">
          <label for="bold">Bold</label>
          <input id="bold" name="bold" type="checkbox" />
        </div>
        <div class="formInputItem">
          <label for="italic">Italic</label>
          <input id="italic" name="italic" type="checkbox" />
        </div>
        <div class="formInputItem">
          <label for="underline">Underline</label>
          <input id="underline" name="underline" type="checkbox" />
        </div>
        <div class="formInputItem">
          <label for="backColor">Background Color</label>
          <input
            value=${this.backgroundColor}
            id="backColor"
            name="backColor"
            type="color"
          />
        </div>
        <div class="formInputItem">
          <button type="submit">Update Text Box</button>
        </div>
      </form>
    `;
  }
}

window.customElements.define("text-chart", TextBox);
window.customElements.define("text-form", TextForm);
