import { html, css, LitElement } from "lit";

export class Header extends LitElement {
  static get styles() {
    return css`
      #header {
        height: 100%;
        color: white;
        background-color: #06152c;
        display: grid;
        grid-template-areas: "app toggle bin file logo";
        grid-template-columns: 15vw 10vw 15vw auto 20vw;
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

      #header__toggle {
        grid-area: toggle;
        display: inline-block;
        margin: auto;
        width: 15vw;
        height: 3vh;
        margin: auto;
        font-weight: 300;
        font-size: 3vh;
      }

      #toggle__label {
        font-size: 3vh;
        width: 10vw;
        justify-content: center;
      }

      #toggle__checkbox {
        margin: auto;
        width: 2vh;
        height: 2vh;
        color: white;
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
        <img
          id="header__bin"
          src="../src/images/recyclebin.png"
          alt="Recycle bin"
          ondragover="allowDrop(event)"
          ondrop="remove(event)"
        />
        <div id="header__toggle">
          <label id="toggle__label" for="switch">Page Grid</label>
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
