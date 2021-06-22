import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveLoginDetail } from '../action';
import { AuthState } from '../reducer';

interface StateProps {
    authState: AuthState;
}

interface DispatchProps {
    saveLoginDetail: any,
}

type Props = DispatchProps & StateProps

interface State {
    redirect: boolean;
    loading: boolean;
}

const mapStateToProps = (state: any): StateProps => {
    return {
        authState: state.authState
    };
}

export const withAuth = (ComponentToProtect: any) => {
    return connect(mapStateToProps, {})(class extends Component<Props, State> {
        constructor(props: any) {
            super(props);
            this.state = {
                loading: true,
                redirect: true
            }
        }

        componentDidMount() {
            const token = localStorage.getItem('token');
            let redirect = true
            if (token) {
                saveLoginDetail(token);
                redirect = false
            }
            this.setState({ loading: false, redirect })
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    })
}