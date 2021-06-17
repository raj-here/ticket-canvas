import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { MyTickets } from './components';

export class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {/* <li> <Link to='/home'>Home</Link></li>
          <li> <Link to='/about'>About</Link></li>
          <li> <Link to='/contact'>Contact</Link></li> */}
          <li> <Link to='/my-tickets'>My Ticket</Link></li>
        </ul>
        <Switch>
          {/* <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} /> */}
          <Route exact path="/my-tickets" component={MyTickets} />
        </Switch>
        {this.props.children}
      </div>
    )
  }
}