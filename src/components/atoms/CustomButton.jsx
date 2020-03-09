import React from 'react';

export default class CustomButton extends React.component{

    constructor(props) {
        super(props);
        this.state={
            clicked: false
        }
        this.setClicked=this.setClicked.bind(this)
        
}

setClicked(click){
    this.setState({clicked: click});            
}


}