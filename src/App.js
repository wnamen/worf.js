import React, { Component } from 'react';
import { Row, Button, Chip, Collection, CollectionItem  } from 'react-materialize';
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
                this.setState({message: '', comments: [{name: 'Guest', date: moment(), message: (this.state.message).replace(/<(?:.|\n)*?>/gm, '')}, ...this.state.comments]})
            } else {

                console.log(res);

                if (res.problemIndices === -1) {
                    this.setState({
                        message: `<span class="error">${this.state.message}</span>`,
                        sentiment: 'You might want to rewrite your entire message.'
                    })

                } else {
                    let sentences = this.state.message.match(/([^.?!])*[.?!]?/g);

                    res.problemIndices.forEach((index) => {
                        sentences[index] = `<span class="error">${sentences[index]}</span>`
                        console.log(sentences[index])
                    });

                    this.setState({
                        message: sentences.join(' '),
                        sentiment: 'Seems like your are trying to post a negative comment. Consider changing the highlighted messages.'
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
        <Collection>
            <CollectionItem>
                <ContentEditable className="input-box" placeholder="comment here" s={12} name="message" html={this.state.message} onChange={this.handleMessageInput} />
                {
                    this.state.sentiment && (<span className="error-message">{ this.state.sentiment }</span>)
                }
                <Row style={{textAlign: 'right'}}>
                    <Button className="red" onClick={() => this.setState({message: '', sentiment: ''})}>&#10007;</Button>
                    <Button onClick={this.handleSubmit} disabled={this.state.message.length <= 0}>&#10003;</Button>
                </Row>
            </CollectionItem>
            <CollectionItem>
                {
                    this.state.comments.map((comment, idx)=>{
                        return (
                            <Row key={idx} s={12}>
                                <Chip>{comment.name}</Chip>
                                <small>{moment().calendar()}</small>
                                <p className="message">{comment.message}</p>
                            </Row>
                        )
                    })
                }
            </CollectionItem>
        </Collection>
      </div>
    );
  }
}

export default App;
