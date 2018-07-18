import React, { Component } from 'react';
import { Row, Input, Navbar, NavItem, Button, Card  } from 'react-materialize';
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
            <Row>
              <Input placeholder="comment here" s={6} />
            </Row>
            <Row>
              <Button>Cancel</Button>
              <Button>Submit</Button>
            </Row>
            <Row>
                {
                    this.state.comments.map((comment, idx)=>{
                        return (
                            <Card key={idx}>
                                <p>
                                    <span>{comment.name}</span>
                                    <span> {comment.date}</span>
                                </p>
                                    <p>{comment.message}</p>
                            </Card>
                        )
                    })
                }
            </Row>
      </div>
    );
  }
}

export default App;
