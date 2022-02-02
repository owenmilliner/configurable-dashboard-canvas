import { html, LitElement, css } from "lit";
import { ProviderMixin } from "lit-element-context";
import { HelpMenu } from "./HelpMenu";
import { SettingsMenu } from "./SettingsMenu";

export class DropDown extends ProviderMixin(LitElement) {
  constructor() {
    super();

    this.SettingsOpen = false;
    this.setHelpOpen = (value) => {
      this.helpOpen = value;
    };

    this.settingsOpen = false;
    this.setSettingsOpen = (value) => {
      this.settingsOpen = value;
    };
  }

  static get properties() {
    return {
      helpOpen: Boolean,
      setHelpOpen: Function,
      settingsOpen: Boolean,
      setSettingsOpen: Function,
    };
  }

  static get provide() {
    return ["helpOpen", "setHelpOpen", "settingsOpen", "setSettingsOpen"];
  }

  static get styles() {
    return css`
      .dropdown {
        float: left;
        overflow: visible;
      }

      .dropdown__button {
        font-size: 2vw;
        border: none;
        outline: none;
        color: white;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
        padding: 0;
      }

      .dropdown__content {
        display: none;
        position: absolute;
        width: fit-content;
        left: 0%;
        z-index: 1;
        background-color: #06152c;
        height: fit-content;
        padding: 0;
        margin: 0;
      }

      p {
        border: solid 0.25vw #06152c;
        font-size: 1vw;
        width: 20vw;
        padding: 0.5vw;
        padding-left: 1.25vw;
        margin: 0;
      }

      .dropdown__content p {
        float: none;
        color: white;
        text-decoration: none;
        display: block;
        text-align: left;
        border: none;
      }

      p:hover {
        border: 0.25vw solid rgb(75, 216, 212);
        cursor: pointer;
      }

      .dropdown:hover .dropdown__content {
        display: block;
      }

      .content__item--status-inactive {
        text-decoration: line-through;
        color: #9c9c9c;
      }
    `;
  }

  handleHelpOpening() {
    this.setHelpOpen(true);
  }

  handleSettingsOpening() {
    this.setSettingsOpen(true);
    console.log(this.settingsOpen);
  }

  render() {
    return html`
      <div class="dropdown">
        <button class="dropdown__button">
          CDC ⌄
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown__content">
          <p onclick="clearCanvas()">Clear Canvas</p>
          <p onclick="menuSelection()">
            <span class="content__item--status-inactive">New Canvas</span>
          </p>
          <p onclick="menuSelection()">
            <span class="content__item--status-inactive">New Project</span>
          </p>
          <p onclick="pdf()">Export as PDF</p>
          <p onclick="menuSelection()">
            <span class="content__item--status-inactive">Share</span>
          </p>
          <p @click="${this.handleSettingsOpening}">Settings</p>
          <p @click="${this.handleHelpOpening}">Help</p>
        </div>
      </div>
      ${this.helpOpen
        ? html`<help-menu></help-menu>`
        : this.settingsOpen
        ? html`<settings-menu></settings-menu>`
        : null}
    `;
  }
}

window.customElements.define("drop-down", DropDown);
