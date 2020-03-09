import React from "react";
import JsonTable from 'ts-react-json-table'

import { exportJson } from 'helpers/Utils.jsx'
import { NOTIFICATION_TEXTS } from "constants/texts.js"

/**
 * This component create a table based on the input given by props ("rows"). It use the Decorator
 * Design Pattern approach, adding some useful functionality, like download button to retrieve the 
 * data contained into the table. Optionally, it's possible to use custom Columns for the table, 
 * with the "columns" prop, and a custom filename for the download button, with "filename" prop.
 */
export default class CustomTable extends React.Component {

  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ display: "inline-block", marginRight: "1rem" }}><b>{this.props.tableName}</b></h3>
          <button color="white" onClick={() => { exportJson(this.props.filename, JSON.stringify(this.props.rows)) }} className="custom-button">
            <i className="fas fa-download button-icon" />
            {NOTIFICATION_TEXTS[this.props.lang].DOWNLOAD}
          </button>
          <hr style={{ borderTop: '1px solid gray', padding: '1rem' }} />
        </div>
        <JsonTable settings={{noRowsMessage: NOTIFICATION_TEXTS[this.props.lang].EMPTY_LIST}} className="table" rows={this.props.rows} columns={this.props.columns}></JsonTable>
      </>)
  }
}