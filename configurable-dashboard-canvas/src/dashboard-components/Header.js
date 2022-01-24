import { html, css, LitElement } from "lit";

export class Header extends LitElement {
  static get styles() {
    return css`
      #header {
        height: 100%;
        color: white;
        background-color: #06152c;
        display: grid;
        grid-template-areas: "app file logo";
        grid-template-columns: 12vw auto 12vw;
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
    this._client = "CRISP";
    this._file = "Twitter_2022";
  }

  render() {
    return html`
      <div id="header">
        <p id="header__app">CDC</p>
        <h1 id="header__file">${this._client} / ${this._file}</h1>
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
