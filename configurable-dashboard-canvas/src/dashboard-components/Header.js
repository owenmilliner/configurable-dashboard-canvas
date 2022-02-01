import { html, css, LitElement } from "lit";
import { DropDown } from "../additional-components/DropDown";

export class Header extends LitElement {
  static get styles() {
    return css`
      #header {
        height: 100%;
        color: white;
        background-color: #06152c;
        display: grid;
        grid-template-areas: "app toggleGrid toggleBorder bin file file logo";
        grid-template-columns: 15vw 12vw 10vw auto 20vw;
        grid-template-rows: 100%;
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

      #header__gridToggle {
        grid-area: toggleGrid;
        display: inline-block;
        margin: auto;
        font-weight: 300;
        font-size: 1.5vw;
      }
      #header__borderToggle {
        grid-area: toggleBorder;
        display: inline-block;
        margin: auto;
        font-weight: 300;
        font-size: 1.5vw;
      }
      #toggle__label {
      }

      #toggle__checkbox {
        margin: auto;
        width: 2vh;
        height: 2vh;
      }

      #header #header:first-child {
        padding-left: 0;
      }

      #header #header:last-child {
        padding-right: 0;
      }

      #header__bin {
        grid-area: bin;
        margin: auto;
        height: 10vh;
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
        <img
          id="header__bin"
          src="../src/images/bin.png"
          alt="Recycle bin"
          ondragover="allowDrop(event)"
          ondrop="remove(event)"
        />
        <div id="header__gridToggle">
          <label id="toggle__gridLabel" for="switch">Grid</label>
          <input
            type="checkbox"
            id="toggle__checkbox"
            name="switch"
            min="0"
            max="1"
            value="1"
            checked
            onchange="toggleGrid()"
          />
        </div>
        <div id="header__borderToggle">
          <label id="toggle__borderLabel" for="switch">Borders</label>
          <input
            type="checkbox"
            id="toggle__checkbox"
            name="switch"
            min="0"
            max="1"
            value="1"
            checked
            onchange="toggleBorders()"
          />
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

  // createRenderRoot(){
  //   return this
  // }
}

window.customElements.define("header-component", Header);
