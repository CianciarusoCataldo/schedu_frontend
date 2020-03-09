
import React from "react";

// reactstrap components
import {

  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col

} from "reactstrap";

import { isMobile } from 'helpers/Utils.jsx'

import UISwitch from 'components/atoms/UISwitch.jsx'
import LanguageSelector from 'components/molecules/LanguageSelector.jsx'
import { SETTINGS_TEXTS } from "constants/texts.js"

/**
 * This page manage some settings of the app and show some info about the development and his
 * authors
 */
class Settings extends React.Component {


  render() {
    return (
      isMobile() ?
        (<div className="content">
          <div className="slide-in">
            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h2" className="settings-title"><b>{SETTINGS_TEXTS[this.props.lang].SETTINGS}</b></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <UISwitch
                      func={(checked) => {
                        if (checked) {
                          document.body.classList.remove("white-content")
                        } else { document.body.classList.add("white-content") };
                      }}
                      check={!document.body.classList.contains("white-content")}
                      label={SETTINGS_TEXTS[this.props.lang].DARK_MODE} />
                    <div>
                      <LanguageSelector func={this.props.handleLanguage} lang={this.props.lang} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h2" className="settings-title"><b>{SETTINGS_TEXTS[this.props.lang].ABOUT}</b></CardTitle>
                  </CardHeader>
                  <CardBody>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>)

        : (<div className="content">
          <div className="slide-in">
            <Row>
              <Col xs="6">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h2" className="settings-title"><b>{SETTINGS_TEXTS[this.props.lang].SETTINGS}</b></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <UISwitch
                        func={(checked) => {
                          if (checked) {
                            document.body.classList.remove("white-content")
                          } else { document.body.classList.add("white-content") };
                        }}
                        check={!document.body.classList.contains("white-content")}
                        label="Dark Mode" />
                    </Row>
                    <Row>
                      <LanguageSelector func={this.props.handleLanguage} lang={this.props.lang} />
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h2" className="settings-title"><b>{SETTINGS_TEXTS[this.props.lang].ABOUT}</b></CardTitle>
                  </CardHeader>
                  <CardBody>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>)

    );
  }
}

export default Settings;
