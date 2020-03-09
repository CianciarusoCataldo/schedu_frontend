import React from 'react';
import { NOTIFICATION_TEXTS } from "constants/texts.js"


class InsertForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        cf: '',
        isOpen: false
      }
      this.handleChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.openClose = this.openClose.bind(this)
    };
  
    handleInputChange(event) {
      this.setState({
        cf: event.target.value
      });
    }
  
    handleSubmit(event) {
      this.props.func(this.state.cf)
      this.setState({ cf: '' })
      event.preventDefault();
    }
  
    openClose() {
      this.setState({ isOpen: !this.state.isOpen })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} >
          <div className="form-row">
            <input type="text" name="cf" value={this.state.cf} onChange={this.handleChange} className="form-control" id="cfInput" style={{ marginBottom: '2%' }}></input>
            <button type="submit" className="custom-button">
              <i className="fas fa-plus-circle button-icon"/>
              {NOTIFICATION_TEXTS[this.props.lang].ADD_CF}
            </button>
          </div>
        </form>
      )
    }
  
  
  }

  export default InsertForm;