import React, { Component } from 'react';
import { Row, Button, Chip, Collection, CollectionItem, Card  } from 'react-materialize';
import ContentEditable from './ContentEditable.js';
import FormInput from './FormInput.js';
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
                name: 'Sam',
                image: 'https://owl.cbsi.com/jira/secure/useravatar?ownerId=sdarb0326&avatarId=28101',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'Keerthi',
                image: 'https://owl.cbsi.com/jira/secure/useravatar?ownerId=kbasireddy&avatarId=12915',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'Nick',
                image: 'https://owl.cbsi.com/jira/secure/useravatar?avatarId=10122',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'William',
                image: 'https://owl.cbsi.com/jira/secure/useravatar?avatarId=10102',
                date: '12/32/45',
                message: 'hello peoples'
            },
            {
                name: 'lewhat',
                image: 'https://owl.cbsi.com/jira/secure/useravatar?ownerId=lweld1127&avatarId=23500',
                date: '12/32/45',
                message: 'hello peoples'
            }]
        }
    }

    handleMessageInput = (e) => {
        this.setState({message: e.target.value})
    };
    handleClearMessage = () => {
        this.setState({message: '', sentiment: ''});
    }
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

    replySupport = () => {
        this.setState({reply: true});
    }

  render() {
      console.log(this.state)
    return (
      <div className="App">
        <Collection>
            <CollectionItem>
                <FormInput message={this.state.message}
                           handleMessageInput={this.handleMessageInput}
                           sentiment={this.state.sentiment}
                           handleClearMessage={this.handleClearMessage}
                           handleSubmit={this.handleSubmit}/>
            </CollectionItem>
            <CollectionItem>
                {
                    this.state.comments.map((comment, idx)=>{
                        return (
                            <Card key={idx} s={12}>
                                <Chip>
                                <img src={comment.image} width='20' alt="profile image"/>
                                {comment.name}
                                </Chip>
                                <small>{moment().calendar()}</small>
                                <p className="message">{comment.message}</p>
                                <Button className="reply-button" onClick={this.replySupport}>Reply</Button>
                                {
                                    this.state.reply && (<FormInput message={this.state.message}
                                                                   handleMessageInput={this.handleMessageInput}
                                                                   sentiment={this.state.sentiment}
                                                                   handleClearMessage={this.handleClearMessage}
                                                                   handleSubmit={this.handleSubmit}/>)
                                }
                            </Card>
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
