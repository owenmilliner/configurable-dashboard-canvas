import { LitElement, css, html } from "lit-element";
import { router } from "lit-element-router";

//Components
import "./components/navigation/nav-link.component";
import "./router-outlet";

//pages
import "./pages/cdc/cdc.page";

class App extends router(LitElement) {
static get styles() {
    return css`.link{
      
    }
    
    .nav-container {
    display: flex;
    justify-content: space-evenly;

}.Landing {
      text-align: center;
      margin-left:1vw; 
      margin-right:1vw; 
      color:white;
      background-color: #06152c;
      font-family: "Josefin Sans", sans-serif;
      }
      ul {list-style-type:none}
    `;
  }

  static get styles() {
    return [css`.Landing {
      text-align: center;
      margin-left:1vw; 
      margin-right:1vw; 
      color:white;
      background-color: #06152c;
      font-family: "Josefin Sans", sans-serif;
      }
      ul {list-style-type:none}`];
  }
  
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
      data: { type: Object },
      landing:{type:Boolean}
    };
  }

  static get routes() {
    return [
      {
        name: "cdc",
        pattern: "cdc"
      },
      {
        name: "not-found",
        pattern: "*"
      }
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
this.landing = !this.landing
  }

  render() {
    return this.landing ? 
    html`<div class="Landing">
      <h1>Welcome to the.... CDC</h1>
      <h2>(Configurable Dashboard Canvas)</h2>
      <h3>Created by - Crisple Clear</h3>
      <h4>Contributors:</h4>
        <ul>
          <li>Owen Milliner</li>
          <li>Tharaka Mantridge</li>
          <li>Mark Golley</li>
        </ul>
    </div>
    <div class="nav-container">
    <nav-link class="link" href="/cdc" onclick=${this.removeLanding()}>LAUNCH TOOL</nav-link>
    </div>
      <router-outlet active-route=${this.route}>
        <cdc-page route="cdc"></cdc-page>
        <!-- <h1 route="not-found">Not Found</h1> -->
      </router-outlet>
    ` : 
    html`<div class="Landing">
    </div>
    <div class="nav-container">
    <nav-link class="link" href="/cdc" style="display: none;" >CDC</nav-link>
    </div>
      <router-outlet active-route=${this.route}>
        <cdc-page route="cdc"></cdc-page>
        <h1 route="not-found">Not Found</h1>
      </router-outlet>
    `
  }
}

customElements.define("app-container", App);
