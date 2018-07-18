import React, { Component } from 'react';
import { Row, Input, Navbar, NavItem, Button, Chip  } from 'react-materialize';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
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
    }

    handleSubmit = () => {
        this.setState({message: '', comments: [{name: 'Guest', date: moment(), message: this.state.message}, ...this.state.comments]})
    }

  render() {
    return (
      <div>
        <Navbar>
            <NavItem>600 Comments</NavItem>
        </Navbar>

        <div>
            <Row>
              <Input placeholder="comment here" s={12} value={this.state.message} onChange={this.handleMessageInput} />
            </Row>

            <Row>
              <Button onClick={() => this.setState({message: ''})}>Cancel</Button>
              <Button onClick={this.handleSubmit} disabled={this.state.message.length <= 0}>Submit</Button>
            <Row style={{textAlign: 'right'}}>
                <Button>&#10007;</Button>
                <Button>&#10003;</Button>
            </Row>
        </div>

        <Row>
            {
                this.state.comments.map((comment, idx)=>{
                    return (
                        <Row key={idx} s={12}>
                            <Chip>{comment.name}</Chip>
                            <span>{moment().calendar()}</span>
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
