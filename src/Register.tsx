import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

import { registerUser } from './action';
import { AuthState } from './reducer';


interface StateProps {
  authState: AuthState;
}

interface DispatchProps {
  registerUser: any
}

type Props = DispatchProps & StateProps

interface State {
  message: string;
  redirect: boolean;
}

class RegisterComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
      redirect: false
    }
  }

  onSubmit = (data: any) => {
    //validation
    this.props.registerUser(data);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.authState.status !== this.props.authState.status) {
      if (this.props.authState.status === 'Success') {
        this.setState({
          message: "User Registered Successfully"
        });

        setTimeout(() => {
          this.setState({ redirect: true });
        }, 3000);
      }
    }
  }

  render() {
    const { error, loading } = this.props.authState;
    const { message, redirect } = this.state;
    return (
      <React.Fragment>
        {redirect && <Redirect to="/home" />}
        <div className="login-form">
          <h3>Register Form</h3>
          {message && <h1>{message}</h1>}
          {loading && <div className="loader">Requesting Server</div>}
          {error && <div className="error-div">{error}</div>}
          <RegisterForm onSubmit={this.onSubmit} />
        </div>
      </React.Fragment>
    )
  }
}


const RegisterFormComponenet = (props: any) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Name</label>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>
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

export const RegisterForm = reduxForm({
  form: 'register',
  enableReinitialize: true
})(RegisterFormComponenet);


const mapStateToProps = (appState: any): StateProps => {
  return {
    authState: appState.combineReducer.authReducer
  };
}

const mapDispatchToProps: DispatchProps = {
  registerUser: registerUser
}

export const Register = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RegisterComponent);