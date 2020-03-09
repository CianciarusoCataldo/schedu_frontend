
import Dashboard from "views/Dashboard.jsx";
import Accounts from "views/Accounts.jsx";
import Process from "views/Process.jsx"
import Settings from "views/Settings.jsx"
import Visure from "views/Visure.jsx"



var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-home",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Accounts",
    icon: "fas fa-address-card",
    component: Accounts,
    layout: "/admin"
  },
  {
    path: "/process",
    name: "Process",
    icon: "fas fa-tasks",
    component: Process,
    layout: "/admin"
  },
  {
    path: "/visure",
    name: "Visure",
    icon: "fas fa-paste",
    component: Visure,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "fas fa-cogs",
    component: Settings,
    layout: "/admin"
  }
];
export default routes;
