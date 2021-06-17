import React from 'react';
import { connect } from 'react-redux';
import { InitialState } from "../reducer";
import { getMyTickets } from "../action";

interface StateProps {
  state: InitialState;
}

interface DispatchProps {
  getMyTickets: any,
}

type Props = DispatchProps & StateProps

interface State {

}

class AppComponent extends React.Component<Props, State> {

  public constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    }

    this.props.getMyTickets();
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
    state: appState.combineReducer.dogReducer
  };
}

const mapDispatchToProps: DispatchProps = {
  getMyTickets: getMyTickets
}

export const MyTickets = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AppComponent);