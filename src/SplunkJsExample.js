import React from 'react';
import './SplunkJsExample.css';
import Inputs from './Inputs';
import * as splunkjs from 'splunk-sdk';

// jquery.ajax is used for the underlying http client in ProxyHttp
window.$ = require('jquery');
const Async  = splunkjs.Async;
const clientHttp = require('splunk-sdk/lib/platform/client/proxy_http');

class SplunkJsExample extends React.Component {
    constructor(props) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
      this.generateError = this.generateError.bind(this);
      this.state = {
          username: 'admin',  // Splunk Login Id
          password: 'adminuser',  // Splunk Login Password
          results: [],
      };
    }
    handleQueryChange(query) {
        this.setState({query: query});
    }


// Get Log data from Splunk Server.
    handleSearch() {
        var http = new clientHttp.ProxyHttp('/proxy');
        var service = new splunkjs.Service(http, {
            username: this.state.username,
            password: this.state.password,
            scheme: 'https',
            host: 'localhost',  // Splunk Server host
            port: '3000'   // Splunk Server Port
        });


        var that = this;
        Async.chain([
        // First, we log in
        function(done) {
            service.login(done);
        },
        // Perform the search
        function(success, done) {
            if (!success) {
                done('Error logging in');
            }
            
            service.search('search index="react_error" ', {}, done);  // Search the Log from specific Splunk index

        },
        // Wait until the job is done
        function(job, done) {
            job.track({}, function(job) {
                // Ask the server for the results
                job.results({}, done);
            });
        },
        // Print out the statistics and get the results
        function(results, job, done) {
            // Print out the statistics to the console
            console.log('Splunk Search Job Statistics:');
            console.log(`  Event Count: ${job.properties().eventCount}`);
            console.log(`  Disk Usage: ${job.properties().diskUsage} bytes`);
            console.log(`  Priority: ${job.properties().priority}`);
            console.log(results);
            that.setState({results: results});
        }],
        function(err) {
            console.error(err);        
        }
        );
    }


// This Writes Logs to Splunk Server

// Below are TODOS
// Use React error boundary to capture Log and write it to Splunk
// Connection to be in secure and connection details needs to be encrypted.

    generateError() {

    var http = new clientHttp.ProxyHttp('/proxy');
            var service = new splunkjs.Service(http, {
                username: this.state.username,
                password: this.state.password,
                scheme: 'https',
                host: 'localhost',
                port: '3000'
            });

// Create a Logger Class for different Level

var Logger = splunkjs.Class.extend({
    init: function(service, opts) {
        this.service = service;

        opts = opts || {};

        this.params = {};
        if (opts.index)      this.params.index      = opts.index;
        if (opts.host)       this.params.host       = opts.host;
        if (opts.source)     this.params.source     = opts.source;
        if (opts.sourcetype) this.params.sourcetype = opts.sourcetype || "react_error";

        if (!this.service) {
            throw new Error("Must supply a valid service");
        }
    },

    log: function(data) {
        var message = {
            __time: (new Date()).toUTCString(),
            level: "LOG",
            data: data
        };

        this.service.log(message, this.params);
        console.log(data);
    },

    error: function(data) {
        var message = {
            __time: (new Date()).toUTCString(),
            level: "ERROR",
            data: data
        };

        this.service.log(message, this.params);
        console.error(data);
    },

    info: function(data) {
        var message = {
            __time: (new Date()).toUTCString(),
            level: "INFO",
            data: data
        };

        this.service.log(message, this.params);
        console.info(data);
    },

    warn: function(data) {
        var message = {
            __time: (new Date()).toUTCString(),
            level: "WARN",
            data: data
        };

        this.service.log(message, this.params);
        console.warn(data);
    },
});

            // First, we log in
            service.login(function(err, success) {
                if (err || !success) {
                    console.log("Login failure. Please check your server hostname and authentication credentials.");
                    return;
                }

                // Create our logger
                var logger = new Logger(service, {index: "react_error", sourcetype: "test"});  // Write Error Log to Specific
                                                                                               // splunk server
                logger.error("Error Log Message");
                logger.info(["useful", "info"]);
                logger.warn({"this": {"is": ["a", "warning"]}});
            });
    }
  
    render() {
      const results = this.state.results;

      // Find the index of the fields we want
      const timeIndex = (results.fields || []).indexOf('_time');
      const sourceIndex = (results.fields || []).indexOf('source');
      const sourcetypeIndex = (results.fields || []).indexOf('sourcetype');
      const rawIndex = (results.fields || []).indexOf('_raw');
      
      return (
        <div className='SplunkExample'>
            <Inputs
                onClickGenerateError = {this.generateError}
                onClickSearch={this.handleSearch} />
            <h3>Results</h3>
            <table className='Results'>
                <thead>
                    <tr><th>_time</th><th>source</th><th>sourcetype</th><th>_raw</th></tr>
                </thead>
                <tbody>
                    {(results.rows || []).map((result, i) => {
                        return <tr key={i.toString()}><td>{result[timeIndex]}</td><td>{result[sourceIndex]}</td><td>{result[sourcetypeIndex]}</td><td>{result[rawIndex]}</td></tr>;
                    })}
                    <tr></tr>
                </tbody>
            </table>
        </div>
        );
    }
  }

  export default SplunkJsExample;