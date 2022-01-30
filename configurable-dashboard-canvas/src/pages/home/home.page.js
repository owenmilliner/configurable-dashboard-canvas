import { LitElement, css, html } from "lit-element";

class Home extends LitElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html` <div>
      <h1>This is Home Page</h1>
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

customElements.define("home-page", Home);