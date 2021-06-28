import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Field, reduxForm } from 'redux-form';

import { newTicket } from "../../action";
import { ApplicationState, TicketState } from '../../reducer';

interface StateProps {
    ticketState: TicketState;
};

interface DispatchProps {
    newTicket: any,
}



interface OwnProps {
    history: History
}

type Props = DispatchProps & StateProps & OwnProps;

interface State {
    message: string;
}


class NewTicketComponent extends React.Component<Props, State> {

    public constructor(props: any) {
        super(props);
        this.state = {
            message: ""
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.ticketState.status !== this.props.ticketState.status) {
            if (this.props.ticketState.status === 'Success') {
                this.setState({
                    message: "Ticket Registered Successfully"
                });

                setTimeout(() => {
                    this.props.history.push('../tickets');
                }, 3000);
            }
        }
    }

    render(): JSX.Element {
        const { loading } = this.props.ticketState;
        const { message } = this.state;
        return (
            <div>
                <h3>Register Form</h3>
                {message && <h1>{message}</h1>}
                {loading && <div className="loader"></div>}
                <NewTicketForm onSubmit={this.onSubmit} />
            </div>
        );
    }

    onSubmit = (data: any) => {
        this.props.newTicket(data);
    }

}

const mapStateToProps = (appState: ApplicationState): StateProps => {
    return {
        ticketState: appState.ticketReducer
    };
}

const mapDispatchToProps: DispatchProps = {
    newTicket: newTicket
}


const NewTicketFormComponenet = (props: any) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>Subject</label>
                    <Field
                        name="ticketSubject"
                        component="input"
                        type="text"
                        placeholder="Subject"
                    />
                </div>
                <div>
                    <label>Type</label>
                    <Field name="type" component="select">
                        <option value="">Select</option>
                        <option value="REQUEST">Request</option>
                        <option value="ERROR">Error</option>
                    </Field>
                </div>
                <div>
                    <label>Description</label>
                    <Field
                        name="description"
                        component="input"
                        type="text"
                        placeholder="Description"
                    />
                </div>
                <div>
                    <label>Link</label>
                    <Field
                        name="link"
                        component="input"
                        type="text"
                        placeholder="link"
                    />
                </div>
                <div>
                    <button className="btn-primary btn" type="submit">Add New Ticket</button>
                </div>
            </div>
        </form>
    )
}

export const NewTicketForm = reduxForm({
    form: 'newTicket',
    enableReinitialize: true
})(NewTicketFormComponenet);

export const NewTicket = connect<StateProps, DispatchProps, null, ApplicationState>(mapStateToProps, mapDispatchToProps)(NewTicketComponent);