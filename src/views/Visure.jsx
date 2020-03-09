import React from 'react';
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import CSV from 'papaparse'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

//Custom components
import Preloader from 'components/atoms/Preloader.jsx'
import FileSelector from 'components/molecules/FileSelector.jsx'
import InsertForm from 'components/molecules/InsertForm.jsx'
import Result from "components/organisms/Result.jsx"
import CustomTable from 'components/organisms/CustomTable.jsx'

//Custom functions
import { notify, isMobile } from 'helpers/Utils.jsx';

//Custom constants
import { BACKEND_ADDRESS, BACKEND_PROCESS, FRONTEND_ADDRESS } from 'constants/connection.js'
import { NOTIFICATION_TYPES, NOTIFICATION_LOCATIONS } from "constants/ui.js"
import { NOTIFICATION_TEXTS } from "constants/texts.js"

class Visure extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jsonFile: [],
      result: [],
      loading: false
    };

    this.fileReaderJSON = new FileReader();

    this.fileReaderJSON.onload = (event) => {
      var obj = event.target.result
      console.log(obj)
      var jsonobj = JSON.parse(obj)
      var tmp = this.state.jsonFile
      jsonobj.map((cf, index) =>
        tmp[tmp.length] = jsonobj[index]
      );

      this.setState({ jsonFile: tmp });
    };


    this.fileReaderCSV = new FileReader();

    this.fileReaderCSV.onload = (event) => {

      var csvfile = CSV.parse(event.target.result, {
        header: true,
        dynamicTyping: true,
      }).data
      console.log(csvfile[0])
      var tmp = this.state.jsonFile
      console.log(tmp)
      for (let i = 0; i < csvfile.length; i++) {
        tmp[tmp.length] = csvfile[i]
      }
      console.log(tmp)
      this.setState({ jsonFile: tmp });

    };

    this.handleProcess = this.handleProcess.bind(this)
    this.getRenderedResult = this.getRenderedResult.bind(this)
    this.addElement = this.addElement.bind(this)
    this.readFile = this.readFile.bind(this)
  }


  /**
   * Process the data insie the input table. The dispatcher, on the backend side, will return
   * the output in json format.
   *
   * @param {*} event : the submit event occurred when the user press the "Process" button
   */
  handleProcess(event) {
    if (this.state.jsonFile.length < 1) {
      notify(this, NOTIFICATION_TEXTS.EMPTY_LIST, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
    } else {
      var jsonObjStr = JSON.stringify(this.state.jsonFile)
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': FRONTEND_ADDRESS
      }

      this.setState({ loading: true })
      Axios.post(BACKEND_ADDRESS + BACKEND_PROCESS, jsonObjStr, { headers }).then(res => {

        this.setState({ result: res.data }, () => {
          this.setState({ loading: false })
          this.setState({ rendered: this.getRenderedResult() })
        });
      }).catch(() => {
        notify(this.props.viewComp, NOTIFICATION_TEXTS.CONNECTION_ERROR, NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
      })
      event.preventDefault();
    }
  };

  /**
   * Read the file (csv or json) dropped on file dropzone, or selected with file chooser,
   * and put his data into the input table.
   *
   * @param {*} file : file to read (if not json or csv, an error message will appear on UI)
   */
  readFile(file) {
    console.log(file[0])
    var extension = file[0].name.split('.').pop().toLowerCase()
    if (extension === 'json') {
      console.log("JSON")
      this.fileReaderJSON = new FileReader();

      this.fileReaderJSON.onloadend = (event) => {
        var jsonobj = JSON.parse(event.target.result)
        var tmp = this.state.jsonFile
        jsonobj.map((cf, index) =>
          tmp[tmp.length] = jsonobj[index]
        );

        this.setState({ jsonFile: tmp });
      };

      this.fileReaderJSON.readAsText(file[0]);
    }
    else if (extension === 'csv') {
      console.log("CSV")
      this.fileReaderCSV.readAsText(file[0]);
    }
    else {
      notify("Invalid input file", NOTIFICATION_LOCATIONS.BOTTOM_CENTER, NOTIFICATION_TYPES.DANGER)
    }
  }

  /**
   * Parse the result list and return all the elements properly rendered. If the list is empty,
   * no result will be displayed.
   */
  getRenderedResult() {
    return this.state.result.map((cf, index) =>
      <CardBody key={index}>
        <Result lang={this.props.lang} tableRows={this.state.result[index]}></Result>
      </CardBody>
    )
  }

  /**
   * Add manually an element to the input table
   *
   * @param {*} element : element to add to the input table
   */
  addElement(element) {
    var tmp = this.state.jsonFile
    if (element.length !== 0) {
      tmp[tmp.length] = { "cf": element }
      this.setState({ jsonFile: tmp })

    } else {
      notify(this, "Empty CF, try again !", "bc", NOTIFICATION_TYPES.WARNING)
    }
  }

  render() {
    if (!this.state.loading) {
      return isMobile() ?
        (<div className="content">
          <div className="slide-in">
            <div className="react-notification-alert-container">
              <NotificationAlert ref="notificationAlert" />
            </div>

            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <CustomTable
                      rows={this.state.jsonFile}
                      filename="cfs.json"
                      tableName="Input"
                      lang={this.props.lang} />
                    <hr style={{ borderTop: '1px solid gray' }} />
                    <InsertForm func={this.addElement} lang={this.props.lang} />
                  </CardBody>
                  <Col xs="12">
                    <FileSelector onChange={this.readFile} lang={this.props.lang}/>
                  </Col>
                  <hr />
                  <Row>
                    <Col style={{ marginBottom: "1rem", textAlign: "center" }}>
                      <button color="secondary" onClick={this.handleProcess} className="custom-button">
                        <i className="fas fa-cogs" style={{ margin: "4px 4px 6px 0px" }} />
                        Process
                        </button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h3"><b>Output</b></CardTitle>
                  </CardHeader>
                  {this.getRenderedResult()}
                </Card>
              </Col>
            </Row>
          </div>
        </div>)
        :
        (<div className="content">
          <div className="slide-in">
            <div className="react-notification-alert-container">
              <NotificationAlert ref="notificationAlert" />
            </div>
            <Row>
              <Col xs="6" sm="12" md={{ size: 8, offset: 2 }}>
                <Card style={{ padding: '2rem' }} >
                  <CardBody>
                    <CustomTable
                      rows={this.state.jsonFile}
                      filename="cfs.json"
                      tableName="Input"
                      lang={this.props.lang}/>
                    <hr style={{ borderTop: '1px solid gray', padding: '1rem' }} />
                    <InsertForm func={this.addElement} lang={this.props.lang} />
                  </CardBody>
                  <Col xs="12">
                    <FileSelector onChange={this.readFile} lang={this.props.lang}/>
                  </Col>
                  <hr />
                  <Row>
                    <Col xs="12" style={{ textAlign: "center" }}>
                      <button color="secondary" onClick={this.handleProcess} className="custom-button">
                        <i className="fas fa-cogs button-icon" />
                        Process
                 </button>
                    </Col>
                  </Row>
                </Card>
              </Col>

            </Row>

            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h3" style={{ textAlign: "center" }}><b>Output</b></CardTitle>
                  </CardHeader>
                  {this.getRenderedResult()}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        )
    } else {
      return <Preloader/>
    }
  }
}

export default Visure;
