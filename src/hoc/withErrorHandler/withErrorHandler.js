import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler() {
            this.setState({ error: null });
        }

        render() {
            return (
                <auxiliary>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        <p>{ this.state.error ? this.state.error.message : null }</p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </auxiliary>
            );
        }
    };
};



export default withErrorHandler;