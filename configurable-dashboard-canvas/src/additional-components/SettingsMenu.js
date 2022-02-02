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
        font-size: 1.5vw;
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

      .content__toggle {
        grid-area: toggleGrid;
        display: inline-block;
        margin: auto;
        font-weight: 300;
        font-size: 1.5vh;
      }

      #toggle__checkbox {
        margin: auto;
        width: 2vh;
      }

      #toggle__dropdown {
        font-size: 1vw;
      }

      input {
        height: 2vh;
        width: 2vh;
      }
    `;
  }

  static get properties() {
    return {
      settingsOpen: Boolean,
      setSettingsOpen: Function,
      setCanvasHeight: Function,
      setCanvasWidth: Function,
    };
  }

  static get inject() {
    return [
      "settingsOpen",
      "setSettingsOpen",
      "setCanvasHeight",
      "setCanvasWidth",
    ];
  }

  handleSettingsMenuClose() {
    this.setSettingsOpen(false);
  }

  toggleOrientation(event) {
    console.log(this.setCanvasHeight);
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
          <h2 class="content__heading">Canvas Manipulation.</h2>

          <label id="toggle__gridLabel" for="grid__toggle">Grid Toggle.</label>
          <input
            type="checkbox"
            id="toggle__checkbox"
            name="grid__toggle"
            min="0"
            max="1"
            value="1"
            checked
            onchange="toggleGrid()"
          />
          <p class="content__body">
            Remove the grid lines from the canvas. This toggle function removes
            any visible lines from the grid. Note: the grid's are still
            accessible and used for component placement, this option is visual
            only.
          </p>

          <label id="toggle__borderLabel" for="border__toggle"
            >Border Toggle.</label
          >
          <input
            type="checkbox"
            id="toggle__checkbox"
            name="border__toggle"
            min="0"
            max="1"
            value="1"
            checked
            onchange="toggleBorders()"
          />
          <p class="content__body">
            Remove the borders from the components. This toggle function removes
            all borders from components, providing a visual representation of
            the canvas outside of development. Note: when this is toggled off,
            movement of the components is disabled.
          </p>
        </div>
      </div>
    `;
  }
}

window.customElements.define("settings-menu", SettingsMenu);
