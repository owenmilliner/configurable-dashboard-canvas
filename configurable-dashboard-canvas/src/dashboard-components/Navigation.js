import { html, css, LitElement } from "lit";
import { imgData } from "./navigation-data";

export class Navigation extends LitElement {
  static get styles() {
    return css`
      :host {
        color: white;
      }
      #navigation {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        gap: 1vh;
      }

      img {
        width: 40vh;
        height: 20vh;
      }
    `;
  }

  render() {
    return html` <div id="navigation" ondrop="drop(event)">
      ${imgData.map((item) => {
        return html`<img
          id="${item.id}"
          src="${item.img}"
          draggable="true"
          ondragstart="drag(event, true)"
        />`;
      })}
    </div>`;
  }
}

window.customElements.define("navigation-component", Navigation);
