import { LitElement, css, html } from "lit-element";

class CDC extends LitElement {
  static get styles() {
    return [
      css`
        #dashboard {
          height: 100%;
          display: grid;
          grid-template-areas:
            "header header"
            "navigation display";
          grid-template-columns: 15vw 85vw;
          grid-template-rows: 10vh 90vh;
        }

        #header {
          grid-area: header;
          height: 10vh;
        }

        #navigation {
          grid-area: navigation;
          overflow-y: scroll;
          background-color: #06152c;
          width: inherit;
          height: inherit;
        }

        #display {
          grid-area: display;
          width: inherit;
          height: inherit;
          margin: 0;
          padding: 0;
          background-color: #5f5f5f;
          overflow: scroll;
        }
      `,
    ];
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

  render() {
    return html` <div id="dashboard">
      <header-component id="header"></header-component>
      <navigation-component id="navigation"></navigation-component>
      <div id="display">
        <canvas-component id="canvas"></canvas-component>
      </div>
    </div>`;
  }
}
customElements.define("cdc-page", CDC);
