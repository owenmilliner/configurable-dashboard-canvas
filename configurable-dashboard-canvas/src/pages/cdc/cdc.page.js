import { LitElement, css, html } from "lit-element";

class CDC extends LitElement {
  static get styles() {
    return [css``];
  }
  render() {
    return html` 
<div id="dashboard">
      <header-component id="header"></header-component>
      <navigation-component id="navigation"></navigation-component>
      <div id="display">
        <canvas-component id="canvas"></canvas-component>
      </div>
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
customElements.define("cdc-page", CDC);