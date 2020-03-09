import React from 'react';
import {Collapse} from "reactstrap";

//Custom Components
import CustomTable from 'components/organisms/CustomTable.jsx'
import { RESULT_TEXTS } from "constants/texts.js"

export default class Result extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      show: false
    }
    this.setIsOpen = this.setIsOpen.bind(this)
    this.getText = this.getText.bind(this)
  };

  setIsOpen() {
    this.setState({ show: !this.state.show });
    this.setState({ isOpen: !this.state.isOpen });
  }

  getText() {
    if (this.state.show) {
      return <div>
        <i className="fas fa-chevron-circle-up button-icon"/>
        {RESULT_TEXTS[this.props.lang].HIDE}
        </div>
    }
    else
      return <div>
      <i className="fas fa-chevron-circle-down button-icon"/>
      {RESULT_TEXTS[this.props.lang].SHOW}
      </div>;
  }

  render() {
    console.log(this.props.lang)
    return <div> <h3 style={{display: "inline-block", marginLeft: "1rem"}}>        
    {RESULT_TEXTS[this.props.lang].RESULT}"{this.props.tableRows["key"]}"</h3>
      <button color="secondary" onClick={this.setIsOpen} style={{ marginUp: '0.9rem', marginBottom: '1rem' }} className="custom-button">
        {this.getText()}
      </button>
      <Collapse isOpen={this.state.isOpen}><br></br>
        <CustomTable lang={this.props.lang} tableName="Immobili" rows={this.props.tableRows["immobili"]} filename={"immobili_" + this.props.tableRows["key"] + ".json"} />
        <CustomTable lang={this.props.lang} tableName="Anagrafica" rows={this.props.tableRows["info"]} filename={"anagrafica_" + this.props.tableRows["key"] + ".json"} />
      </Collapse>
      <hr/></div>
  }


}