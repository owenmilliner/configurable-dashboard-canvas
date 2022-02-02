import { html, css, LitElement } from "lit";
import { DropDown } from "../additional-components/DropDown";

export class Header extends LitElement {
  static get styles() {
    return css`
      @import url("http://fonts.cdnfonts.com/css/whitney-2");
      #header {
        height: 100%;
        color: white;
        background-color: #06152c;
        display: grid;
        grid-template-areas: "app file logo";
        grid-template-columns: 15vw auto 15vw;
        grid-template-rows: auto;
        font-family: "Whitney", sans-serif;
        font-weight: bold;
      }

      #header__app {
        grid-area: app;
        margin: auto;
        margin-left: 1vw;
        font-size: 3vh;
        font-weight: 300;
      }

      #app__title {
        margin: auto;
        float: left;
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

      #header__logo {
        grid-area: logo;
        margin: auto;
        margin-right: 1vw;
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
        <div id="header__app">
          <drop-down id="app__title"></drop-down>
        </div>
        <h1 id="header__file">
          <span id="file__client">${this._client} / </span>${this._file}
        </h1>
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
