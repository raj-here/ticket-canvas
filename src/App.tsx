import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { About, Contact, Home, Dog } from './components';

export class App extends React.Component {
  render() {

    return (
      <div>
        <ul>
          <li> <Link to='/home'>Home</Link></li>
          <li> <Link to='/about'>About</Link></li>
          <li> <Link to='/contact'>Contact</Link></li>
          <li> <Link to='/dog'>Dog</Link></li>
        </ul>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/dog" component={Dog} />
        </Switch>
        {this.props.children}
      </div>
    )
  }
}