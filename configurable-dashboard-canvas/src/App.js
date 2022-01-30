import { LitElement, css, html } from "lit-element";
import { router } from "lit-element-router";

//Components
import "./components/navigation/nav-link.component";
import "./components/header/header.component";
import "./router-outlet";

//pages
import "./pages/home/home.page";
import "./pages/contact/contact.page";
import "./pages/about/about.page";

class App extends router(LitElement) {
static get styles() {
    return css`
    .nav-container {
    display: flex;
    justify-content: space-evenly;
}
    
    `;
  }
  
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
      data: { type: Object }
    };
  }

  static get routes() {
    return [
      {
        name: "home",
        pattern: "",
        data: { title: "Home" }
      },
      {
        name: "about",
        pattern: "about"
      },
        {
        name: "contact",
        pattern: "contact"
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
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    this.data = data;
  }

  render() {
    return html`<app-header></app-header>
    <div class="nav-container">
    <nav-link href="/">Home</nav-link>
    <nav-link href="/contact">Contact</nav-link>
    <nav-link href="/about">About</nav-link>
    </div>

      <router-outlet active-route=${this.route}>
        <home-page route="home"></home-page>
        <about-page route="about"></about-page>
        <contact-page route="contact"></contact-page>
        <h1 route="not-found">Not Found</h1>
      </router-outlet>
    `;
  }
}

customElements.define("app-container", App);
