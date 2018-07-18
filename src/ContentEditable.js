import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ContentEditable extends Component {
    render = () => {
        return <div
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    }

    shouldComponentUpdate = (nextProps) => {
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    componentDidUpdate = () => {
    if ( this.props.html !== ReactDOM.findDOMNode(this).innerHTML ) {
        ReactDOM.findDOMNode(this).innerHTML = this.props.html;
    }
}

    emitChange = () => {
        let html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
}

export default ContentEditable;