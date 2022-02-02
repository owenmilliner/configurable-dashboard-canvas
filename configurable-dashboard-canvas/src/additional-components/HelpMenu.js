import { html, LitElement, css } from "lit";
import { ConsumerMixin } from "lit-element-context";

export class HelpMenu extends ConsumerMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        position: absolute;
        top: 12%;
        left: 38%;
        z-index: 999;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }

      #helpMenu {
        display: grid;
        grid-template-areas: "header" "content";
        grid-template-rows: 5vh 50vh;
        grid-template-columns: 40vw;
      }

      #helpMenu__header {
        grid-area: header;
        display: grid;
        grid-template-areas: "title close";
        grid-template-rows: 5vh;
        grid-template-columns: 35vw 5vw;
        background-color: #06152c;
        color: white;
      }

      #header__title {
        grid-area: title;
        background-color: transparent;
        font-size: 1.5vw;
        margin: auto;
        margin-left: 1vw;
      }

      #header__close {
        grid-area: close;
        color: white;
        border: none;
        background-color: transparent;
        font-size: 1.5vw;
        width: 100%;
      }

      #helpMenu__content {
        grid-area: content;
        color: black;
        padding: 1vh 1vw;
        overflow-y: scroll;
        overflow-x: wrap;
      }

      .content__list {
        padding: 0;
        margin: 0;
        padding-bottom: 1vh;
      }

      .content__heading {
        font-size: 1.5vw;
      }

      .content__subheading {
        font-size: 1.25vw;
        list-style-type: none;
      }

      .content__body {
        font-size: 1vw;
      }
    `;
  }

  static get properties() {
    return {
      helpOpen: Boolean,
      setHelpOpen: Function,
    };
  }

  static get inject() {
    return ["helpOpen", "setHelpOpen"];
  }

  handleHelpMenuClose() {
    this.setHelpOpen(false);
  }

  render() {
    return html`
      <div id="helpMenu">
        <div id="helpMenu__header">
          <p id="header__title">Help and Information</p>
          <button id="header__close" @click="${this.handleHelpMenuClose}">
            X
          </button>
        </div>
        <div id="helpMenu__content">
          <ul class="content__list">
            <h2 class="content__heading">Interacting with Components.</h2>
            <li class="content__subheading">Placing.</li>
            <p class="content__body">
              To place a component onto the canvas, simply drag and drop from
              the component selection menu, located on the left of the screen.
              Once placed, you will be presented with a form which allows you to
              select the data you wish to be displayed.
            </p>

            <li class="content__subheading">Moving.</li>
            <p class="content__body">
              Moving of a component can be done by dragging anywhere from it's
              highlighted border, and dropping into a different slot on the
              grid. This is most effectively completed using to 'top-left'
              corner of the component, as this is what determines which grid it
              is contained within.
            </p>

            <li class="content__subheading">Editing.</li>
            <p class="content__body">
              For editing/changing data, double click the component and the
              input form will reappear, allowing the changing of the data which
              has been set within. The current data of the component will be
              populated within the form by default.
            </p>

            <li class="content__subheading">Deleting.</li>
            <p class="content__body">
              Deletion of a component can be completed in two different ways.
              The first is to drag and dorp the component into the recycle bin,
              located in the bottom right corner of the screen. Secondly,
              clicking on a component to 'select' it, and then pressing the keys
              'Alt + Backspace' will remove it from the canvas. Note: deletion
              of all components can be done using the 'Clear Canvas' option, see
              'Canvas Functionality - Canvas Clearing.'
            </p>
          </ul>

          <ul class="content__list">
            <h2 class="content__heading">Canvas Functionality.</h2>
            <li class="content__subheading">Canvas Clearing.</li>
            <p class="content__body">
              Clearing of the entire canvas, resetting the page to default can
              be completed by using the 'Clear Canvas' option within the CDC
              Dropdown - located in the top-left corner of the application.
            </p>

            <li class="content__subheading">Grid Toggling.</li>
            <p class="content__body">
              Toggle the grid on/off by selecting, or deselecting the grid
              toggle found within the applications 'Settings Menu'. By doing
              this, the grid-lines which can be seen on the canvas will
              disappear. Note: the grid will still be active and accessible for
              interaction - the toggling is visual only.
            </p>

            <li class="content__subheading">Border Toggling.</li>
            <p class="content__body">
              Toggle the border on/off by selecting, or deselecting the border
              toggle found within the applications 'Settings Menu'. This will
              remove all borders highlighted around the components on the
              canvas. Note: this will disable the ability to move components.
            </p>

            <li class="content__subheading">Export as PDF.</li>
            <p class="content__body">
              Exporting the canvas to a downloadable PDF file can be completed
              by selecting the 'Export PDF' option within the CDC Dropdown
              located at the top-left of the application. After a few seconds, a
              PDF should be automatically downloaded, with all grid
              lines/borders automatically removed.
            </p>
          </ul>
        </div>
      </div>
    `;
  }
}

window.customElements.define("help-menu", HelpMenu);
