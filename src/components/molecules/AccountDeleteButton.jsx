import React from 'react';
import Axios from 'axios';
import NotificationAlert from "react-notification-alert";

import {notify} from 'helpers/Utils.jsx';
import {BACKEND_ADDRESS,BACKEND_REMOVE, FRONTEND_ADDRESS} from 'constants/connection.js'
import {NOTIFICATION_TYPES, NOTIFICATION_LOCATIONS} from "constants/ui.js"
import {NOTIFICATION_TEXTS} from "constants/texts.js"

/** 
* This button is used to delete an entry from the account table.
 */
export default class AccountDeleteButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handle the click action on the submit button. When a user click on the button, 
   * the value inserted is saved into the state and then sent to the backend application 
   * to processing 
   * 
   * @param {*} event : the click event
   */
  handleSubmit(event) {

    var params = {
      "id": this.props.id
   };

    var jsonObjStr = JSON.stringify(params)
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': FRONTEND_ADDRESS
    }

    notify(this, NOTIFICATION_TEXTS[this.props.lang].DELETING, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.INFO)
    Axios.post(BACKEND_ADDRESS+BACKEND_REMOVE, jsonObjStr, { headers }).then(res => {
      if (res.data === "removed") {
        window.location.reload();
      }
      else {
        notify(this, NOTIFICATION_TEXTS[this.props.lang].INTERNAL_ERROR, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
        event.preventDefault()
      }
    }).catch(error=>{
      notify(this, NOTIFICATION_TEXTS[this.props.lang].CONNECTION_ERROR, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
      event.preventDefault()
    })

    event.preventDefault();
  }

  render() {
    return (<>
      <div className="react-notification-alert-container">
      <NotificationAlert ref="notificationAlert" />
      </div>
      <button className="custom-button" onClick={this.handleSubmit}>        
      <i className="fas fa-user-times button-icon"/>
      {NOTIFICATION_TEXTS[this.props.lang].DELETE}
      </button>
        </>
    )
  }
}