import React from "react";
import Files from "react-files";

import { NOTIFICATION_TEXTS } from "constants/texts.js"

/**
 * This component create a table based on the input given by props ("rows"). It use the Decorator
 * Design Pattern approach, adding some useful functionality, like download button to retrieve the 
 * data contained into the table. Optionally, it's possible to use custom Columns for the table, 
 * with the "columns" prop, and a custom filename for the download button, with "filename" prop.
 */
export default class FileSelector extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            reload: true
        }

        this.handleChange=this.handleChange.bind(this)
    }

    /**
     * Handle the actions on the file selected by the user
     * 
     * @param {*} file : the file to show in the table 
     */
    handleChange(file){
        this.props.onChange(file)
        this.forceUpdate()
    }

    render(){
        return (
            <Files
            style={{ padding: "5% 5%", border: "3px dashed gray", borderRadius: "8px", textAlign: "center" }}
            className="files-dropzone"
            onChange={this.handleChange}
            onError={err => console.log(err)}
            accepts={[".json",".csv"]}
            multiple
            maxFiles={3}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
          >
        {NOTIFICATION_TEXTS[this.props.lang].DROPZONE_MESSAGE}
          </Files>
        )
    }

}