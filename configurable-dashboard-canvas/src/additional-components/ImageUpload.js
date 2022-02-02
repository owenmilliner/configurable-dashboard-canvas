import { html, LitElement, css } from "lit";
import { ProviderMixin, ConsumerMixin } from "lit-element-context";

export class ImageUpload extends ProviderMixin(LitElement) {
  static get properties() {
    return {
      imageData: File,
      setImageData: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  constructor() {
    super();

    this.imageData = "";
    this.setImageData = (value) => {
      this.imageData = value;
    };

    this.popUp = true;
    this.setPopUp = (value) => {
      this.popUp = value;
    };
  }

  static get provide() {
    return ["imageData", "setImageData", "popUp", "setPopUp"];
  }

  formPopUp() {
    this.popUp = !this.popUp;
  }

  static get styles() {
    return css`
      #image {
        height: 100%;
        width: 100%;
      }

      #image-wrapper {
        height: 60mm;
        width: 50mm;
        resize: both;
        overflow: hidden;
        padding: 0;
        margin: 0;
      }
    `;
  }

  render() {
    return this.popUp
      ? html`<image-form></image-form>`
      : html`
          <div class="chart" id="image-wrapper">
            <img
              src="${this.imageData}"
              id="image"
              @dblclick="${this.formPopUp}"
              alt="upload image"
            />
          </div>
        `;
  }
}

class ImageForm extends ConsumerMixin(LitElement) {
  static get properties() {
    return {
      imageData: File,
      setImageData: Function,
      popUp: Boolean,
      setPopUp: Function,
    };
  }

  static get styles() {
    return css`
      input[type="file"]::file-selector-button {
        width: 40%;
        background-color: rgb(75, 216, 212);
        border: 0.25vw solid rgb(75, 216, 212);
        padding: 0.25vh;
        color: white;
      }

      input[type="file"]::file-selector-button:hover {
        background-color: #06152c;
        border: 0.25vw solid rgb(75, 216, 212);
        color: white;
        cursor: pointer;
      }
    `;
  }

  static get inject() {
    return ["imageData", "setImageData", "popUp", "setPopUp"];
  }

  handleUpload(event) {
    event.preventDefault();

    const imageFile = URL.createObjectURL(event.target.files[0]);
    // Setting Data
    this.setImageData(imageFile);
    // Close form.
    this.setPopUp(!this.popUp);
  }

  render() {
    return html`
      <link rel="stylesheet" href="./chart.css" />
      <input
        type="file"
        accept="image/*"
        name="image"
        class="chartInputForm"
        @change=${this.handleUpload}
      />
    `;
  }
}

window.customElements.define("image-upload", ImageUpload);
window.customElements.define("image-form", ImageForm);
