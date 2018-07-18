import React, { Component } from 'react';
import { Row, Navbar, NavItem, Button, Chip  } from 'react-materialize';
import ContentEditable from './ContentEditable.js';
import moment from 'moment';
import rp from 'request-promise';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            sentiment: '',
            comments: [{
                name: 'lewhat',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'lewhat',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'lewhat',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'lewhat',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'lewhat',
                date: '12/32/45',
                message: 'hello peoples'
            }]
        }
    }

    handleMessageInput = (e) => {
        this.setState({message: e.target.value})
    };

    handleSubmit = () => {
        rp({
            method: 'get',
            url: `https://us-central1-worf-js.cloudfunctions.net/helloworld?message=${this.state.message}`,
            json: true
        }).then(res => {
            if (res.pass) {
                this.setState({message: '', comments: [{name: 'Guest', date: moment(), message: this.state.message}, ...this.state.comments]})
            } else {

                console.log(res);

                if (res.problemIndices === -1) {
                    this.setState({
                        message: `<span className="error">${this.state.message}</span>`,
                        sentiment: 'Please review your message for errors you dumbass.'
                    })

                } else {
                    let sentences = this.state.message.match(/([^.?!])*[.?!]?/g);

                    res.problemIndices.forEach((index) => {
                        sentences[index] = `<span style={{backgroundColor: 'yellow'}}>${sentences[index]}</span>`
                    });

                    this.setState({
                        message: sentences.join(' '),
                        sentiment: 'Please review your message for errors you dumbass.'
                    })
                }
            }
        }).catch( err => {
            console.log(err)
        });
    };

  render() {
      console.log(this.state)
    return (
      <div className="App">
        <Navbar>
            <NavItem>600 Comments</NavItem>
        </Navbar>

        <div>
            <ContentEditable placeholder="comment here" s={12} name="message" html={this.state.message} onChange={this.handleMessageInput} />
            { this.state.sentiment }
            <Row style={{textAlign: 'right'}}>
              <Button onClick={() => this.setState({message: '', sentiment: ''})}>&#10007;</Button>
              <Button onClick={this.handleSubmit} disabled={this.state.message.length <= 0}>&#10003;</Button>
            </Row>
        </div>

        <Row>
            {
                this.state.comments.map((comment, idx)=>{
                    return (
                        <Row key={idx} s={12}>
                            <Chip>{comment.name}</Chip>
                            <small>{moment().calendar()}</small>
                            <p>{comment.message}</p>
                        </Row>
                    )
                })
            }
        </Row>
      </div>
    );
  }
}

export default App;
