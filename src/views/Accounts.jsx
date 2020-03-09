import React from "react";
import axios from 'axios';
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

//Custom components
import AccountDeleteButton from 'components/molecules/AccountDeleteButton.jsx'
import CustomModal from 'components/organisms/CustomModal.jsx'
import AccountForm from 'components/organisms/AccountForm.jsx'
import CustomTable from 'components/organisms/CustomTable.jsx'
import Preloader from "../components/atoms/Preloader";

//Constants
import { BACKEND_ADDRESS, BACKEND_GET, FRONTEND_ADDRESS } from 'constants/connection.js'
import { NOTIFICATION_TYPES, NOTIFICATION_LOCATIONS } from "constants/ui.js"
import { NOTIFICATION_TEXTS } from "constants/texts.js"

//Custom Functions
import { notify, isMobile } from 'helpers/Utils.jsx'


/**
 * This page shows the account saved in the remote SQL database. Every account is a resource 
 * for the dispatcher to process the input (2 or more accounts increase the concurrence of the 
 * scheduler). With the buttons, the user can also add a new account (it will be saved remotely) or
 * delete an existing one.
 */
class Accounts extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      loading: true,
      lang: this.props.lang,
    }
  }

  component = this;
  /**
   * Custom columns for the accounts table
   */
  cols = [
    { key: 'Username', label: 'Username' },
    { key: 'Password', label: 'Password' },
    {
      key: ' ', label: '', cell: (item, columnKey) => {
        return <AccountDeleteButton id={item.ID} lang={this.props.lang}></AccountDeleteButton>;

      }
    }]

  getComp = () => { return this };

  componentDidMount() {
    const myheaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': FRONTEND_ADDRESS
    }

    axios.get(BACKEND_ADDRESS + BACKEND_GET, { myheaders })
      .then(res => {
        this.setState({ accounts: res.data })
        this.setState({ loading: false })
      }).catch(error => {
        this.setState({ loading: false })
        notify(this.getComp(), NOTIFICATION_TEXTS[this.getComp().props.lang].CONNECTION_ERROR, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
        console.log(error);
      })
  }


  render() {
    if (this.state.loading) {
      return <Preloader />
    }
    else return isMobile() ? (
      <>
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <div className="slide-in">
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <CustomTable
                      lang={this.props.lang}
                      tableName={<b>SISTer Accounts</b>}
                      filename="accounts.json"
                      rows={this.state.accounts}
                      columns={this.cols} />
                    <CustomModal
                      lang={this.props.lang}
                      buttonLabel='Add Account'
                      internalComp={<AccountForm
                        viewComp={this}
                        accounts={this.state.accounts}
                        lang={this.props.lang} />} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </>)
      :
      (<>
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">

          <div className="slide-in">
            <Row>
              <Col xs="6" sm="12" md={{ size: 8, offset: 2 }}>
                <Card style={{ padding: '2rem' }} >
                  <CardBody>
                    <CustomTable
                      lang={this.props.lang}
                      tableName={<b>SISTer Accounts</b>}
                      filename="accounts.json"
                      rows={this.state.accounts}
                      columns={this.cols} />
                    <CustomModal
                      buttonIcon="fas fa-user-plus"
                      buttonLabel={NOTIFICATION_TEXTS[this.props.lang].ADD}
                      internalComp={
                        <AccountForm
                          buttonLabel={NOTIFICATION_TEXTS[this.props.lang].ADD}
                          viewComp={this}
                          lang={this.props.lang}
                          accounts={this.state.accounts} />} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </>);
  }
}

export default Accounts;