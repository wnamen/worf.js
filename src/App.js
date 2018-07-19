import React, { Component } from 'react';
import { Row, Button, Chip, Collection, CollectionItem, Card } from 'react-materialize';
import FormInput from './FormInput.js';
import moment from 'moment';
import rp from 'request-promise';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            reply: false,
            message: '',
            sentiment: '',
            comments: [{
                username: 'lewhat',
                date: '2018-07-05T09:32:55',
                text: 'FANTASTIC!!!  as a fellow sailor I very often watch "sailing" videos...your channel is by far the best..this is what I want to see. wind, waves smoking cigarettes and eating cold spaghetti from the tin... not yoga, quinoa and selfies diving a reef in flat calm Bahamas...you are a true seaman my friend.. respect!!'
            },
            {
                username: 'Erik',
                date: '2018-07-03T23:45:01',
                text: 'Thank you so much everyone of you, for all your nice comments! Im throughly touched!! My work gets 100 times more valuable and meaningful getting all this positive feedback...! The sky is not the limit, the space is above :) I will do my best to continue making more inspiring videos. STAY TUNED!'
            },
            {
                username: 'dave',
                date: '2018-07-03T06:01:54',
                text: 'Sincerely, I would have panicked hundred times ! Really impressive how he takes all challenges with calm. A real viking. Did you notice the delphine at minute 15:02 !! ? Very inspiring video'
            },
            {
                username: 'muschek',
                date: '2018-07-02T13:21:32',
                text: "Everything is AMAZING: The hero, The story, The film, The music! Best documental story about sailing, yacht and huge love to the sea. Thank's man. Allow me to shake your hand virtually at least ;)"
            },
            {
                username: 'fabrice',
                date: '2018-07-01T12:32:12',
                text: "It's is in fact one of the best sailing videos out there. No beaches, just wind and waves. Congrats Erik, well done!"
            }]
        }
    }

    componentWillMount = () => {
        rp({
            method: 'get',
            url: `http://10.16.190.135:8020/api/messages/idaily?canon=${window.location.href}`,
            json: true
        }).then(res => {
            this.setState({comments: res, loading: false})
        }).catch(err => {
            console.log(err)
        })
    }

    handleMessageInput = (e) => {
        this.setState({message: e.target.value})
    };
    handleClearMessage = () => {
        this.setState({message: '', sentiment: ''});
    }
    handleSubmit = () => {
        this.setState({loading:true});
        rp({
            method: 'get',
            url: `https://us-central1-worf-js.cloudfunctions.net/helloworld?message=${this.state.message}`,
            json: true
        }).then(res => {
            if (res.pass) {
                rp({
                    method: 'post',
                    url: 'http://10.16.190.135:8020/api/messages/idaily',
                    body: {
                        canon: window.location.href,
                        text: this.state.message,
                        name: 'Guest'
                    },
                    json: true
                }).then(res => {
                    this.setState({message: '', comments: res, loading: false})
                }).catch(err => {
                    console.log(err)
                })

            } else {

                console.log(res);

                if (res.problemIndices === -1) {
                    this.setState({
                        message: `<span class="error">${this.state.message}</span>`,
                        sentiment: 'You might want to rewrite your entire message.',
                        loading: false
                    })

                } else {
                    let sentences = this.state.message.match(/([^.?!])*[.?!]?/g);

                    res.problemIndices.forEach((index) => {
                        sentences[index] = `<span class="error">${sentences[index]}</span>`
                        console.log(sentences[index])
                    });

                    this.setState({
                        message: sentences.join(' '),
                        sentiment: 'Seems like your are trying to post a negative comment. Consider changing the highlighted messages.',
                        loading: false
                    })
                }
            }
        }).catch( err => {
            console.log(err)
        });
    };

    replySupport = () => {
        this.setState({reply: !this.state.reply});
    }

  render() {
      console.log(this.state)
    return (
      <div className="App">
        <Collection header={`${this.state.comments.length} Comments`}>
            <CollectionItem>
                <FormInput message={this.state.message}
                           loading={this.state.loading}
                           sentiment={this.state.sentiment}
                           handleMessageInput={this.handleMessageInput}
                           handleClearMessage={this.handleClearMessage}
                           handleSubmit={this.handleSubmit}/>
            </CollectionItem>
            <CollectionItem>
                {
                    this.state.comments.map((comment, idx)=>{
                        return (
                            <Card key={idx} s={12}>
                                <div>
                                    <Chip>
                                        <img src={comment.image || 'https://owl.cbsi.com/jira/secure/useravatar?ownerId=kbasireddy&avatarId=12915'} width='20' alt="profile image"/>
                                        {comment.username}
                                    </Chip>
                                    <small>{moment(comment.date).fromNow()}</small>
                                </div>

                                <p className="message">{comment.text}</p>

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
