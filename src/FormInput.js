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
                <ContentEditable className="input-box" placeholder="comment here" s={12} name={this.props.name} html={this.props.value} onChange={this.props.handleMessageInput} />
                { this.props.loading && <ProgressBar /> }
                {
                    this.props.sentiment && (<span className="error-message">{ this.props.sentiment }</span>)
                }
                <Row style={{textAlign: 'right'}}>
                    <Button onClick={this.props.handleClearMessage}><i className="fa fa-times-circle fa-3x" aria-hidden="true" /></Button>
                    <Button onClick={() => this.props.handleSubmit(this.props.commentId || '')} disabled={this.props.value.length <= 0 || this.props.sentiment}><i className="fa fa-check-circle fa-3x" aria-hidden="true" /></Button>
                </Row>
            </div>
        );
    }
}

export default FormInput;
