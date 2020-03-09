import React from "react";
import Switch from 'react-switch'

import {
    Row,
    Col
} from "reactstrap";

export default class UISwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked:  this.props.check};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
        this.props.func(checked)
    }

    render() {
        return (
            <Row>
                <Col>
                    <h3 className="setting-line">{this.props.label}</h3>
                    <Switch
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        className="custom-switch"
                    />
                </Col>
            </Row>
        );
    }
}