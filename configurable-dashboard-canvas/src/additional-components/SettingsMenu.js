import { html, LitElement, css } from "lit";
import { ConsumerMixin } from "lit-element-context";

export class SettingsMenu extends ConsumerMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        position: absolute;
        top: 12%;
        left: 38%;
        z-index: 999;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }

      #settingsMenu {
        display: grid;
        grid-template-areas: "header" "content";
        grid-template-rows: 5vh 50vh;
        grid-template-columns: 40vw;
      }

      #settingsMenu__header {
        grid-area: header;
        display: grid;
        grid-template-areas: "title close";
        grid-template-rows: 5vh;
        grid-template-columns: 35vw 5vw;
        background-color: #06152c;
        color: white;
      }

      #header__title {
        grid-area: title;
        background-color: transparent;
        font-size: 1.5vw;
        margin: auto;
        margin-left: 1vw;
      }

      #header__close {
        grid-area: close;
        color: white;
        border: none;
        background-color: transparent;
        width: 100%;
      }

      #settingsMenu__content {
        grid-area: content;
        color: black;
        padding: 1vh 1vw;
        overflow-y: scroll;
        overflow-x: wrap;
      }

      .content__list {
        padding: 0;
        margin: 0;
        padding-bottom: 1vh;
      }

      .content__heading {
        font-size: 1.5vw;
      }

      .content__subheading {
        font-size: 1.25vw;
        list-style-type: none;
      }

      .content__body {
        font-size: 1vw;
      }
    `;
  }

  static get properties() {
    return {
      settingsOpen: Boolean,
      setSettingsOpen: Function,
    };
  }

  static get inject() {
    return ["settingsOpen", "setSettingsOpen"];
  }

  handleSettingsMenuClose() {
    this.setSettingsOpen(false);
  }

  render() {
    return html`
      <div id="settingsMenu">
        <div id="settingsMenu__header">
          <p id="header__title">Settings</p>
          <button id="header__close" @click="${this.handleSettingsMenuClose}">
            X
          </button>
        </div>
        <div id="settingsMenu__content">
          <ul class="content__list">
            <h2 class="content__heading">Canvas Manipulation.</h2>
            <li class="content__subheading">Grid Toggle.</li>
            <p class="content__body">PUT GRID TOGGLE HERE.</p>
            <li class="content__subheading">Border Toggle.</li>
            <p class="content__body">PUT BORDER TOGGLE HERE.</p>
          </ul>
        </div>
      </div>
    `;
  }
}

window.customElements.define("settings-menu", SettingsMenu);
