import { LitElement, css, html } from "lit-element";
import { router } from "lit-element-router";

//Components
import "./components/navigation/nav-link.component";
import "./router-outlet";

//pages
import "./pages/cdc/cdc.page";

class App extends router(LitElement) {

  static get styles() {
    return [css`.nav-container {
    /* display: flex;
    justify-content: space-evenly; */
    }
    .wrapper{
background-color: #06162c;
    position: fixed;
    top: 0;
    width:100%;

    }
    .Landing {
      text-align: center;
      margin-left:1vw; 
      margin-right:1vw; 
      color:white;
      font-family: whitney,sans-serif;
      }
      ul {
      list-style-type:none;
      margin: 0;
      padding: 0;
      text-align: center;
      margin-bottom:10%
    }
      h1{
        padding-top:100px;
      padding-bottom:10px;
        font-size: 80px;
    
  font-weight:400;}
      li {
      display: inline-block;
      margin: 0 10px;
      border: 1px solid black;
      padding: 5px;
}
h2{
  font-weight: 300;
  padding-bottom:75px
}
h3{
  padding-top:100px
}
img{padding-top:30px;
padding-bottom:30px;
margin: auto;
        margin-right: 1vw;
        width: 5vw;
        float: right;}`];
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
    html`<div class="wrapper"><img
          id="header__logo"
          src="../src/images/crisp_logo.png"
          alt="Crisp logo"
        /></div>
    
    <div class="Landing">
      <h1>CONFIGURABLE DASHBOARD CANVAS</h1>
      <h2>This tool allows you to prepare reports using off the shelf charting web components to create an exportable report</h2>
      <div class="nav-container">
      <nav-link class="link" href="/cdc" onclick=${this.removeLanding()}>Launch Tool</nav-link>

    <div style="position: absolute; width:100%; bottom:0; left:0 ">
    
    <h3>Created by - Crisple Clear</h3>
            
            <h4>Contributors:</h4>
              <ul>
                <li>Owen Milliner</li>
                <li>Tharaka Mantrige</li>
                <li>Mark Golley</li>
              </ul>
  </div>
    
    </div>
    
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
