import { LitElement, css, html } from "lit-element";

class Contact extends LitElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html` <div>
      <h1>This is Contact Page</h1>
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

customElements.define("contact-page", Contact);