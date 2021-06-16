import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InitialState } from "../reducer";
import { getRequest } from "../action";

interface StateProps {
  state: InitialState;
}

interface DispatchProps {
  getRequest: any,
}

type Props = DispatchProps & StateProps

interface State {
  loading: boolean;
}

class AppComponent extends Component<Props, State> {

  public constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    }

    this.props.getRequest();
  }

  render(): JSX.Element {
    const { state } = this.props;
    return (
      <div>
        {state.loading && <div className="loader" ></div>
        }
        <div className="users" >
          Hello World - {state.data}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (appState: any): StateProps => {
  return {
    state: appState.reducer
  };
}

const mapDispatchToProps: DispatchProps = {
  getRequest: getRequest
}

export const Dog = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AppComponent);