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
              <Input placeholder="comment here" s={12} />
            </Row>

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
