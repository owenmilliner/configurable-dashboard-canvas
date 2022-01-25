import { html, LitElement, css } from "lit";

export class ImageUpload extends LitElement {
  static get styles() {
    return css`
      #upload {
        background-color: white;
        height: fit-content;
        width: fit-content;
        resize: both;
        overflow: auto;
      }
    `;
  }

  render() {
    return html`
      <div id="upload">
        <input
          type="file"
          accept="image/*"
          name="image"
          id="imgFile"
          onchange="loadFile(event)"
        />

        <p><img id="output" width="200" /></p>
      </div>
    `;
  }
}

window.customElements.define("img-upload", ImageUpload);
