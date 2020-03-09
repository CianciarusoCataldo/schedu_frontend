/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav } from "reactstrap";


//Keycloak component to manage login/logout process
import Keycloak from 'keycloak-js'

import { APP_NAME, SECTIONS } from 'constants/texts.js'

var ps;

/**
 * This component describes the sidebar of the applications. It shows the current user, the
 * logout button related, and the links to all sections. 
 */
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this)
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  handleLanguage(lang) {
    this.props.func(lang)
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }


  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };


  render() {
    const { bgColor, routes, keycloak, logo, username } = this.props;

    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          <div className="sidebar-title">
            {APP_NAME}
          </div>
          <hr className="separator" />
          <div style={{ textAlign: "center" }}>
            <div className="fade-in user-container">
              {username} &nbsp;</div>
            <button className="authentication" onClick={(ev) => { keycloak.logout() }}><i className="fas fa-sign-out-alt button-icon" />Logout</button>
          </div>
          <hr className="separator" />

          <Nav>
            {routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}>
                    <i className={prop.icon} />
                    <p className="sidebar-section">{SECTIONS[this.props.lang][prop.name.toUpperCase()]}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>

        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "blue",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
