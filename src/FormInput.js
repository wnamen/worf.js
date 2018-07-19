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
                    <Button onClick={this.props.handleClearMessage}><i className="fa fa-times-circle fa-3x" aria-hidden="true"></i></Button>
                    <Button onClick={this.props.handleSubmit} disabled={this.props.message.length <= 0 || this.props.sentiment}><i className="fa fa-check-circle fa-3x" aria-hidden="true"></i></Button>
                </Row>
            </div>
        );
    }
}

export default FormInput;
