import { html, LitElement } from "lit";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";

const dataSources = {
  NUMBER_OF_TWEETS: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
  SEVERITY1: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
  SEVERITY2: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
  SEVERITY3: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
};

class TodoView extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      values: { type: Array },
      popUp: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.title = "";
    this.values = dataSources.NUMBER_OF_TWEETS;
    this.popUp = false;
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Title"
          value="${this.title}"
          @change="${this.updateTitle}"
        ></vaadin-text-field>
        <p>test: ${this.title}</p>
      </div>
    `;
  }

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.updateTitle();
    }
  }

  updateTitle(e) {
    this.title = e.target.value;
    this.popUp = false;
    requestUpdate();
  }
  //   updateChart() {}

  createRenderRoot() {
    return this;
  }
}

customElements.define("todo-view", TodoView);

{
  /* <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }
        todo-view .input-layout {
          width: 100%;
          display: flex;
        }
        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }
        todo-view .todos-list {
          margin-top: var(--spacing);
        }
        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style> */
}

// <vaadin-radio-group
//   class="source-options"
//   value="${JSON.stringify(this.values)}"
//   @value-changed="${this.updateValues}"
// >
//   ${Object.keys(dataSources).map(
//     (filter) =>
//       html`<vaadin-radio-button value="${filter}"
//         >${filter}</vaadin-radio-button
//       >`
//   )}
// </vaadin-radio-group>

// <vaadin-button theme="primary" @click="${this.updateChart}"
//   >Update Chart</vaadin-button
// >
