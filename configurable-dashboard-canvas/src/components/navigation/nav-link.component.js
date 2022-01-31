import { LitElement, html, css } from "lit-element";
import { navigator } from "lit-element-router";

export class NavLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String },
    };
  }
  static get styles() {
    return css`
      @import url("http://fonts.cdnfonts.com/css/whitney-2");
      .nav-link {
        text-decoration: none;
        border: solid 0.5vw #4bd8d4;
        background-color: #4bd8d4;
        color: #06152c;
        font-family: "Whitney", sans-serif;
        font-weight: lighter;
        font-size: 3vw;
        padding: 2vh 4vh;
      }
      slot {
        font-weight: bold;
      }
      .nav-link:hover {
        color: white;
        background-color: #06152c;
      }
    `;
  }
  constructor() {
    super();
    this.href = "";
  }
  render() {
    return html`
      <a class="nav-link" href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

customElements.define("nav-link", NavLink);
