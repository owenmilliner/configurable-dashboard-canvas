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
    
      .nav-link {
    text-decoration: none;
    border: solid 5px #4bd8d4;;
        background-color: #4bd8d4;
        color:#06152c;
    font-family: whitney,sans-serif;
    font-weight:lighter;
    padding-left:65px;
    padding-right:65px;
    padding-top:20px;
    padding-bottom:20px;
    font-size: 60px;
    
    /* border-radius: 30px; */
    display: inline-block;
    text-align: center;
    
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
