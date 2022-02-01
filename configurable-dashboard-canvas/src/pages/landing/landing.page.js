import { LitElement, css, html } from "lit-element";

class Landing extends LitElement {
  static get styles() {
    return [
      css`
        .Landing {
          text-align: center;
          margin-left: 1vw;
          margin-right: 1vw;
          color: white;
          background-color: #06152c;
          font-family: "Josefin Sans", sans-serif;
        }
        ul {
          list-style-type: none;
        }
      `,
    ];
  }

  render() {
    return html` <div class="Landing">
      <h1>Welcome to the Configurable Dashboard Canvas - CDC</h1>
      <h2>To launch the tool, click here</h2>
      <h3>Created by - Crisple Clear</h3>
      <h4>Contributors:<h4>
        <ul>
          <li>Owen Milliner</li>
          <li>Tharaka Mantridge</li>
          <li>Mark Golley</li>
        </ul>
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

  connectedCallback() {
    window.onbeforeunload = () => {
      window.location.replace("https://localhost:8000");
    };
  }
}

customElements.define("landing-page", Landing);
