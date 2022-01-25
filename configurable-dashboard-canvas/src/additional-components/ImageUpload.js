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

  loadFile = (event) => {
    const formRoot = canvasRoot.querySelector("img-upload").shadowRoot;
    var image = formRoot.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    console.log(formRoot);
    const imgInput = formRoot.getElementById("imgFile");
    imgInput.remove();
  };

  render() {
    return html`
      <div id="upload">
        <input
          type="file"
          accept="image/*"
          name="image"
          id="imgFile"
          @change=${this.loadFile}
        />

        <p><img id="output" width="200" /></p>
      </div>
    `;
  }
}

window.customElements.define("img-upload", ImageUpload);
