import React, { Component } from 'react';
import { Row, Input, Navbar, NavItem, Button, Chip  } from 'react-materialize';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
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
            }

            ]
        }
    }
  render() {
    return (
      <div>
        <Navbar>
            <NavItem>600 Comments</NavItem>
        </Navbar>

        <div>
            <Row>
              <Input placeholder="comment here" s={6} />
            </Row>

            <Row>
              <Button>Cancel</Button>
              <Button>Submit</Button>
            </Row>
        </div>

        <Row>
            {
                this.state.comments.map((comment, idx)=>{
                    return (
                        <Row key={idx}>
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
