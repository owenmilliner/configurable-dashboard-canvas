import { LitElement, css, html } from "lit-element";
import { router } from "lit-element-router";

//Components
import "./components/navigation/nav-link.component";
import "./router-outlet";

//pages
import "./pages/cdc/cdc.page";

class App extends router(LitElement) {
  static get styles() {
    return [
      css`@import url('http://fonts.cdnfonts.com/css/whitney-2');
    .landing {
      display:grid;
      grid-template-areas: "header" "body";
      grid-template-columns:auto;
      grid-template-rows: 7vh 93vh;
      font-family: 'Whitney', sans-serif;
    }

    .landing__header {
      grid-area: header;
      background-color: #06162c;
    }

    img {
      display: block;
      margin: auto;
      margin-right: 1vw;
      margin-top: 1.5vh;
      width: 5vw;
    }

    .landing__body {
      grid-area: body;
      text-align: center;
      color:white;
      display:grid;
      grid-template-areas: "title" "intro" "nav" "footer";
      grid-template-columns: auto;
      grid-template-rows: 30vh 13vh 20vh 30vh;
      background-image: url('./approach-desk.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .body__title{
      grid-area: title;
      font-size:5vw;
      font-weight:300;
      padding:0;
      margin:auto;
      margin-bottom: 1vw;
    }

    .body__intro{
      grid-area: intro;
      font-weight: 300;
      margin:auto;
      font-size:2vw;
    }

    .nav-container {
      grid-area: nav;
      margin:auto;
    }


    .body__footer{
      grid-area: footer;
      padding:0;
      margin:auto;
      margin-bottom: 0vw;
      font-size:1.5vw;
      }

    ul {
      list-style-type:none;
      margin: 0;
      padding: 0;
      text-align: center;
      margin-bottom:10%
      }
    li {
      display: inline-block;
      margin: 0 2vw;
      
      padding: 1vw;
      }
      }`,
    ];
  }

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
      data: { type: Object },
      landing: { type: Boolean },
    };
  }

  static get routes() {
    return [
      {
        name: "cdc",
        pattern: "cdc",
      },
      {
        name: "not-found",
        pattern: "*",
      },
    ];
  }

  constructor() {
    super();
    this.route = "";
    this.params = {};
    this.query = {};
    this.data = {};
    this.landing = true;
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    this.data = data;
  }
  removeLanding() {
    this.landing = !this.landing;
  }

  render() {
    return this.landing
      ? html`<div class="landing">
          <div class="landing__header">
            <img
              id="header__logo"
              src="../src/images/crisp_logo.png"
              alt="Crisp logo"
            />
          </div>
          <div class="landing__body">
            <h1 class="body__title">CONFIGURABLE DASHBOARD CANVAS</h1>
            <h2 class="body__intro">
              Prepare reports using off the shelf charting web components to
              create an exportable report
            </h2>
            <div class="nav-container">
              <nav-link class="link" href="/cdc" onclick=${this.removeLanding()}
                >Launch Tool</nav-link
              >
            </div>
            <div class="body__footer">
              <h3>Created by - Crisple Clear</h3>
              <h4>Contributors:</h4>
              <ul>
                <li>Owen Milliner</li>
                <li>Tharaka Mantrige</li>
                <li>Mark Golley</li>
              </ul>
            </div>
          </div>
          <router-outlet active-route=${this.route}>
            <cdc-page route="cdc"></cdc-page>
            <!-- <h1 route="not-found">Not Found</h1> -->
          </router-outlet>
        </div> `
      : html`<div class="Landing"></div>
          <div class="nav-container">
            <nav-link class="link" href="/cdc" style="display: none;"
              >CDC</nav-link
            >
          </div>
          <router-outlet active-route=${this.route}>
            <cdc-page route="cdc"></cdc-page>
            <h1 route="not-found">Not Found</h1>
          </router-outlet> `;
  }
}

customElements.define("app-container", App);
