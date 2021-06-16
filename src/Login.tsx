import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { authRequest, saveLoginDetail } from './action';
import { AuthState } from './reducer';


interface StateProps {
  authState: AuthState;
}

interface DispatchProps {
  authRequest: any,
}

type Props = DispatchProps & StateProps

interface State {

}

class LoginComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  onSubmit = (data: any) => {
    //validation
    this.props.authRequest(data);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.authState.token !== this.props.authState.token) {
      saveLoginDetail(this.props.authState.token);
    }
  }

  render() {
    const { error, loading } = this.props.authState;
    return (
      <React.Fragment>
        <div className="login-form">
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
  const { handleSubmit, pristine, reset, submitting, initialValues } = props;
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


const mapStateToProps = (appState: any): StateProps => {
  return {
    authState: appState.combineReducer.authReducer
  };
}

const mapDispatchToProps: DispatchProps = {
  authRequest: authRequest
}

export const Login = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(LoginComponent);