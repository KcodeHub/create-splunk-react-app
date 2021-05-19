import React from 'react';
import './App.css';
import ErrorBoundary from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <p>Buggy counter with error boundary</p>
                <ErrorBoundary>
                    <BuggyComponent/>
                </ErrorBoundary>
                <p>Buddy counter without error boundary</p>
                <BuggyComponent/>
            </header>
        </div>
    );
}

export default App;