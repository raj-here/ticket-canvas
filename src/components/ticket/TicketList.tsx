import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, TicketState } from "../../reducer";
import { getTickets } from "../../action";

interface StateProps {
  state: TicketState;
}

interface DispatchProps {
  getTickets: any,
}

type Props = DispatchProps & StateProps

interface State {

}

class TicketListComponent extends React.Component<Props, State> {

  public constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    }

    this.props.getTickets();
  }

  render(): JSX.Element {
    const { state } = this.props;
    const { data } = this.props.state;
    return (
      <div>
        {state.loading && <div className="loader"></div>
        }
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Created Date</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((ticket, index) => {
                return (
                  <tr key={index}>
                    <td>{ticket.ticketSubject}</td>
                    <td>{ticket.dateCreated}</td>
                    <td>{ticket.createdBy}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = (appState: ApplicationState): StateProps => {
  return {
    state: appState.ticketReducer
  };
}

const mapDispatchToProps: DispatchProps = {
  getTickets: getTickets
}

export const MyTickets = connect<StateProps, DispatchProps, null, ApplicationState>(mapStateToProps, mapDispatchToProps)(TicketListComponent);