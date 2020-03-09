import React from 'react';
import Axios from 'axios';
import { notify } from 'helpers/Utils.jsx';


import {BACKEND_ADDRESS,BACKEND_ADD, FRONTEND_ADDRESS} from 'constants/connection.js'
import {NOTIFICATION_TYPES, NOTIFICATION_LOCATIONS} from "constants/ui.js"
import {NOTIFICATION_TEXTS} from "constants/texts.js"

export default class AccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      clicked: false
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (!this.state.clicked) {
      this.setState({ clicked: true })
      if (this.state.username.length < 1 || this.state.password.length < 1) {
        notify(this.props.viewComp, NOTIFICATION_TEXTS[this.props.lang].ACCOUNT_INVALID, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.WARNING)
        this.setState({ username: '' });
        this.setState({ password: '' });
        this.setState({ clicked: false })
        event.preventDefault()
      }

      else {

        for (var i = 0; i < this.props.accounts.length; i++) {
          if (this.props.accounts[i]["Username"] === this.state.username) {
            notify(this.props.viewComp, NOTIFICATION_TEXTS[this.props.lang].ACCOUNT_EXIST, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.WARNING);
            this.setState({ username: '' });
            this.setState({ password: '' });
            event.preventDefault()
            return
          }
        }

        var params = {
          "Username": this.state.username,
          "Password": this.state.password
        };

        var jsonObjStr = JSON.stringify(params)
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': FRONTEND_ADDRESS
        }

        notify(this.props.viewComp, NOTIFICATION_TEXTS[this.props.lang].ADDING, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.INFO)
        Axios.post(BACKEND_ADDRESS+BACKEND_ADD, jsonObjStr, { headers }).then(res => {

          this.setState({ username: '' });
          this.setState({ password: '' });
          event.preventDefault()
          if (res.data === "ok") {
            window.location.reload();
          }

          else {
            notify(this.props.viewComp, NOTIFICATION_TEXTS[this.props.lang].INTERNAL_ERROR, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
            this.setState({ clicked: false })
          }
        }).catch(error => {
          notify(this.props.viewComp, NOTIFICATION_TEXTS[this.props.lang].CONNECTION_ERROR, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
          console.log(error);
          this.setState({ clicked: false })
          event.preventDefault();
        })
        event.preventDefault();

      }
    }else{
      event.preventDefault()
    }
  }

  render() {
    return (

        <form onSubmit={this.handleSubmit} style={{textAlign: "center", padding: "1.2rem"}}>
          <div className="form-group">
            <h4><b>Username</b></h4>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" id="userInput" />
            <h4 style={{marginTop: "1.6rem"}}><b>Password</b></h4>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="pswInput" />
          </div>
          <p></p>
          <input type="submit" value={this.props.buttonLabel} className="custom-button" />
        </form>
    )
  }
}