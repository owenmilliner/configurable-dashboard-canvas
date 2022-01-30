import { html, LitElement, css } from "lit";

export class DropDown extends LitElement {
  static get styles() {
    return css`
      .dropdown {
        float: left;
        overflow: visible;
      }

      #dropdown__arrow {
        font-size: 1.5vw;
      }

      .dropdown .dropdown__button {
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
        font-size: 1vw;
        width: 20vw;
        padding: 0.5vw;
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
        background-color: #0388fc;
        cursor: pointer;
      }

      .dropdown:hover .dropdown__content {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <div class="dropdown">
        <button class="dropdown__button">
          CDC <span id="dropdown__arrow">▼</span>
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown__content">
          <p onclick="menuSelection()">New Canvas</p>
          <p onclick="menuSelection()">New Project</p>
          <p onclick="savePDF()">Save</p>
          <p onclick="pdf()">Download PDF</p>
          <p onclick="menuSelection()">Share</p>
          <p onclick="menuSelection()">Export</p>
          <p onclick="menuSelection()">Settings</p>
          <p onclick="menuSelection()">Help</p>
        </div>
      </div>
    `;
  }
}

window.customElements.define("drop-down", DropDown);
