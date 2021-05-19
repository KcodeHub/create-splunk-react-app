import React from "react";
import * as logService from './LogService';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }

    componentDidCatch(error, errorInfo) {

        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
       // logService.log(error, errorInfo);
    }

    render() {

        return this.props.children;
    }
}

export default ErrorBoundary;