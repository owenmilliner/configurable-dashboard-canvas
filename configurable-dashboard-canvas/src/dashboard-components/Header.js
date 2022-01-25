import { html, css, LitElement } from "lit";

export class Header extends LitElement {
  static get styles() {
    return css`
      #header {
        height: 100%;
        color: white;
        background-color: #06152c;
        display: grid;
        grid-template-areas: "app bin file logo";
        grid-template-columns: 20vw 10vw auto 20vw;
        grid-template-rows: 100%;
      }

      #header__app {
        grid-area: app;
        margin: auto;
        font-size: 3vh;
        font-weight: 300;
      }

      #header__file {
        grid-area: file;
        margin: auto;
        font-weight: 300;
        font-size: 4vh;
      }

      #file__client {
        color: #cccccc;
        opacity: 0.3;
        font-size: 3vh;
      }

      #header__bin {
        grid-area: bin;
        margin: auto;
        height: 10vh;
      }

      #header__logo {
        grid-area: logo;
        margin: auto;
        width: 5vw;
      }
    `;
  }

  static get properties() {
    return {
      client: {
        type: String,
      },
      file: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this._client = "Crisp";
    this._file = "Twitter_2022";
  }

  render() {
    return html`
      <div id="header">
        <p id="header__app">CDC</p>
        <h1 id="header__file">
          <span id="file__client">${this._client} / </span>${this._file}
        </h1>
        <img
          id="header__bin"
          src="../src/images/recyclebin.png"
          alt="Recycle bin"
          ondragover="allowDrop(event)"
          ondrop="remove(event)"
        />
        <img
          id="header__logo"
          src="../src/images/crisp_logo.png"
          alt="Crisp logo"
        />
      </div>
    `;
  }
}

window.customElements.define("header-component", Header);
