import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { ApplicationState, TicketState } from "../../reducer";
import { getTickets } from "../../action";

interface StateProps {
  ticketState: TicketState;
}

interface DispatchProps {
  getTickets: any,
}

interface OwnProps {
  history: History
}

type Props = DispatchProps & StateProps & OwnProps;

interface State {

}

class TicketListComponent extends React.Component<Props, State> {

  public constructor(props: any) {
    super(props);
    this.state = {};

    this.props.getTickets();
  }

  render(): JSX.Element {
    const { ticketState } = this.props;
    return (
      <div>
        {ticketState.loading && <div className="loader"></div>}
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: 'auto' }}>
            <button className="button" style={{ backgroundColor: 'red' }} onClick={this.onNewButtonClick}>New Ticket</button>
          </div>
        </div>
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
              ticketState.list.map((ticket, index) => {
                return (
                  <tr key={index} onClick={() => this.onTicketRowClick(ticket.id)}>
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

  onTicketRowClick = (ticketId: number) => {
    this.props.history.push(`../ticket/${ticketId}`);
  }

  onNewButtonClick = () => {
    this.props.history.push(`../new-ticket`);
  }

}

const mapStateToProps = (appState: ApplicationState): StateProps => {
  return {
    ticketState: appState.ticketReducer
  };
}

const mapDispatchToProps: DispatchProps = {
  getTickets: getTickets
}

export const MyTickets = connect<StateProps, DispatchProps, null, ApplicationState>(mapStateToProps, mapDispatchToProps)(TicketListComponent);