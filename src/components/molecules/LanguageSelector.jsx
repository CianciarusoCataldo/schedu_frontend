import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';

import {LANGUAGES, SETTINGS_TEXTS} from 'constants/texts.js'
class LanguageSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            language: this.props.lang
        }
        this.setOpen = this.setOpen.bind(this)
        this.handleLanguage = this.handleLanguage.bind(this)
    }

    setOpen() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleLanguage(lang) {
        this.props.func(lang)
    }

    render() {
        return (
            <Row>
                <Col><span className="language-label">{SETTINGS_TEXTS[this.props.lang].LANGUAGE}</span>
                    <ButtonDropdown isOpen={this.state.isOpen} toggle={this.setOpen}>
                        <DropdownToggle caret>
                        {LANGUAGES[this.state.language][this.state.language]}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => {
                                this.handleLanguage("ita");
                                this.setState({ language: "ita" })
                            }}>{LANGUAGES[this.state.language].ita}</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => {
                                this.handleLanguage("eng");
                                this.setState({ language: "eng" })
                            }}>{LANGUAGES[this.state.language].eng}</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
            </Row>
        );
    }
}

export default LanguageSelector;