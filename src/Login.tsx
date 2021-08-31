
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, Link } from 'react-router-dom';

import { authRequest, saveLoginDetail } from './action';
import { ApplicationState, AuthState } from './reducer';


interface StateProps {
  authState: AuthState;
}

interface DispatchProps {
  authRequest: any,
}

type Props = DispatchProps & StateProps

interface State {
  isLoggedIn: boolean
}

class LoginComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  onSubmit = (data: any) => {
    //validation
    this.props.authRequest(data);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.authState.token !== this.props.authState.token) {
      saveLoginDetail(this.props.authState.token);
      this.setState({
        isLoggedIn: true
      })
    }
  }

  render() {
    const { error, loading } = this.props.authState;
    const { isLoggedIn } = this.state;
    return (
      <React.Fragment>
        {isLoggedIn && <Redirect to="/home" />}
        <div className="login-form">
          <Link to='/register'>Register</Link>
          <h1>Login Form</h1>
          {loading && <div className="loader">requesting server</div>}
          {error && <div className="error-div">{error}</div>}
          <LoginForm onSubmit={this.onSubmit} />
        </div>
      </React.Fragment>
    )
  }
}


const LoginFormComponenet = (props: any) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Username</label>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label>Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button className="btn-primary btn" type="submit">Submit</button>
        </div>
      </div>
    </form>
  )
}

export const LoginForm = reduxForm({
  form: 'simple',
  enableReinitialize: true
})(LoginFormComponenet);


const mapStateToProps = (appState: ApplicationState): StateProps => {
  console.log(appState)
  return {
    authState: appState.authReducer
  };
}

const mapDispatchToProps: DispatchProps = {
  authRequest: authRequest
}

export const Login = connect<StateProps, DispatchProps, null, ApplicationState>(mapStateToProps, mapDispatchToProps)(LoginComponent);
