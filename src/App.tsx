import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { MyTickets, About, Contact, Home } from './components';

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          <ul>
            <li> <NavLink activeClassName="active" to='/home'>Home</NavLink></li>
            <li> <NavLink activeClassName="active" to='/about'>About</NavLink></li>
            <li> <NavLink activeClassName="active" to='/contact'>Contact</NavLink></li>
            <li> <NavLink activeClassName="active" to='/tickets'>Ticket List</NavLink></li>
          </ul>
        </div>
        <div style={{ margin: "0 30px" }}>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/tickets" component={MyTickets} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}