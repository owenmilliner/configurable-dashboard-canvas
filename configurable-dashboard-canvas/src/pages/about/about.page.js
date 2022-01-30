import { LitElement, css, html } from "lit-element";

class About extends LitElement {
  static get styles() {
    return [css``];
  }
  render() {
    return html` <div>
      <h1>This is About Page</h1>
    </div>`;
  }
  static get properties() {
    return {
      eg: {
        type: String,
      },
    };
  }
  constructor() {
    super();
  }
}
customElements.define("about-page", About);