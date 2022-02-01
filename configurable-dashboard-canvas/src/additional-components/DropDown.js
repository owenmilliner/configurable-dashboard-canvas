import { html, LitElement, css } from "lit";

export class DropDown extends LitElement {
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
    `;
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
          <p onclick="menuSelection()">New Canvas</p>
          <p onclick="menuSelection()">New Project</p>
          <p onclick="pdf()">Export as PDF</p>
          <p onclick="menuSelection()">Share</p>
          <p onclick="menuSelection()">Settings</p>
          <p onclick="menuSelection()">Help</p>
        </div>
      </div>
    `;
  }
}

window.customElements.define("drop-down", DropDown);
