import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

import { ApplicationState, TicketState } from "../../reducer";
import { deleteTicket, getTicket } from "../../action";

interface StateProps {
    ticketState: TicketState;
}

interface DispatchProps {
    getTicket: any;
    deleteTicket: any
}



interface OwnProps extends RouteComponentProps<RouteParams> {
    history: History
}

type Props = DispatchProps & StateProps & OwnProps;

interface State {
    message: string;
}

interface RouteParams { ticketId: string };

class TicketComponent extends React.Component<Props, State> {

    public constructor(props: any) {
        super(props);
        this.state = {
            message: ""
        };
        this.props.getTicket(this.props.match.params.ticketId);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.ticketState.status !== this.props.ticketState.status) {
            if (this.props.ticketState.status === 'Delete') {
                this.setState({
                    message: "Ticket Delete Successfully"
                });

                setTimeout(() => {
                    this.props.history.push('../tickets');
                }, 3000);
            }
        }
    }

    render(): JSX.Element {
        const { message } = this.state;
        const { data, loading } = this.props.ticketState;
        return (
            <div>
                {loading && <div className="loader"></div>}
                {message && <h1>{message}</h1>}
                <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: 'auto' }}>
                        <button className="button" style={{ backgroundColor: 'red' }} onClick={this.onDeleteButtonClick}>Delete Ticket</button>
                    </div>
                </div>
                {data &&
                    <div className="float-container">
                        <div className="float-child">
                            <div>
                                <h3>Subject:</h3>
                                <div>{data.ticketSubject || '--'}</div>
                            </div>
                            <div>
                                <h3>Created By:</h3>
                                <div>{data.createdBy || '--'}</div>
                            </div>
                            <div>
                                <h3>Type:</h3>
                                <div>{data.type || '--'}</div>
                            </div>
                            <div>
                                <h3>Link:</h3>
                                <div>{data.link || '--'}</div>
                            </div>
                        </div>
                        <div className="float-child">
                            <div>
                                <h3>Created Date:</h3>
                                <div>{data.dateCreated || '--'}</div>
                            </div>
                            <div>
                                <h3>Description:</h3>
                                <div>{data.description || '--'}</div>
                            </div>
                            <div>
                                <h3>Worked By:</h3>
                                <div>{data.workedBy || '--'}</div>
                            </div>
                            <div>
                                <h3>Last Updated Date:</h3>
                                <div>{data.lastUpdated || '--'}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    onDeleteButtonClick = () => {
        this.props.deleteTicket(this.props.match.params.ticketId);
    }

}

const mapStateToProps = (appState: ApplicationState): StateProps => {
    return {
        ticketState: appState.ticketReducer
    };
}

const mapDispatchToProps: DispatchProps = {
    getTicket: getTicket,
    deleteTicket: deleteTicket
}

export const Ticket = connect<StateProps, DispatchProps, null, ApplicationState>(mapStateToProps, mapDispatchToProps)(TicketComponent);