import { LitElement, html, css } from "lit-element";
import { navigator } from "lit-element-router";


export class NavLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String }
    };
  }
  static get styles() {
    return css`
      a {
        margin: 5px;
      }
      .nav-link {
    text-decoration: none;
    border: solid 2px black;
    color: black;
    padding: 5px;
    margin-right: 5px;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
  }
  slot {
    font-weight: bold;
  }
  .nav-link:hover {
    color: #ffffff;
    background-color: #000000;
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
