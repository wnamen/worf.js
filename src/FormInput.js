import React, { Component } from 'react';
import { Row, Button, ProgressBar } from 'react-materialize';
import ContentEditable from './ContentEditable.js';
import './App.css';

class FormInput extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="App">
                <ContentEditable className="input-box" placeholder="comment here" s={12} name="message" html={this.props.message} onChange={this.props.handleMessageInput} />
                { this.props.loading && <ProgressBar /> }
                {
                    this.props.sentiment && (<span className="error-message">{ this.props.sentiment }</span>)
                }
                <Row style={{textAlign: 'right'}}>
                    <Button className="red" onClick={this.props.handleClearMessage}>&#10007;</Button>
                    <Button onClick={this.props.handleSubmit} disabled={this.props.message.length <= 0}>&#10003;</Button>
                </Row>
            </div>
        );
    }
}

export default FormInput;
