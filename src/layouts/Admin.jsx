
import React from "react";
import { Route, Switch } from "react-router-dom";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import Keycloak from 'keycloak-js'

// core components
import AdminNavbar from "components/molecules/AdminNavbar.jsx";
import Footer from "components/molecules/Footer.jsx";
import Sidebar from "components/molecules/Sidebar.jsx";

import routes from "routes.js";

import { NOTIFICATION_TEXTS } from 'constants/texts.js'
import logo from "assets/img/dispatcher-logo.png";

var ps;

/**
 * This component manage the structure of the entire app. It show a sidebar on the left side
 * and let the user surf through sections, by the sections available.
 */
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened: document.documentElement.className.indexOf("nav-open") !== -1,
      message: '',
      user: <br />,
      keycloak: null,
      language: "ita"
    };

    this.handleLanguage = this.handleLanguage.bind(this)
  }

  handleLanguage(lang) {
    console.log(lang)
    var welcomeUser = NOTIFICATION_TEXTS[lang].WELCOME_MESSAGE + this.state.user
    this.setState({
      language: lang,
      message: welcomeUser
    })

  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.cors = true
    if (!this.state.authenticated) {
      keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then(authenticated => {
        this.setState({ keycloak: keycloak })
        var welcomeUser = NOTIFICATION_TEXTS[this.state.language].WELCOME_MESSAGE + keycloak.tokenParsed.preferred_username

        this.setState({
          user: keycloak.tokenParsed.preferred_username,
          message: welcomeUser
        })
      })
    }
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  /**
   * This function opens and closes the sidebar on small devices
   */
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  /**
   * Map and return all routes (link to the sections). The username of actually logged user is 
   * passed as prop to every component linked
   */
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            name="test"
            path={prop.layout + prop.path}
            render={(renderProps) => (<prop.component
              user={this.state.user}
              lang={this.state.language}
              handleLanguage={this.handleLanguage}
            />)}

            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            lang={this.state.language}
            func={this.handleLanguage}
            username={this.state.message}
            keycloak={this.state.keycloak}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "",
              text: "Dispatcher",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >

            <AdminNavbar
              {...this.props}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

            <Switch>
              {this.getRoutes(routes)}
            </Switch>

            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
